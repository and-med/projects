import { useCallback } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { createActivity } from '../api/Activity';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../context/Snackbar';
import { NewActivity as NewActivityModel } from '../models/Activity';

const NewActivity = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { enqueueSuccess, enqueueError } = useSnackbar();

  const onSubmit = useCallback(
    (data: NewActivityModel) => {
      createActivity(data)
        .then((response) => {
          enqueueSuccess(
            `Activity '${response.data.name}' created successfully!`
          );
          navigate('/activities');
        })
        .catch(() => {
          enqueueError('Error occurred creating activity!');
        });
    },
    [enqueueSuccess, enqueueError, navigate]
  );

  return (
    <>
      <Grid
        sx={{ margin: 2 }}
        container
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        justifyContent='center'
      >
        <Grid sx={{ margin: 1 }} item md={6} xs={12}>
          <TextField
            label='Name'
            placeholder="ex: 'Singing', 'Work' :)"
            fullWidth
            inputProps={register('name', { required: true })}
          />
        </Grid>
        <Grid sx={{ margin: 1 }} item md={6} xs={12}>
          <Box>
            <TextField
              label='Description'
              multiline
              rows={3}
              placeholder='and some details'
              fullWidth
              inputProps={register('description', { required: true })}
            />
          </Box>
        </Grid>
        <Grid
          sx={{ margin: 1, display: 'flex', justifyContent: 'flex-end' }}
          item
          md={6}
          xs={12}
        >
          <Button type='submit' variant='outlined'>
            Create
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default NewActivity;
