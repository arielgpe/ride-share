import { StateCreator } from 'zustand';
import { TripSlice } from '@/interfaces/TripSlice';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r: any) => r.json());

const nextUrl = process.env.NEXT_AUTH_URL;

export const createTripSlice: StateCreator<TripSlice> = (set, get, store) => ({
  trip: {
    getTrips: (user) => {
      return useSWR((user && user.id && user.role) ? [`${nextUrl}/api/trips?userId=${user.id}&role=${user.role}`] : null,
        fetcher, {refreshInterval: 1000});
    },
  }
});

