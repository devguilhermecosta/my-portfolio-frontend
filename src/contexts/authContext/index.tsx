import { ReactNode, createContext, useCallback, useEffect, useState } from 'react';
import { tokenRefreshVerify } from '../../utils/auth';

interface AuthContextData {
  userTokens: string | null;
  isAuthenticated: string | null,
  userAuthentication: (data: ResponseDataProps) => void;
  handleLogout: () => void;
}

interface ResponseDataProps {
  refresh: string;
  access: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userTokens, setUserTokens] = useState<string | null>(localStorage.getItem('userTokens'));
  const [isAuthenticated, setIsAuthenticated] = useState<string | null>(localStorage.getItem('userTokens'));

  function userAuthentication(data: ResponseDataProps) {
    const tokenRefresh = data.refresh;
    const tokenAccess = data.access;
    localStorage.setItem('userTokens', tokenRefresh);
    setUserTokens(tokenRefresh);
    setIsAuthenticated(tokenAccess);
  }

  const handleLogout = (): void => {
    setIsAuthenticated(null);
    setUserTokens(null);
    localStorage.removeItem('userTokens');
  }

  const updateToken = useCallback(() => {
    /**
     * Renew the token access and keeps the user logged in.
     * If the token refresh is invalid, the user will be logged out.
     */
    function handleUpdateToken(): void {
      tokenRefreshVerify(userTokens)
      .then(response => {
        setIsAuthenticated(response.data.access);
      })
      .catch(() => {
        setIsAuthenticated(null);
        handleLogout();
      })
    }

    handleUpdateToken();

  }, [userTokens])

  useEffect(() => {
    /**
     * Renew the token access every 4 minutes.
     * If the token refresh is invalid, the user will be logged out.
     */
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
      isAuthenticated: isAuthenticated,
      userAuthentication: userAuthentication,
      handleLogout: handleLogout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// TODO usar variáveis de ambiente para as urls e tempo de refresh.