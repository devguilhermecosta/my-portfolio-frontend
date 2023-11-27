import LoginForm from '../../components/loginForm';
import { useState, useEffect } from 'react';
import { tokenRefreshVerify, tokenAccessVerify } from '../../utils/auth';
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

    tokenRefreshVerify(tokenRefresh)
    .then((response) => {setTokenAccess(response.data.access)})
    .catch(() => setIsAuthenticated(false))

  }, [tokenRefresh]);

  useEffect(() => {
    if (!tokenAccess) {
      setIsAuthenticated(false);
      return;
    }
    
    tokenAccessVerify(tokenAccess)
    .then(() => setIsAuthenticated(true))
    .catch(() => setIsAuthenticated(false))
  
  }, [tokenAccess])

  // if the token is not valid or
  // token does not exists, render the login form
  if (!isAuthenticated) {
    return (
      <LoginForm />
    )
  }

  return (
    <Navigate to={'/admin/dashboard'}/>
  )
}
