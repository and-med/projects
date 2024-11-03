const ACCESS_TOKEN_KEY = 'time_tracker_token';

export const getToken: () => string | null = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const setToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};
