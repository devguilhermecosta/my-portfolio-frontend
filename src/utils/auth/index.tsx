import { AxiosResponse } from "axios";
import { api } from "../api";

const tokenRefreshVerify = async function(tokenRefresh: string | null): Promise<AxiosResponse> {
  const response = await api.post('/api/token/refresh/', {
    refresh: tokenRefresh
  });

  return new Promise(function(resolve, reject) {
    if (response.status !== 200) reject('unauthorized');
    return resolve(response);
  });
}

const tokenAccessVerify = async function(tokenAccess: string): Promise<AxiosResponse> {
  const response = await api.post('/api/token/verify/', {
    token: tokenAccess
  });

  return new Promise(function(resolve, reject) {
    if (response.status !== 200) reject('unauthorized');
    return resolve(response);
  })
}

export { tokenRefreshVerify, tokenAccessVerify };