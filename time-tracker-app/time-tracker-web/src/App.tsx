import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Activities from './pages/Activities';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthGuard, AuthProvider } from './context/Auth';
import { SnackbarProvider } from './context/Snackbar';
import Layout from './components/Layout';
import { AppThemeProvider } from './context/Theme';
import Dashboard from './pages/Dashboard';
import NewActivity from './pages/NewActivity';

const App = () => {
  return (
    <BrowserRouter>
      <AppThemeProvider>
        <SnackbarProvider>
          <AuthProvider>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route
                path='/activities'
                element={
                  <AuthGuard>
                    <Layout>
                      <Activities />
                    </Layout>
                  </AuthGuard>
                }
              />
              <Route
                path='/activities/new'
                element={
                  <AuthGuard>
                    <Layout>
                      <NewActivity />
                    </Layout>
                  </AuthGuard>
                }
              />
              <Route
                path='/dashboard'
                element={
                  <AuthGuard>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </AuthGuard>
                }
              />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </SnackbarProvider>
      </AppThemeProvider>
    </BrowserRouter>
  );
};

export default App;
