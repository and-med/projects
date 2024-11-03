import axios from '../utils/axios';
import User, { AuthResponse, SignupInfo } from '../models/Auth';

export const login = (username: string, password: string) => {
  return axios.post<AuthResponse>('/api/login', { username, password });
};

export const me = () => {
  return axios.get<User>('/api/me');
};

export const signup = (signupInfo: SignupInfo) => {
  return axios.post<User>('/api/register', signupInfo);
};
