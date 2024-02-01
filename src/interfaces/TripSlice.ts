interface Trip {
  id?: number;
  status: 'open' | 'ongoing' | 'completed' | 'canceled'
  rider?: number;
  driver?: number;
  origin?: number[];
  destination?: number[];
}

interface TripData {
  data: Partial<Trip>;
  setTrip: (data: Trip) => void
}

export interface TripSlice {
  trip: TripData;
}
