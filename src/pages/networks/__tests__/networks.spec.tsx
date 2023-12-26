import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Networks from '..';
import userEvent from '@testing-library/user-event';
import { server } from '../../../utils/mocks/node';
import { http, HttpResponse } from 'msw';
import { BrowserRouter } from 'react-router-dom';
import { baseUrl } from '../../../utils/api';

describe('<Networks />', () => {
  const renderNetworks = () => {
    return render(
      <BrowserRouter>
        <Networks />
      </BrowserRouter>
    );
  };

  const networksData = {
    email: 'email@email.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    phone: '41988082294',
    whatsapp: '41988082295',
    instagram: 'https://instagram.com',
  };

  const netWorksErrors = {
    email: 'Campo obrigatório',
    github: 'Campo obrigatório',
    linkedin: 'Campo obrigatório',
    phone: 'Campo obrigatório',
    whatsapp: 'Campo obrigatório',
    instagram: 'Campo obrigatório',
  };

  const inputStyleOnError = '2px solid red';

  it('should render the networks if networks exists when get request', async () => {
    server.use(
      http.get(`${baseUrl}/networks/api/v1/`, () => {
        return HttpResponse.json(networksData, { status: 200 })
      }),
    );

    renderNetworks();
  
    await screen.findByDisplayValue('email@email.com');
    await screen.findByDisplayValue('https://github.com');
    await screen.findByDisplayValue('https://instagram.com');
    await screen.findByDisplayValue('https://linkedin.com');
    await screen.findByDisplayValue('41988082294');
    await screen.findByDisplayValue('41988082295');
    await screen.findByText('save');
    await screen.findByText('<');

  });

  it('should render red input fields when error on patch request', async () => {
    server.use(
      http.get('http://127.0.0.1:8000/networks/api/v1/', () => {
        return HttpResponse.json(networksData, { status: 200 })
      }),
      http.patch('http://127.0.0.1:8000/networks/api/v1/', () => {
        return HttpResponse.json(netWorksErrors, { status: 400 })
      })
    );

    const user = userEvent.setup();

    renderNetworks();

    const submit = screen.getByText(/save/i);

    await user.click(submit);

    expect(await screen.findByLabelText(/email/i)).toHaveStyle({ border: inputStyleOnError });
    expect(await screen.findByLabelText(/instagram/i)).toHaveStyle({ border: inputStyleOnError });
    expect(await screen.findByLabelText(/github/i)).toHaveStyle({ border: inputStyleOnError });
    expect(await screen.findByLabelText(/linkedin/i)).toHaveStyle({ border: inputStyleOnError });
    expect(await screen.findByLabelText(/phone/i)).toHaveStyle({ border: inputStyleOnError });
    expect(await screen.findByLabelText(/whatsapp/i)).toHaveStyle({ border: inputStyleOnError });

  });

  it('should update the field when patch request', async () => {
    /* set the email to blank */
    networksData.email = '';

    server.use(
      http.get('http://127.0.0.1:8000/networks/api/v1/', () => {
        return HttpResponse.json(networksData, { status: 200 })
      }),
      http.patch(`${baseUrl}/networks/api/v1/`, () => {
        return new HttpResponse(null, { status: 204 })
      }),
    );

    const user = userEvent.setup();

    renderNetworks();

    const submitInput = screen.getByText(/save/i);

    const emailValue = 'email@email.com';
    await user.type(await screen.findByLabelText(/email/i), emailValue);
    await user.click(submitInput);

    expect(await screen.findByDisplayValue(emailValue)).toBeInTheDocument();
  
  });

  it('should render red input fields when error on post request', async () => {
    server.use(
      /* returns 404 to say that there is no networks instance */
      http.get('http://127.0.0.1:8000/networks/api/v1/', () => {
        return new HttpResponse(null, { status: 404 })
      }),
      http.post('http://127.0.0.1:8000/networks/api/v1/', () => {
        return HttpResponse.json(netWorksErrors, { status: 400 })
      })
    );

    const user = userEvent.setup();

    renderNetworks();

    const inputStyleOnError = '2px solid red';
    const submitButton = screen.getByText(/save/i);
    await user.click(submitButton);

    expect(await screen.findByLabelText(/email/i)).toHaveStyle({ border: inputStyleOnError });
    expect(await screen.findByLabelText(/instagram/i)).toHaveStyle({ border: inputStyleOnError });
    expect(await screen.findByLabelText(/github/i)).toHaveStyle({ border: inputStyleOnError });
    expect(await screen.findByLabelText(/linkedin/i)).toHaveStyle({ border: inputStyleOnError });
    expect(await screen.findByLabelText(/phone/i)).toHaveStyle({ border: inputStyleOnError });
    expect(await screen.findByLabelText(/whatsapp/i)).toHaveStyle({ border: inputStyleOnError });

  });

  it('should create a new networks instance when post request and the networks does not exists', async () => {
    /* set the email data */
    networksData.email = 'email@email.com';

    server.use(
      /* returns 404 to say that there is no networks instance */
      http.get('http://127.0.0.1:8000/networks/api/v1/', () => {
        return new HttpResponse(null, { status: 404 })
      }),
      http.post('http://127.0.0.1:8000/networks/api/v1/', () => {
        return HttpResponse.json(networksData, { status: 201 })
      })
    );

    const user = userEvent.setup();

    renderNetworks();

    const submitButton = screen.getByText(/save/i);
    
    await user.type(screen.getByLabelText(/email/i), networksData.email);
    await user.type(screen.getByLabelText(/instagram/i), networksData.instagram);
    await user.type(screen.getByLabelText(/github/i), networksData.github);
    await user.type(screen.getByLabelText(/linkedin/i), networksData.linkedin);
    await user.type(screen.getByLabelText(/phone/i), networksData.phone);
    await user.type(screen.getByLabelText(/whatsapp/i), networksData.whatsapp);
    
    await user.click(submitButton);

    expect(await screen.findByDisplayValue(networksData.email)).toBeInTheDocument();
    expect(await screen.findByDisplayValue(networksData.instagram)).toBeInTheDocument();
    expect(await screen.findByDisplayValue(networksData.github)).toBeInTheDocument();
    expect(await screen.findByDisplayValue(networksData.linkedin)).toBeInTheDocument();
    expect(await screen.findByDisplayValue(networksData.phone)).toBeInTheDocument();
    expect(await screen.findByDisplayValue(networksData.whatsapp)).toBeInTheDocument();
  
  });

  it('should return to dashboard', () => {
    renderNetworks();

    const backButton = screen.getByText(/</i);
    fireEvent.click(backButton);
    expect(window.location.href).toContain('/admin/dashboard');
  
  });
})