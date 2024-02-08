import {
  AttributionControl,
  GeolocateControl,
  Layer,
  LineLayer,
  Map as MapGl,
  Marker,
  NavigationControl,
  Source,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { Geometry } from 'geojson';
import { useBoundStore } from '@/stores/useBoundStore';
import type mapboxgl from 'mapbox-gl';
import { GeolocateResultEvent } from 'react-map-gl/dist/esm/types';
import { GeocoderControl } from './GeocoderControl';
import { DirectionsControl } from '@/components/organism/DirectionsControl';
import { AccountControl } from '@/components/organism/AccountControl';
import { Button } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import HailIcon from '@mui/icons-material/Hail';
import { Trip } from '@/interfaces/TripSlice';
import { SidebarListItems } from '@/components/molecules/SidebarItems';

const MapboxAccessToken = process.env.MapboxAccessToken || '';
const nextUrl = process.env.NEXT_AUTH_URL;

const fetcher = (url: string) => fetch(url).then((r: any) => r.json());

const userLayerStyle: LineLayer = {
  id: 'user-layer',
  type: 'line',
  paint: {
    'line-color': 'rgba(183,6,72,0.7)',
    'line-width': 5
  },
};


export const Map = () => {
  const {trip, user} = useBoundStore();
  const {data = {}, isLoading} = trip.getTrips(user.data);

  const geoControlRef = useRef<mapboxgl.GeolocateControl>();

  const [viewState, setViewState] = React.useState({
    longitude: -0,
    latitude: 0,
    zoom: 3
  });

  const [showDestinationState, setShowDestinationState] = useState(false);

  const [destinationLngLat, setDestinationLngLat] = useState([]);
  const [originLngLat, setOriginLngLat] = useState([]);

  const [driverGeoJsonLayer, setDriverGeoJsonLayer] = useState<Geometry | null>();

  const [directions, setDirections] = useState();

  useEffect(() => {
    if (data && 'originLngLat' in data) {
      setOriginLngLat(data.originLngLat);
      setDestinationLngLat(data.destinationLngLat);
      setViewState({
        longitude: data.originLngLat[0],
        latitude: data.originLngLat[1],
        zoom: 17,
      });
    }
  }, [data]);

  useEffect(() => {
    if (originLngLat.length > 0 && destinationLngLat.length > 0) {
      getDriverData([originLngLat, destinationLngLat]);
    } else {
      setDriverGeoJsonLayer(null);
    }
  }, [originLngLat, destinationLngLat]);

  useEffect(() => {
    // Activate as soon as the control is loaded
    geoControlRef.current?.trigger();
  }, [geoControlRef.current]);

  const getDriverData = async (coordinates: any[]) => {
    const response = await fetcher(`https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${coordinates.join(';')}?steps=true&geometries=geojson&access_token=${MapboxAccessToken}`) as any;
    if ('routes' in response) {
      setDriverGeoJsonLayer(response.routes[0].geometry);
      setDirections(response.routes[0].legs[0]);
    }
  };

  const showSearchControls = useMemo(() => user.data.role === 'RIDER' && (!data || !['open', 'ongoing'].includes(data.status)), [user.data, data]);

  const onGeolocation = (event: GeolocateResultEvent<any>) => {
    geoControlRef.current?.trigger();
    const lat = event.coords.latitude;
    const lng = event.coords.longitude;
    getDriverData([[lng, lat], originLngLat, destinationLngLat]);
  };

  const startTrip = async (origin: number[], destination: number[]) => {
    const response = await fetcher(`https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${origin.join(',')};${destination.join(',')}&geometries=geojson&access_token=${MapboxAccessToken}`) as any;
    if ('routes' in response) {
      const body: Trip = {
        status: 'open',
        userId: user.data.id ?? 0,
        distance: response.routes[0].distance,
        origin: response.waypoints[0].name,
        originLngLat: response.waypoints[0].location,
        destination: response.waypoints[1].name,
        destinationLngLat: response.waypoints[1].location
      };

      const tripResponse = await fetch(`${nextUrl}/api/trips`, {method: 'POST', body: JSON.stringify(body)}) as any;
      if (tripResponse.ok === true) {
        await tripResponse.json();
      }
    }
  };

  return (
    <Fragment>
      <MapGl
        mapboxAccessToken={MapboxAccessToken}
        initialViewState={{
          longitude: -8.61767353533753,
          latitude: 42,
          zoom: 3
        }}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{width: '100vw', height: '100vh'}}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        attributionControl={false}
      >
        <NavigationControl/>
        {/*@ts-expect-error: wrong ref type*/}
        {user?.data?.role === 'DRIVER' ? <GeolocateControl ref={geoControlRef} onGeolocate={onGeolocation}/> :
          null}
        {
          showSearchControls ?
            <Fragment>
              <GeocoderControl
                onClear={() => {
                  setOriginLngLat([]);
                  setShowDestinationState(false);
                }}
                onResult={(e: any) => {
                  setOriginLngLat(e.result.geometry.coordinates);
                  setShowDestinationState(true);
                }} onLoading={() => {
                setShowDestinationState(false);
              }} placeholder={'Pickup location'}
                position="top-left"/>
              {showDestinationState ? <GeocoderControl
                onClear={() => {
                  setDestinationLngLat([]);
                }}
                onResult={(e: any) => {
                  setDestinationLngLat(e.result.geometry.coordinates);
                }} placeholder={'Where to'} position="top-left"/> : null}
              {originLngLat.length > 0 && destinationLngLat.length > 0 ?
                <Button onClick={() => startTrip(originLngLat, destinationLngLat)} variant={'contained'} sx={{
                  position: 'absolute', top: '3.5rem',
                  right: '9rem'
                }}>Start Trip</Button> : null}
            </Fragment> : null
        }

        {driverGeoJsonLayer ? <Source id="driver-data" type="geojson" data={driverGeoJsonLayer}>
          <Layer {...userLayerStyle} />
        </Source> : null}

        {originLngLat.length > 0 ? <Marker key={2}
                                           longitude={originLngLat[0]}
                                           latitude={originLngLat[1]}>
          <HailIcon color={'primary'} fontSize={'large'}/>
        </Marker> : null}

        {destinationLngLat.length > 0 ? <Marker key={3}
                                                longitude={destinationLngLat[0]}
                                                latitude={destinationLngLat[1]}>
          <RoomIcon color={'error'} fontSize={'large'}/>
        </Marker> : null}

        <AttributionControl customAttribution="Goober"/>
        <SidebarListItems/>

        <AccountControl/>
        {directions && ['open', 'ongoing'].includes(data?.status) ?
          <DirectionsControl user={user.data} data={directions} onCancel={() => {
            setOriginLngLat([]);
            setDestinationLngLat([]);
            setDriverGeoJsonLayer(null);
          }}/> : null}
      </MapGl>
    </Fragment>
  );
};
