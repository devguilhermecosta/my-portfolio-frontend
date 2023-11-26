import { createBrowserRouter } from 'react-router-dom';
import Admin from './pages/admin';
import Dashboard from './pages/dashboard';

export const router = createBrowserRouter([
  {
    path: '/admin',
    element: <Admin />
  },
  {
    path: '/admin/dashboard',
    element: <Dashboard />
  }
])
