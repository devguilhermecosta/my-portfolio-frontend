import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { server } from '../../../utils/mocks/node';
import { http, HttpResponse } from 'msw';
import { baseUrl } from '../../../utils/api';
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
      http.get(`${baseUrl}/work/api/list/`, () => {
        return HttpResponse.json(workList, { status: 200 })
      })
    )

    renderHomePage();

    await screen.findByAltText(/image of work title 1/);
    await screen.findByAltText(/image of work title 2/);
    await screen.findByAltText(/image of work title 3/);
    
  })
})
