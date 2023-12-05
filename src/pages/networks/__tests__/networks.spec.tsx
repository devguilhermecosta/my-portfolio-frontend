import '@testing-library/jest-dom';
import { describe, it, vi, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Networks from '..';
import userEvent from '@testing-library/user-event';
import { server } from '../../../utils/mocks/node';
import { http, HttpResponse } from 'msw';
import { BrowserRouter } from 'react-router-dom';

const renderNetworks = () => {
  return render(
    <BrowserRouter>
      <Networks />
    </BrowserRouter>
  );
}

describe('<Networks />', () => {
  it('should render the networks', async () => {
    renderNetworks();
  
    await screen.findByDisplayValue('guilherme@email.com');
    await screen.findByDisplayValue('https://github.com');
    await screen.findByDisplayValue('https://instagram.com');
    await screen.findByDisplayValue('https://linkedin.com');
    await screen.findByDisplayValue('46999083251');
    await screen.findByDisplayValue('https://whatsapp.com');
    await screen.findByText('save');

  });

  it('should return error message when patch request', async () => {
    server.use(
      http.patch('http://127.0.0.1:8000/networks/api/v1/', () => {
        return new HttpResponse(null, { status: 400 })
      })
    );

    renderNetworks();

    const spy = vi.spyOn(console, 'error');
    const submit = screen.getByText(/save/i);
    await userEvent.click(submit);

    expect(spy).toHaveBeenCalledWith('error on save: AxiosError: Request failed with status code 400');
  });

  it('should return success message when patch request', async () => {
    server.use(
      http.patch('http://127.0.0.1:8000/networks/api/v1/', () => {
        return new HttpResponse(null, { status: 204 })
      })
    );

    renderNetworks();

    const spy = vi.spyOn(console, 'log');
    const submit = screen.getByText(/save/i);
    await userEvent.click(submit);

    expect(spy).toHaveBeenCalledWith('save successfully with status code 204');
  });

  it('should return to dashboard', async () => {
    renderNetworks();

    const backButton = screen.getByText(/</i);
    await userEvent.click(backButton);

    await waitFor(() => expect(window.location.href).toContain('/admin/dashboard'));
  });

  it('should render red input fields when error on post request', async () => {
    server.use(
      http.get('http://127.0.0.1:8000/networks/api/v1/', () => {
        return new HttpResponse(null, { status: 404 })
      }),
      http.post('http://127.0.0.1:8000/networks/api/v1/', () => {
        return HttpResponse.json({
          email: 'Campo obrigatório',
          github: 'Campo obrigatório',
          linkedin: 'Campo obrigatório',
          phone: 'Campo obrigatório',
          whatsapp: 'Campo obrigatório',
          instagram: 'Campo obrigatório',
        }, { status: 400 })
      })
    );

    renderNetworks();

    const submitButton = screen.getByText(/save/i);

    await userEvent.click(submitButton);

    const email = await screen.findByLabelText(/email/i);
    const instagram = await screen.findByLabelText(/instagram/i);
    const github = await screen.findByLabelText(/github/i);
    const linkedin = await screen.findByLabelText(/linkedin/i);
    const phone = await screen.findByLabelText(/phone/i);
    const whatsapp = await screen.findByLabelText(/whatsapp/i);

    expect(email).toHaveStyle({ border: '2px solid red' });
    expect(instagram).toHaveStyle({ border: '2px solid red' });
    expect(github).toHaveStyle({ border: '2px solid red' });
    expect(linkedin).toHaveStyle({ border: '2px solid red' });
    expect(phone).toHaveStyle({ border: '2px solid red' });
    expect(whatsapp).toHaveStyle({ border: '2px solid red' });

  });
})