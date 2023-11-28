import { FormEvent, ReactNode, createContext, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface AuthContextData {
  userTokens: string | null;
  handleLogin: (event: FormEvent<HTMLFormElement>) => Promise<AxiosResponse>;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userTokens, setUserTokens] = useState<string | null>(localStorage.getItem('userTokens'));

  const handleLogin = async function(event: FormEvent<HTMLFormElement>): Promise<AxiosResponse> {
    const url = 'http://127.0.0.1:8000/api/token/';

    const response = await axios.post(url, {
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
    });

    return new Promise(function(resolve, reject) {
      if (response.status !== 200) return reject('unauthorized');
    
      const token = JSON.stringify(response.data);
      localStorage.setItem( 'userTokens', token);
      setUserTokens(token);

      return resolve(response);
    })
  }

  return (
    <AuthContext.Provider value={{
      userTokens: userTokens,
      handleLogin: handleLogin,
    }}>
      {children}
    </AuthContext.Provider>
  )
}