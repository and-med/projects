import axios from '../utils/axios';

export const getAllActivities = () => {
  return axios.get('/api/activity');
};
