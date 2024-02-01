import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Directions from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import { useBoundStore } from '@/stores/useBoundStore';
import { Trip } from '@/interfaces/TripSlice';

const MapboxAccessToken = process.env.MapboxAccessToken || '';
mapboxgl.accessToken = MapboxAccessToken;

const nextUrl = process.env.NEXT_AUTH_URL;

interface Props {
  lat: number,
  lng: number
}

export const Map = ({lat, lng}: Props) => {
  const {trip, user} = useBoundStore();
  const mapContainer = useRef(null);
  const map = useRef<any>();
  const [zoom, setZoom] = useState(9);
  const {data = {}, isLoading} = trip.getTrips(user.data);

  const options = () => {
    const defaultOptions = {
      profile: 'mapbox/driving',
      accessToken: mapboxgl.accessToken,
      controls: {}
    };

    return user.data.role === 'RIDER' && (!data || !['open', 'ongoing'].includes(data.status)) ? {
      ...defaultOptions,
      controls: {
        profileSwitcher: false,
        inputs: true,
        instructions: false
      }
    } : {
      ...defaultOptions,
      interactive: false,
      controls: {
        profileSwitcher: false,
        inputs: false,
        instructions: true
      }
    };
  };

  const startTrip = async (origin: number[], destination: number[]) => {
    const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${origin.join(',')};${destination.join(',')}?steps=true&geometries=geojson&access_token=${MapboxAccessToken}`);
    const route = await response.json() as any;
    if (route.code === 'Ok') {
      const body: Trip = {
        status: 'open',
        userId: user.data.id ?? 0,
        distance: route.routes[0].distance,
        origin: route.waypoints[0].name,
        originLngLat: route.waypoints[0].location,
        destination: route.waypoints[1].name,
        destinationLngLat: route.waypoints[1].location
      };

      const tripResponse = await fetch(`${nextUrl}/api/trips`, {method: 'POST', body: JSON.stringify(body)}) as any;
      if (tripResponse.ok === true) {
        await tripResponse.json();
      }
    }
  };

  class TripButton {
    directions = null;
    destination = [];
    origin = [];

    constructor(directions: any) {
      directions.on('destination', (value: any) => this.destination = value.feature.geometry.coordinates);
      directions.on('origin', (value: any) => this.origin = value.feature.geometry.coordinates);
      this.directions = directions;
    }

    onAdd(map) {
      const div = document.createElement('div');
      div.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
      div.innerHTML = `<button style='width: 260px'> Start Ride </button>`;
      div.addEventListener('contextmenu', (e) => e.preventDefault());
      div.addEventListener('click', () => startTrip(this.origin, this.destination));
      return div;
    }
  }

  const getGeolocation = () => {
    const coordinates = [lng, lat];
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: coordinates,
      zoom: zoom
    });
    map.current.on('load', () => {
      const directions = new Directions(options());
      if (data && data.status) {
        if (['open', 'ongoing'].includes(data.status)) {
          if (user.data.role === 'DRIVER') {
            directions.setOrigin(coordinates);
            directions.setWaypoint(0, data.originLngLat?.map(Number));
          } else {
            directions.setOrigin(data.originLngLat?.map(Number));
          }
          directions.setDestination(data.destinationLngLat?.map(Number));
        }
      } else {
        if (user.data.role === 'RIDER') {
          const button = new TripButton(directions);
          map.current.addControl(
            button,
            'top-left'
          );
        }
      }

      map.current.addControl(
        directions,
        'top-left'
      );

    });

  };

  useEffect(() => {
    if (!isLoading) {
      getGeolocation();
    }
  }, [isLoading]);


  return (
    <div className={'text-black'}>
      <div ref={mapContainer} className="map-container w-screen h-screen ml-[260px]"/>
    </div>
  );

};
