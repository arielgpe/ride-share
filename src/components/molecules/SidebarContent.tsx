import { Fragment } from 'react';
import { Box, Divider, Stack } from '@mui/material';
import { SidebarListItem } from '@/components/molecules/SidebarItems';
import { ISidebarItem } from '@/interfaces/ISidebarItem';

interface Props {
  mainMenu: ISidebarItem[],
  currentUser: Partial<any>,
  isSelected: (item: ISidebarItem) => boolean,
}

export const SidebarContent = ({mainMenu, currentUser, isSelected}: Props) => {
  return (
    <Fragment>
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
                Logout button here
                {/*<Typography color="primary">{currentUser.fullName}</Typography>*/}
              </Stack>
            </>
          </Stack>
        </Stack>
      </Box>
    </Fragment>
  );
};
