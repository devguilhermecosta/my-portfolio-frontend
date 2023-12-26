import { createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import LoginPage from './pages/login';
import Networks from './pages/networks';
import Works from './pages/works';
import PrivateRoute from './components/privateRoute';
import NewWork from './pages/works/new';
import WorkDetail from './pages/works/details';
import Home from './pages/home';
import HomeWorkDetail from './pages/home/works/workDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/work/:slug',
    element: <HomeWorkDetail />
  },
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
  },
  {
    path:'admin/dashboard/works/new',
    element: <PrivateRoute><NewWork /></PrivateRoute>
  },
  {
    path:'admin/dashboard/works/:slug',
    element: <PrivateRoute><WorkDetail /></PrivateRoute>
  }
])
