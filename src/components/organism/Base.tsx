'use client';
import { Map } from '@/components/organism/Map';
import { Sidebar } from '@/components/organism/Sidebar';
import { Fragment, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const nextUrl = process.env.NEXT_AUTH_URL;
const Base = () => {
  const {data: session, status} = useSession();


  const router = useRouter();

  useEffect(() => {
    const getUser = async() => {
      return fetch(`${nextUrl}/api/users?name=ariel`);
    }

    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      getUser();
    }
  }, [status]);


  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <p>Access Denied</p>;
  }

  return (
    <Fragment>
      <Map/>
      <Sidebar/>
    </Fragment>
  );
};

export default Base;
