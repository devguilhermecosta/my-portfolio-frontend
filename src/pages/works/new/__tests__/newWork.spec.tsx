import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import NewWork from '..';
import userEvent from '@testing-library/user-event';
import { server } from '../../../../utils/mocks/node';
import { http, HttpResponse } from 'msw';
import { baseUrl } from '../../../../utils/api';

describe('<NewWork >', () => {
  it('should render a new work form', async () => {
    render(
      <BrowserRouter>
        <NewWork />
      </BrowserRouter>
    );

    await screen.findByText('<');
    await screen.findByLabelText(/title/i);
    await screen.findByLabelText(/description/i);
    await screen.findByLabelText(/link/i);
    await screen.findByLabelText(/cover/i);
    await screen.findByText(/save/i);

  });

  it('should render the inputs with border red when error on post request', async () => {
    server.use(http.post(`${baseUrl}/work/api/create/`, () => {
      return HttpResponse.json({
        title: 'Campo obrigatório',
        description: 'Campo obrigatório',
        cover: 'Envie somente imagens',
      }, { status: 400 })
    }))

    const user = userEvent.setup();

    const page = render(
      <BrowserRouter>
        <NewWork />
      </BrowserRouter>
    );

    const borderStyle = '2px solid red';
    const submitButton = screen.getByText(/save/i);
    await user.click(submitButton);

    expect(await screen.findByLabelText(/title/i)).toHaveStyle({ border: borderStyle });
    expect(await screen.findByLabelText(/description/i)).toHaveStyle({ border: borderStyle });
    expect(page.container.querySelector('#strokeCover')).toHaveStyle({ border: borderStyle });

  });

  it('should render the work images manager if the work is created', async () => {
    server.use(http.post(`${baseUrl}/work/api/create/`, async () => {
      return HttpResponse.json({
        id: 1,
        title: 'work title',
        link: 'https://link.com',
        description: 'work description',
      }, { status: 201 })
    }))

    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <NewWork />
      </BrowserRouter>
    );

    const submitButton = screen.getByText(/save/i);
    await user.click(submitButton);

    expect(await screen.findByText(/now, add some images/i));

  });
})