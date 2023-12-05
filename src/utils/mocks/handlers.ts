import { http, HttpResponse } from 'msw';
import { workList } from './worksList';
import { baseUrl } from '../api';

export const handlers = [
  http.post(`${baseUrl}/api/token/`, () => {
    return new HttpResponse('any');
  }),
  http.post(`${baseUrl}/api/token/refresh/`, () => {
    return new HttpResponse('any');
  }),
  http.post(`${baseUrl}/api/token/verify/`, () => {
    return new HttpResponse('any');
  }),
  http.post(`${baseUrl}/networks/api/v1/`, () => {
    return new HttpResponse(null, { status: 201 })
  }),
  http.get(`${baseUrl}/networks/api/v1/`, () => {
    return HttpResponse.json({
        email: "guilherme@email.com",
        github: "https://github.com",
        instagram: "https://instagram.com",
        linkedin: "https://linkedin.com",
        phone: "46999083251",
        whatsapp: "https://whatsapp.com",
    }, { status: 200 });
  }),
  http.post(`${baseUrl}/networks/api/v1/`, () => {
    return new HttpResponse('any');
  }),
  http.patch(`${baseUrl}/networks/api/v1/`, () => {
    return new HttpResponse('any');
  }),
  http.get(`${baseUrl}/work/api/list/`, () => {
    return HttpResponse.json(workList , { status: 200 })
  }),
  http.post(`${baseUrl}/work/api/create/`, () => {
    return new HttpResponse(null, { status: 400 });
  })
]