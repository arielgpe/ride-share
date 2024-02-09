'use client';
import { Map } from '@/components/organism/Map';
import React, { Fragment, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useBoundStore } from '@/stores/useBoundStore';
import { useRouter } from 'next/navigation';

const Base = () => {
  const router = useRouter();

  const {user, _hasHydrated} = useBoundStore();
  const { status} = useSession();

  useEffect(() => {
    if (_hasHydrated && !user.data.hasOwnProperty('id')) {
      router.push('/login');
    }
  }, [user, _hasHydrated]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // if (!user.data.id) {
  //   return <p>Access Denied</p>;
  // }

  return (
    <Fragment>
      <Map />
    </Fragment>
  );
};

export default Base;
