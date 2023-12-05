import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
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

    const page = render(
      <BrowserRouter>
        <NewWork />
      </BrowserRouter>
    );

    const borderStyle = '2px solid red';

    const submitButton = screen.getByText(/save/i);

    await userEvent.click(submitButton);

    const titleInput = await screen.findByLabelText(/title/i);
    const description = await screen.findByLabelText(/description/i);
    const cover = page.container.querySelector('#strokeCover');

    expect(titleInput).toHaveStyle({
      border: borderStyle
    })
    expect(description).toHaveStyle({
      border: borderStyle
    })
    expect(cover).toHaveStyle({
      border: borderStyle
    })

  });
})