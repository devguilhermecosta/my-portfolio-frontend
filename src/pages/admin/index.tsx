import LoginForm from '../../components/loginForm';
import { useState, useEffect } from 'react';

export default function Admin(): JSX.Element {
  const [refreshToken, setRefreshToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('tokenRefresh');
    if (token) setRefreshToken(token);
  }, [refreshToken]);

  // método para verificar se o token refresh é válido


  if (!refreshToken) return <LoginForm />;

  return (
    <section></section>
  )
}