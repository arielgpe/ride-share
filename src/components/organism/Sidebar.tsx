'use client';

import { Box, Drawer } from '@mui/material';
import { SidebarContent } from '@/components/molecules/SidebarContent';

export const Sidebar = () => {

  return (
    <Box sx={{display: 'flex', bgcolor: 'bg.main'}}>
      <Drawer
        role="container"
        sx={(theme) => ({
          background: '#F2F2FA',
          width: '260px',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '260px',
            boxSizing: 'border-box',
            background: 'inherit',
            pl: '20px',
            pr: '20px',
            pt: '1rem',
            pb: '5px',
            height: '100%',
            border: 0,
            overflowX: 'hidden',
          },
          '&& .MuiListItem-root': {
            pl: 0,
            pr: 0,
          },
          '&& .MuiButtonBase-root': {
            pl: '25px'
          },
          '&& .MuiListItemIcon-root': {
            minWidth: 35
          },
          '&& .MuiToolbar-root': {
            background: '#F2F2FA'
          },
          '&& .MuiListItemButton-root': {
            color: '#475467'
          },
          '&& .MuiListItemButton-root:hover, && .Mui-selected, && .Mui-selected:hover': {
            background: '#FFF',
            color: theme.palette.primary.main,
          }
        })}
      >
        <SidebarContent />
      </Drawer>
    </Box>
  );
};
