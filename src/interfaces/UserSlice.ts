import { Trip } from '@/interfaces/TripSlice';

export interface User {
  id: number;
  name: string;
  role: 'RIDER' | 'DRIVER';
  trips: Trip[];
  drives: Trip[];
}

interface UserData {
  data: Partial<User>,
  access_token?: string,
  fetching: boolean,
  setUser: (user: Partial<User>) => void;
}

export interface UserSlice {
  user: UserData;
}
