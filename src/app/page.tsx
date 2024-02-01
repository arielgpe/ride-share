'use client';
import { ThemeProvider } from '@mui/material';
import theme from '../../theme';
import { SessionProvider } from 'next-auth/react';
import Base from '@/components/organism/Base';


export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <main className={'min-h-screen'}>
        <SessionProvider>
          <Base/>
        </SessionProvider>
      </main>
    </ThemeProvider>
  );
}
