'use client';
import { Map } from '@/components/organism/Map';
import { Sidebar } from '@/components/organism/Sidebar';
import React, { Fragment, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useBoundStore } from '@/stores/useBoundStore';
import { CircularProgress } from '@mui/material';

const nextUrl = process.env.NEXT_AUTH_URL;
const Base = () => {
  const {user, trip} = useBoundStore();
  const {data: session, status} = useSession();
  const [showMap, setShowMap] = useState(false);
  const [lng, setLng] = useState(-69.94193);
  const [lat, setLat] = useState(18.49049);
  const {data: myTrip = {}} = trip.getTrips(user.data);


  // const router = useRouter();

  // useEffect(() => {
  //   console.log("user.data", user.data)
  //   if (!user.data.id) {
  //     router.push('/login');
  //   }
  // }, [user]);


  useEffect(() => {
    setShowMap(false);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        setShowMap(true);
      });
    }
  }, [myTrip]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // if (!user.data.id) {
  //   return <p>Access Denied</p>;
  // }

  return (
    <Fragment>
      <Sidebar/>
      {showMap ? <Map lng={lng} lat={lat}/> : <CircularProgress
        className={'ml-[270px] mt-3'}
        size="1.5rem"/>}
    </Fragment>
  );
};

export default Base;
