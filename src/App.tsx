import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Activities from './pages/Activities';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthGuard, AuthProvider } from './context/Auth';

const App = () => {
  return (
    <Container>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route
              path='/'
              element={
                <AuthGuard>
                  <Activities />
                </AuthGuard>
              }
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </Container>
  );
};

export default App;
