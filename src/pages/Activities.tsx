import { useEffect, useState } from 'react';
import { getAllActivities } from '../services/Activity';
import Activity from '../models/Activity';
import { Box, Typography } from '@mui/material';

const useActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    getAllActivities().then((response) => {
      setActivities(response.data);
    });
  }, []);

  return activities;
};

const Activities = () => {
  const activites = useActivities();

  return (
    <Box>
      <Typography variant='h2'>Activities go here</Typography>
      {activites.map((activity) => (
        <Box key={activity.id}>
          <Typography>{activity.name}</Typography>
          <Typography>{activity.description}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Activities;
