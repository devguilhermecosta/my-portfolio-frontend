import LoginForm from '../../components/loginForm';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default function Admin(): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenRefresh] = useState(localStorage.getItem('tokenRefresh'));
  const [tokenAccess, setTokenAccess] = useState('');

  useEffect(() => {
    if (!tokenRefresh) {
      setIsAuthenticated(false);
      return;
    }

    async function tokenRefreshVerify() {
      await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
        refresh: JSON.parse(tokenRefresh ? tokenRefresh : '')
      })
      .then((response) => setTokenAccess(response.data.access))
      .catch(() => setIsAuthenticated(false))
    }

    tokenRefreshVerify();

  }, [tokenRefresh]);

  useEffect(() => {
    async function tokenAccessVerify(): Promise<void> {
      await axios.post('http://127.0.0.1:8000/api/token/verify/', {
        token: tokenAccess
      })
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false))
    }

    tokenAccessVerify();

  }, [tokenAccess])


  if (isAuthenticated) {
    return <Navigate to={'/admin/dashboard'}/>
  }

  // if the token is not valid or
  // token does not exists, render the login form
  return (
    <LoginForm />
  )
}
