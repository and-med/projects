import { useEffect, useState } from 'react';
import { getAllActivities } from '../services/Activity';
import Activity from '../models/Activity';

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
    <>
      <h1>Activities go here</h1>
      {activites.map((activity) => (
        <div key={activity.id}>
          <div>{activity.name}</div>
        </div>
      ))}
    </>
  );
};

export default Activities;
