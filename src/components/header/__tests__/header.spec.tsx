import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { server } from '../../../utils/mocks/node';
import { http, HttpResponse } from 'msw';
import { BrowserRouter } from 'react-router-dom';
import Header from '..';

const renderHeader = () => {
  return render(
  <BrowserRouter>
    <Header />
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
      http.get(`/networks/api/v1/`, () => {
        return HttpResponse.json(apiData, { status: 200 })
      })
    )

    renderHeader();

    const instagram = await screen.findByText(/instagram/i);
    const linkedin = await screen.findByText(/linkedin/i);
    const github = await screen.findByText(/github/i);

    expect(instagram.getAttribute('href')).toContain(apiData.instagram);
    expect(linkedin.getAttribute('href')).toContain(apiData.linkedin);
    expect(github.getAttribute('href')).toContain(apiData.github);

  })
})
