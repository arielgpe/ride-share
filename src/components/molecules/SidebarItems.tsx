import { List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Trip } from '@/interfaces/TripSlice';
import { useBoundStore } from '@/stores/useBoundStore';
import useSWR from 'swr';


const nextUrl = process.env.NEXT_AUTH_URL;
const fetcher = (url: string) => fetch(url).then((r:any) => r.json())

export const SidebarListItem = () => {
  const {user, trip} = useBoundStore();
  const {data: myTrip = {}} = trip.getTrips(user.data);

  const {data = []} = useSWR(`${nextUrl}/api/trips?status=open`,
    fetcher, { refreshInterval: 1000 });

  const selectTrip = async (item: Trip) => {
    if (user.data.role === 'DRIVER') {
      const body = {id: item.id, driverId: user.data.id, status: 'ongoing'};
      const tripResponse = await fetch(`${nextUrl}/api/trips`, {method: 'PUT', body: JSON.stringify(body)}) as any;
      if (tripResponse.ok) {
        await tripResponse.json();
      }
    }
  };


  if ((myTrip && myTrip.status && myTrip.status !== 'canceled') || user.data.role === 'RIDER') {
    return;
  }

  return (
    <List>
      { data.length > 0 ? data.map((item: any, index: number) => (
          <ListItem key={index + 1} sx={{color: 'primary'}}>
            <ListItemButton onClick={() => selectTrip(item)}>
              <ListItemText primaryTypographyProps={{color: 'primary'}}
                            primary={`Trip to ${item.destination} for $${item.driverPay}`}/>
            </ListItemButton>
          </ListItem>
        )) : <Typography>Loading open trips...</Typography>}

    </List>
  );
};
