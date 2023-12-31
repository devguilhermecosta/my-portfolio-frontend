import { http, HttpResponse } from 'msw';
import { workList } from './worksList';
import { baseUrl } from '../api';
import { oneWorkMock } from './worksList';

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
  http.patch(`${baseUrl}/networks/api/v1/`, () => {
    return new HttpResponse('any');
  }),
  http.post(`${baseUrl}/networks/api/v1/`, () => {
    return new HttpResponse(null, { status: 201 })
  }),
  http.get(`${baseUrl}/networks/api/v1/`, () => {
    return new HttpResponse(null, { status: 201 })
  }),
  http.post(`${baseUrl}/networks/api/v1/`, () => {
    return new HttpResponse('any');
  }),
  http.get(`${baseUrl}/work/api/list/`, () => {
    return HttpResponse.json(workList , { status: 200 })
  }),
  http.post(`${baseUrl}/work/api/create/`, () => {
    return new HttpResponse(null, { status: 400 });
  }),
  http.post(`${baseUrl}/work/api/images/create/`, () => {
    return new HttpResponse(null, { status: 400 });
  }),
  http.get(`${baseUrl}/work/api/:slug/`, () => {
    return HttpResponse.json(oneWorkMock, { status: 200 })
  }),
  http.get(`${baseUrl}/work/api/images/:id/list/`, () => {
    return new HttpResponse(null, { status: 200 })
  })
]