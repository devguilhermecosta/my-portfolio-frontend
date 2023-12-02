import { createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/admin';
import LoginPage from './pages/login';
import Networks from './pages/networks';
import Works from './pages/works';
import PrivateRoute from './components/privateRoute';

export const router = createBrowserRouter([
  {
    path: 'admin/login',
    element: <LoginPage />
  },
  {
    path: 'admin/dashboard',
    element: <PrivateRoute><Dashboard /></PrivateRoute>
  },
  {
    path: 'admin/dashboard/networks',
    element: <PrivateRoute><Networks /></PrivateRoute>
  },
  {
    path: 'admin/dashboard/works',
    element: <PrivateRoute><Works /></PrivateRoute>
  }
])
