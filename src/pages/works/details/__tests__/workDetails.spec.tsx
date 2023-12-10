import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { server } from '../../../../utils/mocks/node';
import { http, HttpResponse } from 'msw';
import { baseUrl } from '../../../../utils/api';
import WorkDetail from '..';

describe('<WorkDetail />', () => {
  it('should return page not found if work not found', async () => {
    server.use(
      http.get(`${baseUrl}/work/api/:slug/`, () => {
        return new HttpResponse(null, { status: 404 })
      })
    )

    render(<WorkDetail />);

    await screen.findByText('page not found');
  });

  it('should render the work data', async () => {
    server.use(
      http.get(`${baseUrl}/work/api/:slug/`, () => {
        return HttpResponse.json({
          id: 1,
          title: 'work title',
          description: 'work description',
          link: 'https://my-work.com',
          cover: 'work cover'
        }, { status: 200 })
      })
    )

    render(<WorkDetail />);

    await screen.findByDisplayValue('work title');
    await screen.findByDisplayValue('work description');
    await screen.findByDisplayValue('https://my-work.com');
    await screen.findByAltText(/image of work title/i);
  });
})