import { useForm } from 'react-hook-form';
import { Button, Grid, TextField } from '@mui/material';
import { useAuth, useLogin } from '../context/Auth';
import { useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useErrorSnackbar } from '../context/Snackbar';

interface LoginInfo {
  username: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm();
  const onLogin = useLogin();
  const navigate = useNavigate();
  const user = useAuth();
  const enqueue = useErrorSnackbar();

  const onSubmit = useCallback(
    (data: LoginInfo) => {
      return onLogin(data.username, data.password)
        .then(() => {
          navigate('/');
        })
        .catch(() => {
          enqueue('Error occurred logging in!');
        });
    },
    [onLogin, navigate, enqueue]
  );

  const onSignUp = useCallback(() => navigate('/signup'), [navigate]);

  if (user) {
    return <Navigate to='/activities' />;
  }

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
          placeholder='username'
          fullWidth
        />
      </Grid>
      <Grid item sx={{ m: 1 }} md={6} xs={12}>
        <TextField
          inputProps={register('password', { required: true })}
          placeholder='password'
          type='password'
          fullWidth
        />
      </Grid>
      <Grid item sx={{ m: 1 }} md={6} xs={12}>
        <Grid container direction='row-reverse'>
          <Button type='button' onClick={onSignUp}>
            Or Sign Up
          </Button>
          <Button type='submit'>Login</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
