import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Directions from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

const MapboxAccessToken = process.env.MapboxAccessToken || '';
mapboxgl.accessToken = MapboxAccessToken;

interface Props {
  userType: 'rider' | 'driver';
}

export const Map = ({userType}: Props) => {
  const mapContainer = useRef(null);
  const map = useRef<any>();
  const [lng, setLng] = useState(-72);
  const [lat, setLat] = useState(43);
  const [zoom, setZoom] = useState(13);



  const options = () => {
    const defaultOptions = {
      profile: 'mapbox/driving-traffic',
      accessToken: mapboxgl.accessToken,
      controls: {}
    }
    return userType === 'rider'? {
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
    }
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
    map.current.addControl(
      new Directions(options()),
      'top-left'
    );
  }, []);


  return (
    <div>
      <div ref={mapContainer} className="map-container w-screen h-screen ml-[260px]"/>
    </div>
  );

};
