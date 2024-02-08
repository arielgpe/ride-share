import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Analytics } from '@vercel/analytics/react';

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
        <AppRouterCacheProvider>
          {children}
          <Analytics />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
