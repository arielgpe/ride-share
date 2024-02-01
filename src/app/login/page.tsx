'use client';

import { Button, FormControl, FormControlLabel, Radio, RadioGroup, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useBoundStore } from '@/stores/useBoundStore';

const nextUrl = process.env.NEXT_AUTH_URL;

const LoginPage = () => {
  const router = useRouter();
  const { user } = useBoundStore();
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('RIDER');

  const handleLogin = async () => {
    const response = await signIn('credentials', {
      name: fullName.toLowerCase(),
      role: role,
      callbackUrl: `${process.env.NEXT_AUTH_URL}`,
      redirect: false,
    });

    const qq = await fetch(`${nextUrl}/api/users?name=${fullName.toLowerCase()}`) as any;
    const data = await qq.json();
    user.setUser(data);

    if (response.ok) {
      router.push('/');
    }
  };


  return (
    <Stack
      component="form"
      spacing={2}
      noValidate
      autoComplete="off"
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
      <Button variant="contained" disabled={fullName.length <= 0} onClick={handleLogin}>Login</Button>
    </Stack>
  );
};

export default LoginPage;
