import { CircularProgress } from '@mui/material';
import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { Navigate } from 'react-router-dom';
import User, { SignupInfo } from '../models/Auth';
import { getToken, login, me, signup, setToken } from '../services/Auth';

const actions = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
};

interface AuthState {
  user: User | null;
}

interface AuthAction {
  type: typeof actions.LOGIN_SUCCESS;
  payload?: any;
}

const initialState: AuthState = { user: null };

const AuthContext = React.createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case actions.LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
      };
    }
  }
  return state;
};

const logginSuccess = (dispatch: React.Dispatch<AuthAction>) => {
  return me().then(({ data: user }) =>
    dispatch({ type: actions.LOGIN_SUCCESS, payload: user })
  );
};

export const AuthProvider = (props: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (token && !state.user) {
      setIsLoggingIn(true);

      logginSuccess(dispatch).finally(() => {
        setIsLoggingIn(false);
      });
    } else {
      setIsLoggingIn(false);
    }
  }, [state, dispatch]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {isLoggingIn ? <CircularProgress /> : props.children}
    </AuthContext.Provider>
  );
};

export const AuthGuard = (props: { children: React.ReactElement }) => {
  const { state } = useContext(AuthContext);

  if (!state.user) {
    return <Navigate to='/login' />;
  }

  return props.children;
};

export const useAuth = () => {
  const { state } = useContext(AuthContext);

  return state.user;
};

export const useLogin = () => {
  const { dispatch } = useContext(AuthContext);

  const onLogin = useCallback(
    (username: string, password: string) => {
      return login(username, password).then((response) => {
        setToken(response.data.accessToken);

        return logginSuccess(dispatch);
      });
    },
    [dispatch]
  );

  return onLogin;
};

export const useSignup = () => {
  const onSignup = useCallback((signupInfo: SignupInfo) => {
    return signup(signupInfo);
  }, []);

  return onSignup;
};
