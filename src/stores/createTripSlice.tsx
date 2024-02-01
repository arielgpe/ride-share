import { StateCreator } from 'zustand';
import { TripSlice } from '@/interfaces/TripSlice';

export const createTripSlice: StateCreator<TripSlice> = (set, get, store) => ({
  trip: {
    data: {
      status: 'open'
    },
    setTrip: (data) => {
      set({trip: {...get().trip, data}});
    }
  }
});

