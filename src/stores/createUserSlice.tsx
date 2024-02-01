import { UserSlice } from '@/interfaces/UserSlice';
import { StateCreator } from 'zustand';

export const createUserSlice: StateCreator<UserSlice> = (set, get, store) => ({
  user: {
    data: {},
    access_token: '',
    fetching: false,
    setUser: (data) => {
      console.log("data?", data);
      set({user: {...get().user, data}});
    }
  }
});

