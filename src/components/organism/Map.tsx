import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Directions from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import { useBoundStore } from '@/stores/useBoundStore';

const MapboxAccessToken = process.env.MapboxAccessToken || '';
mapboxgl.accessToken = MapboxAccessToken;

interface Props {
  userType: 'rider' | 'driver';
}

export const Map = () => {
  const  { trip, user } = useBoundStore();
  const [showMap, setShowMap] = useState(false);
  const mapContainer = useRef(null);
  const map = useRef<any>();
  const [lng, setLng] = useState(-69.94193);
  const [lat, setLat] = useState(18.49049);
  const [zoom, setZoom] = useState(13);


  const options = () => {
    const defaultOptions = {
      profile: 'mapbox/driving',
      accessToken: mapboxgl.accessToken,
      geocoder: {
        country: 'DO'
      },
      controls: {}
    };
    return user.data.role === 'RIDER' ? {
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

  const getGeolocation = () => {
    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("position", position);
      });
    }
  }

  useEffect(() => {
    if (map.current) return; // initialize map only once
    // getGeolocation();
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
    const directions = new Directions(options());
    directions.setOrigin([lng, lat]);
    directions.setWaypoint(0, [-69.93783,18.48324]);
    directions.setDestination([-69.95088,18.47713])


    // directions.setWaypoint(1, [lat, lng]);
    // directions.addWaypoint(2, [lat, lng]);
    map.current.addControl(
      directions,
      'top-left'
    );

    trip.setTrip({
      id: 0,
      status: 'ongoing',
      rider: 0,
      driver: 2,
      origin: [lng, lat],
      destination: [-69.95088,18.47713]
    });
  }, []);


  return (
    <div className={'text-black'}>
      <div ref={mapContainer} className="map-container w-screen h-screen ml-[260px]"/>
    </div>
  );

};
