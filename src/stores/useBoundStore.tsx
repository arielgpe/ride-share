import { create } from 'zustand';
import { createUserSlice } from './createUserSlice';
import { UserSlice } from '@/interfaces/UserSlice';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { mergeDeepLeft } from 'ramda';
import { createTripSlice } from '@/stores/createTripSlice';
import { TripSlice } from '@/interfaces/TripSlice';

export const useBoundStore = create<UserSlice & TripSlice & { _hasHydrated: boolean }>()(
  devtools(
    persist(
      immer(
        (set, get, store) => ({
          ...createUserSlice(set, get, store),
          ...createTripSlice(set, get, store),
          _hasHydrated: false
        })
      ),
      {
        name: 'ride-share-store',
        onRehydrateStorage: () => (state) => {
          if (state) {
            state._hasHydrated = true;
          }
        },
        partialize: (state: any) => ({
          user: {
            data: state.user.data
          }
        }),
        merge: (persistedState: any, currentState) => mergeDeepLeft(persistedState, currentState)
      }
    )
  ));
