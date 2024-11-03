interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
}

export interface SignupInfo {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
}

export default User;
