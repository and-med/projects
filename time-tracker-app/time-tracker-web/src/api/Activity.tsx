import Activity, { NewActivity } from '../models/Activity';
import axios from '../utils/axios';

export const getAllActivities = () => {
  return axios.get<Activity[]>('/api/activity');
};

export const createActivity = (activity: NewActivity) => {
  return axios.post<Activity>('/api/activity', activity);
};
