import { FormEvent, ReactNode, createContext, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface AuthContextData {
  userTokens: string | null;
  isAuthenticated: boolean,
  handleLogin: (event: FormEvent<HTMLFormElement>) => Promise<AxiosResponse>;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userTokens, setUserTokens] = useState<string | null>(localStorage.getItem('userTokens'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async function(event: FormEvent<HTMLFormElement>): Promise<AxiosResponse> {
    const url = 'http://127.0.0.1:8000/api/token/';

    const response = await axios.post(url, {
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
    });

    return new Promise(function(resolve, reject) {
      if (response.status !== 200) return reject('unauthorized');
    
      const tokenRefresh = JSON.stringify(response.data.refresh);
      localStorage.setItem( 'userTokens', tokenRefresh);
      setUserTokens(tokenRefresh);
      setIsAuthenticated(true);

      return resolve(response);
    })
  }

  return (
    <AuthContext.Provider value={{
      userTokens: userTokens,
      isAuthenticated: isAuthenticated,
      handleLogin: handleLogin,
    }}>
      {children}
    </AuthContext.Provider>
  )
}