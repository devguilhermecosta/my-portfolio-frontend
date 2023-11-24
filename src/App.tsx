import { createBrowserRouter } from 'react-router-dom';
import Admin from './pages/admin';

export const router = createBrowserRouter([
  {
    path: '/admin',
    element: <Admin />
  },
])
