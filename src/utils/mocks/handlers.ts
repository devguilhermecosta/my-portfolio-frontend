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
  http.get('http://127.0.0.1:8000/networks/api/v1/', () => {
    return HttpResponse.json({
        email: "guilherme@email.com",
        github: "https://github.com",
        instagram: "https://instagram.com",
        linkedin: "https://linkedin.com",
        phone: "46999083251",
        whatsapp: "https://whatsapp.com",
    }, { status: 200 });
  }),
  http.post('http://127.0.0.1:8000/networks/api/v1/', () => {
    return new HttpResponse('any');
  }),
  http.patch('http://127.0.0.1:8000/networks/api/v1/', () => {
    return new HttpResponse('any');
  }),
]