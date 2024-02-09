'use client';
import { SessionProvider } from 'next-auth/react';
import Base from '@/components/organism/Base';


export default function Home() {
  return (
    <main className={'min-h-screen'}>
      <SessionProvider>
        <Base/>
      </SessionProvider>
    </main>
  );
}
