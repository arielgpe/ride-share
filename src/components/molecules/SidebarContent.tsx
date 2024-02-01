import { Fragment, useEffect } from 'react';
import { Box, Divider, Link, Stack, Typography } from '@mui/material';
import { SidebarListItem } from '@/components/molecules/SidebarItems';
import { useBoundStore } from '@/stores/useBoundStore';
import { useRouter } from 'next/navigation';
import { Trip } from '@/interfaces/TripSlice';
import useSWR from 'swr';

const nextUrl = process.env.NEXT_AUTH_URL;


export const SidebarContent = () => {
  const router = useRouter();
  const {trip, user} = useBoundStore();

  const {data = {}} = trip.getTrips(user.data);


  const logout = () => {
    user.setUser({});
    return router.push('/login');
  };

  const cancelTrip = async (item: Trip) => {
    let body: any = {id: item.id, status: 'canceled'};
    if (user.data.role === 'DRIVER') {
      body = {id: item.id, driver: {disconnect: true}, status: 'open'};
    }
    const tripResponse = await fetch(`${nextUrl}/api/trips`, {method: 'PUT', body: JSON.stringify(body)}) as any;
    if (tripResponse.ok) {
      await tripResponse.json();
    }
  };

  return (
    <Fragment>
      <Box sx={{
        width: '85%'
      }}>
        <Stack direction="column" spacing={2} sx={{padding: '1.5rem'}}>
          <Typography variant="h6" color="primary"
                      sx={{textTransform: 'capitalize'}}>Welcome {user.data.name}</Typography>
          <Stack spacing={2} direction="row" alignItems="center">
            {data &&  ['open', 'ongoing'].includes(data.status) ?
              <Stack direction="column" alignItems="start">
                <Typography variant="body1">Your current trip to {data.destination}</Typography>
                <Typography variant="body2" mt={2}>From {data.origin}</Typography>
                {user.data.role === 'DRIVER' ? (
                  <Fragment>
                    <Typography variant="body2">Total: ${data.driverPay}</Typography>
                    <Typography variant="body2">Client: {data.user?.name ?? '-'} </Typography>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Typography variant="body2">Total: ${data.cost}</Typography>
                    <Typography variant="body2">Driver: {data.driver?.name ?? '-'}</Typography>

                  </Fragment>
                )}
                <Link sx={{cursor: 'pointer'}} onClick={() => cancelTrip(data)}>Cancel</Link>
              </Stack> : <Typography>No ongoing trips</Typography>
            }
          </Stack>
        </Stack>
      </Box>
      <Divider sx={{
        border: '1.4px solid #D3D6DB',
        width: '230px'
      }}/>
      <SidebarListItem/>
      <Box sx={{
        mt: 3,
        position: 'absolute',
        bottom: 0,
        width: '85%'
      }}>
        <Divider sx={{
          border: '1.4px solid #D3D6DB',
          width: '230px'
        }}/>
        <Stack direction="row" spacing={2} sx={{padding: '1.5rem'}}>
          <Stack spacing={2} direction="row" alignItems="center">
            <>
              <Stack direction="column" alignItems="start">
                <Typography color="primary" onClick={logout}>Logout</Typography>
              </Stack>
            </>
          </Stack>
        </Stack>
      </Box>
    </Fragment>
  );
};
