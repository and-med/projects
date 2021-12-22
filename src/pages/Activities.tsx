import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { getAllActivities } from '../api/Activity';
import Activity from '../models/Activity';

const useActivities = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getAllActivities()
      .then((response) => {
        setActivities(response.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { activities, isLoading };
};

const Activities = () => {
  const { activities } = useActivities();

  return (
    <Box m={2}>
      <Grid container spacing={1}>
        {activities.map((activity) => (
          <Grid key={activity.id} item md={4} xs={12}>
            <Card>
              <CardContent>
                <Typography variant='h5'>{activity.name}</Typography>
                <Typography variant='body2'>{activity.description}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button size='small'>View</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
        <Button component={Link} to='/activities/new' variant='outlined'>
          New Activity
        </Button>
      </Box>
    </Box>
  );
};

export default Activities;
