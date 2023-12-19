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
  it('should render the links to networks', async () => {
    const apiData = {
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
    server.use(
      http.get(`${baseUrl}/networks/api/v1/`, () => {
        return HttpResponse.json(apiData, { status: 200 })
      })
    )

    renderHomePage();

    const instagram = await screen.findByText(/instagram/i);
    const linkedin = await screen.findByText(/linkedin/i);
    const github = await screen.findByText(/github/i);

    expect(instagram.getAttribute('href')).toContain(apiData.instagram);
    expect(linkedin.getAttribute('href')).toContain(apiData.linkedin);
    expect(github.getAttribute('href')).toContain(apiData.github);

  })

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

// TODO: refatorar todos os testes