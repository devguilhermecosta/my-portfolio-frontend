import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { server } from '../../../utils/mocks/node';
import { http, HttpResponse } from 'msw';
import { BrowserRouter } from 'react-router-dom';
import Home from '..';
import { workList } from '../../../utils/mocks/worksList';

const renderHomePage = () => {
  return render(
  <BrowserRouter>
    <Home />
  </BrowserRouter>)
}

describe('<Home />', () => {
  it('should render the works', async () => {
    server.use(
      http.get('/work/api/list/', () => {
        return HttpResponse.json(workList, { status: 200 })
      }),
      http.get('/networks/api/v1/', () => {
        return HttpResponse.json(null, { status: 200 })
      })
    )

    renderHomePage();

    await screen.findByAltText(/image of work title 1/);
    await screen.findByAltText(/image of work title 2/);
    await screen.findByAltText(/image of work title 3/);
    
  })

  it('should render the works just is_published and show_in_home are true', async () => {
    server.use(
      http.get('/work/api/list/', () => {
        return HttpResponse.json([
          {
            "id": 7,
            "title": "work title 1",
            "description": "esta é a descrição do projeto",
            "cover": "/media/works/covers/Sem_t%C3%ADtulo_ymKnj1J.jpg",
            "is_published": true,
            "show_in_home": false, // false
          },
          {
            "id": 4,
            "title": "work title 2",
            "description": "esta é a descrição do projeto",
            "cover": "/media/works/covers/Sem_t%C3%ADtulo_xgHqC3x.jpg",
            "is_published": true,
            "show_in_home": true,  // true
          },
        ], { status: 200 })
      }),
      http.get('/networks/api/v1/', () => {
        return HttpResponse.json(null, { status: 200 })
      })
    )

    renderHomePage();

    const worksLenght = await screen.findAllByAltText(/image of work/);

    expect(worksLenght.length).toBeCloseTo(1);
  })
})
