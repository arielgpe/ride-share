'use client';

import Grid from '@mui/material/Unstable_Grid2';
import { Card, CardContent, Stack } from '@mui/material';
import { ReactNode } from 'react';

const LoginLayout = ({children}: { children: ReactNode }) => {

  return (
    <div
      className={`relative flex min-h-screen flex-col justify-center overflow-hidden`}>
      <Grid xs={12}
            md={6}
            sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 0}}>
        <Card sx={{
          padding: 2,
          maxWidth: 450,
          borderRadius: '16px',
          backgroundColor: 'bg.main',
          boxShadow: '0px 4px 40px 0px rgba(225, 225, 248, 0.54)'
        }}>
          <CardContent>
            <Stack
              spacing={0}
              direction="column"
            >
              <Stack display="flex" alignItems="end">
                <CardContent sx={{p: 0, width: '400px'}}>
                  {children}
                </CardContent>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default LoginLayout;
