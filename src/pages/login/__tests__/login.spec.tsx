import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import LoginPage from '..';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../contexts/authContext';
import { server } from '../../../utils/mocks/node';
import { http, HttpResponse } from 'msw';


function renderLoginPage() {
  return (
    render(
      <AuthProvider>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </AuthProvider>
    )
  )
}

describe('<loginPage />', () => {
  it('should render the correct content', async () => {
    renderLoginPage();

    await screen.findByText(/username/i);       // label
    await screen.findByText(/password/i);       // label
    await screen.findByLabelText(/username/i);  // input
    await screen.findByLabelText(/password/i);  // input
    await screen.findByText(/sign in/i);        // input submit
  });

  it('should render error message if any field is blank', async () => {
    renderLoginPage();

    const button = screen.getByText(/sign in/i);
  
    await userEvent.click(button);

    await screen.findAllByText(/campo obrigatório/i);
  });

  it('should render username or password is invalid', async () => {
    const handlers = [
      http.post('http://127.0.0.1:8000/api/token/', () => {
        return new HttpResponse(null, { status: 401 });
      }),
      http.post('http://127.0.0.1:8000/api/token/refresh/', () => {
        return new HttpResponse(null, { status: 401 })
      }),
    ]

    server.use(...handlers);

    renderLoginPage();

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(usernameInput, { target: { value: 'test' } });
    fireEvent.change(passwordInput, { target: { value: 'test' } });

    const button = screen.getByText(/sign in/i);

    await userEvent.click(button);

    await screen.findByText(/usuário ou senha inválidos/i);

    // the /admin/dashboard route should not be called
    await waitFor(() => expect(window.location.href).not.toContain('/admin/dashboard'))
  });

  it('should authenticate the user', async () => {
    const handlers = [
      http.post('http://127.0.0.1:8000/api/token/', () => {
        return HttpResponse.json({
          data: {
            refresh: 'abc',
            access: 'abc'
          }
        }, { status: 200 })
      }),
      http.post('http://127.0.0.1:8000/api/token/refresh/', () => {
        return HttpResponse.json({
          data: {
            access: 'abc'
          }
        }, { status: 401 })
      }),
    ]

    server.use(...handlers);

    renderLoginPage();

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(usernameInput, { target: { value: 'test' } });
    fireEvent.change(passwordInput, { target: { value: 'test' } });

    const button = screen.getByText(/sign in/i);

    await userEvent.click(button);

    // the /admin/dashboard route should be called
    await waitFor(() => expect(window.location.href).toContain('/admin/dashboard'))
  })
})
