import { FormEvent, ReactNode, createContext, useCallback, useEffect, useState } from 'react';
import { tokenRefreshVerify } from '../../utils/auth';
import axios, { AxiosResponse } from 'axios';

interface AuthContextData {
  userTokens: string | null;
  user: string | null,
  handleLogin: (event: FormEvent<HTMLFormElement>) => Promise<AxiosResponse>;
  handleLogout: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userTokens, setUserTokens] = useState<string | null>(() => (localStorage.getItem('userTokens') ? localStorage.getItem('userTokens') : null));
  const [user, setUser] = useState<string | null>(() => (localStorage.getItem('userTokens') ? localStorage.getItem('userTokens') : null));
  const [loading, setLoading] = useState(true);


  const handleLogin = async function(event: FormEvent<HTMLFormElement>): Promise<AxiosResponse> {
    const formData = new FormData(event.currentTarget);
    const url = 'http://127.0.0.1:8000/api/token/';

    const response = await axios.post(url, {
      username: formData.get('username'),
      password: formData.get('password')
    });

    return new Promise(function(resolve, reject) {
      if (response.status !== 200) reject('unauthorized');

      const tokenRefresh = response.data.refresh;
      const tokenAccess = response.data.access;

      localStorage.setItem('userTokens', tokenRefresh);
      setUserTokens(tokenAccess);
      setUser(tokenAccess);

      resolve(response.data);
    })
  }

  const handleLogout = (): void => {
    setUser(null);
    setUserTokens(null);
    localStorage.removeItem('userTokens');
  }

  /**
   * Renew the token access and keeps the user logged in.
   * If the token refresh is invalid, the user will be logged out.
   */
  const updateToken = useCallback(() => {
    function handleUpdateToken(): void {
      tokenRefreshVerify(userTokens)
      .then(response => {
        setUser(response.data.access);
      })
      .catch(() => {
        handleLogout();
      })
      .finally(() => {
        if (loading) setLoading(false);
      })
    }

    handleUpdateToken();

  }, [loading, userTokens])

  /**
   * tries update existing token on the first render
   */
  useEffect(()=>{
    if(loading){
        updateToken()
    }
  },[userTokens, loading, user, updateToken])

  /**
   * Renew the token access every 4 minutes.
   * If the token refresh is invalid, the user will be logged out.
   */
  useEffect(() => {
    const REFRESH_INTERVAL = 1000 * 60 * 4 // 4 minutes
    const interval = setInterval(() => {
        if(userTokens){
            updateToken();
        }
    }, REFRESH_INTERVAL)
    return () => clearInterval(interval)
  }, [updateToken, userTokens])

  return (
    <AuthContext.Provider value={{
      userTokens: userTokens,
      user: user,
      handleLogin: handleLogin,
      handleLogout: handleLogout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// TODO usar variáveis de ambiente para as urls e tempo de refresh.