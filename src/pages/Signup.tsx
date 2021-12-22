import { Button, Grid, TextField } from '@mui/material';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSignup } from '../context/Auth';
import { useErrorSnackbar } from '../context/Snackbar';
import { SignupInfo } from '../models/Auth';

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const onSignup = useSignup();
  const navigate = useNavigate();
  const enqueue = useErrorSnackbar();

  const onSubmit = useCallback(
    (info: SignupInfo) => {
      return onSignup(info)
        .then(() => navigate('/login'))
        .catch(() => enqueue('Error occurred during signup!'));
    },
    [onSignup, navigate, enqueue]
  );

  const onLogin = useCallback(() => navigate('/login'), [navigate]);

  return (
    <Grid
      container
      component='form'
      justifyContent='center'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid item sx={{ m: 1 }} md={6} xs={12}>
        <TextField
          inputProps={register('username', { required: true })}
          placeholder='Pick a username'
          fullWidth
        />
      </Grid>
      <Grid item sx={{ m: 1 }} md={6} xs={12}>
        <TextField
          inputProps={register('password', { required: true })}
          placeholder='Pick a password'
          type='password'
          fullWidth
        />
      </Grid>
      <Grid item sx={{ m: 1 }} md={6} xs={12}>
        <TextField
          inputProps={register('firstName', { required: true })}
          placeholder='First Name'
          fullWidth
        />
      </Grid>
      <Grid item sx={{ m: 1 }} md={6} xs={12}>
        <TextField
          inputProps={register('lastName', { required: true })}
          placeholder='Last Name'
          fullWidth
        />
      </Grid>
      <Grid item sx={{ m: 1 }} md={6} xs={12}>
        <Grid container direction='row-reverse'>
          <Button type='button' onClick={onLogin}>
            Or Login
          </Button>
          <Button type='submit'>Sign Up</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Signup;
