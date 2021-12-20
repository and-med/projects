import axios from '../utils/axios';
import User, { AuthResponse, SignupInfo } from '../models/Auth';

const ACCESS_TOKEN_KEY = 'time_tracker_token';

export const getToken: () => string | null = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const setToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const login = (username: string, password: string) => {
  return axios.post<AuthResponse>('/api/login', { username, password });
};

export const me = () => {
  return axios.get<User>('/api/me');
};

export const signup = (signupInfo: SignupInfo) => {
  return axios.post<User>('/api/register', signupInfo);
};
