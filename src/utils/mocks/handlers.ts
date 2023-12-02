import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('http://127.0.0.1:8000/api/token/', () => {
    return new HttpResponse('any');
  }),
  http.post('http://127.0.0.1:8000/api/token/refresh/', () => {
    return new HttpResponse('any');
  }),
  http.post('http://127.0.0.1:8000/api/token/verify/', () => {
    return new HttpResponse('any');
  }),
]