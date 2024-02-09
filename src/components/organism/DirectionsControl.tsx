import { Divider, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import TurnSlightLeftIcon from '@mui/icons-material/TurnSlightLeft';
import TurnRightIcon from '@mui/icons-material/TurnRight';
import TurnSlightRightIcon from '@mui/icons-material/TurnSlightRight';
import StraightIcon from '@mui/icons-material/Straight';
import { User } from '@/interfaces/UserSlice';
import { Trip } from '@/interfaces/TripSlice';
import { useBoundStore } from '@/stores/useBoundStore';
import { LoadingButton } from '@/components/atoms/LoadingButton';

const nextUrl = process.env.NEXT_AUTH_URL;

export const DirectionsControl = ({data = null, user, onCancel}: { data: any, user: Partial<User>, onCancel: () => void}) => {
  const {trip} = useBoundStore();
  const {data: tripData = {}} = trip.getTrips(user);
  const [isCancelLoading, setCancelIsLoading] = useState(false);

  const duration = (value: number) => Math.floor(value / 60);
  const distance = (value: number) => Math.floor(value);

  const directionIcon = (modifier: string) => {
    switch (modifier?.toLowerCase()) {
      case 'left':
        return <TurnLeftIcon/>;
      case 'slight left':
        return <TurnSlightLeftIcon/>;
      case 'right':
        return <TurnRightIcon/>;
      case 'slight right':
        return <TurnSlightRightIcon/>;
      default:
        return <StraightIcon/>;
    }
  };

  const cancelTrip = async (item: Trip) => {
    setCancelIsLoading(true)
    let body: any = {id: item.id, status: 'canceled'};
    if (user.role === 'DRIVER') {
      body = {id: item.id, driver: {disconnect: true}, status: 'open'};
    }
    const tripResponse = await fetch(`${nextUrl}/api/trips`, {method: 'PUT', body: JSON.stringify(body)}) as any;
    if (tripResponse.ok) {
      onCancel();
      await tripResponse.json();
    }
    setCancelIsLoading(false)
  };

  return (
    <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper', height: '100%', overflowY: 'auto'}}>
      <ListItem>
        <Stack direction="column" spacing={2} sx={{padding: '1.5rem'}}>
          <Typography variant="h6" color="primary"
                      sx={{textTransform: 'capitalize'}}>Welcome {user.name}</Typography>
          <Stack spacing={2} direction="row" alignItems="center">
            {trip && ['open', 'ongoing'].includes(tripData?.status) ?
              <Stack direction="column" alignItems="start">
                <Typography variant="body1">Your current trip to {tripData.destination}</Typography>
                {user.role === 'DRIVER' ? (
                  <Fragment>
                    <Typography variant="body2">Total: ${tripData.driverPay}</Typography>
                    <Typography variant="body2">Client: {tripData.user?.name ?? '-'} </Typography>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Typography variant="body2">Total: ${tripData.cost}</Typography>
                    <Typography variant="body2">Driver: {tripData.driver?.name ?? '-'}</Typography>

                  </Fragment>
                )}
                <LoadingButton loading={isCancelLoading} sx={{alignSelf: 'end'}} variant={'outlined'} color={'error'} onClick={() => cancelTrip(tripData)}>Cancel
                  Trip</LoadingButton>

              </Stack> : <Typography>No ongoing trips</Typography>
            }
          </Stack>
        </Stack>
      </ListItem>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={
            <Stack direction={'row'} spacing={2}>
              <Typography
                sx={{display: 'inline', fontWeight: 'bold'}}
                component="span"
                variant="body1"
                color="text.primary"
              >
                Trip duration: {duration(data?.duration)}min
              </Typography>
            </Stack>
          }
        />
      </ListItem>
      {data?.steps.map((step: any, index: number) => (
        <Fragment key={index + 'new'}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              {directionIcon(step.maneuver.modifier)}
            </ListItemAvatar>
            <ListItemText
              primary={step.maneuver.instruction}
              secondary={
                <Fragment>
                  <Typography
                    sx={{display: 'inline'}}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {distance(step.distance)} meters
                  </Typography>
                </Fragment>
              }
            />
          </ListItem>
          {index + 1 !== data?.steps.length ? <Divider variant="inset" component="li"/> : null}
        </Fragment>
      ))}
    </List>
  );
};
