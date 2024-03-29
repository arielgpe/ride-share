'use client';

import { FormControl, FormControlLabel, Radio, RadioGroup, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useBoundStore } from '@/stores/useBoundStore';
import { User } from '@/interfaces/UserSlice';
import { LoadingButton } from '@/components/atoms/LoadingButton';

const nextUrl = process.env.NEXT_AUTH_URL;

const LoginPage = () => {
  const router = useRouter();
  const {user} = useBoundStore();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('RIDER');

  const handleLogin = async () => {
    setLoading(true);
    const response = await signIn('credentials', {
      name: fullName.toLowerCase(),
      role: role,
      callbackUrl: `${process.env.NEXT_AUTH_URL}`,
      redirect: false,
    });

    const userResponse = await fetch(`${nextUrl}/api/users?name=${fullName.toLowerCase()}`) as any;
    const data = await userResponse.json() as User;

    if (response?.ok) {
      user.setUser(data);
      router.push('/');
    }
    setLoading(false);
  };

  return (
    <Stack
      spacing={2}
    >
      <TextField
        label="Full name" name="name" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="RIDER"
          name="radio-buttons-group"
          value={role}
          onChange={(_, value) => setRole(value)}
        >
          <FormControlLabel value="RIDER" control={<Radio/>} label="Rider"/>
          <FormControlLabel value="DRIVER" control={<Radio/>} label="Driver"/>
        </RadioGroup>
      </FormControl>
      <LoadingButton  loading={loading} variant="contained" disabled={fullName.length <= 0 || loading} onClick={handleLogin}>
        Login
      </LoadingButton>
    </Stack>
  );
};

export default LoginPage;
