'use client';
import { ThemeProvider } from '@mui/material';
import { Sidebar } from '@/components/organism/Sidebar';
import theme from '../../theme';
import { Map } from '@/components/organism/Map';


export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <main className={'min-h-screen'}>
        <Map userType={'rider'}/>
        <Sidebar/>
      </main>
    </ThemeProvider>
  );
}
