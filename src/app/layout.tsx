import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Analytics } from '@vercel/analytics/react';
import theme from '../../theme';
import { ThemeProvider } from '@mui/material';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Goober',
  description: 'Share Ride App',
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>

          <AppRouterCacheProvider>
            {children}
            <Analytics />
          </AppRouterCacheProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
