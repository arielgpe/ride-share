import { User } from '@/interfaces/UserSlice';
import { SWRResponse } from 'swr';

export interface Trip {
  id?: number;
  status: string;
  userId: number,
  user?: User;
  driverId?: number
  driver?: User;
  distance: number,
  cost?: number,
  driverPay?: number
  origin?: string;
  originLngLat?: number[];
  destination?: string;
  destinationLngLat?: number[];
}

interface TripData {
  getTrips: (user: Partial<User>) => SWRResponse;
}

export interface TripSlice {
  trip: TripData;
}
