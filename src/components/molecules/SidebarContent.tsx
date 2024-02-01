import { Fragment, useEffect } from 'react';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { SidebarListItem } from '@/components/molecules/SidebarItems';
import { ISidebarItem } from '@/interfaces/ISidebarItem';
import { useBoundStore } from '@/stores/useBoundStore';

interface Props {
  mainMenu: ISidebarItem[],
  isSelected: (item: ISidebarItem) => boolean,
}

export const SidebarContent = ({mainMenu, isSelected}: Props) => {
  const { trip, user } = useBoundStore();

  return (
    <Fragment>
      <Box sx={{
        width: '85%'
      }}>
        <Stack direction="column" spacing={2} sx={{padding: '1.5rem'}}>
          <Typography color="primary">Your current trip with Ariel Guzman</Typography>
          <Stack spacing={2} direction="row" alignItems="center">
            <>
              <Stack direction="column" alignItems="start">
                { trip.data.status }
                { trip.data.origin }
                { trip.data.destination }
                Logout button here
                {/*<Typography color="primary">{currentUser.fullName}</Typography>*/}
              </Stack>
            </>
          </Stack>
        </Stack>
      </Box>
      <Divider sx={{
        border: '1.4px solid #D3D6DB',
        width: '230px'
      }}/>
      <SidebarListItem items={mainMenu} isSelected={isSelected}/>
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
                <Typography color="primary">{user.data.name}</Typography>
              </Stack>
            </>
          </Stack>
        </Stack>
      </Box>
    </Fragment>
  );
};
