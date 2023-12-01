import { fireEvent, render, screen } from '@testing-library/react';
import LoginPage from '..';
import { BrowserRouter } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
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
    server.use(http.post('/api/token', () => {
      return new HttpResponse(null, { status: 401 });
    }));

    renderLoginPage();

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(usernameInput, { target: { value: 'test' } });
    fireEvent.change(passwordInput, { target: { value: 'test' } });

    const button = screen.getByText(/sign in/i);

    await userEvent.click(button);

    await screen.findByText(/usuário ou senha inválidos/i);
  });

  it('should authenticate the user', async () => {
    server.use(http.post('http://127.0.0.1:8000/api/token/', async () => {
      return HttpResponse.json({
        data: {
          refresh: 'abcde',
          access: 'abcde'
        }
      }, { status: 200 })
    }))

    renderLoginPage();

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(usernameInput, { target: { value: 'test' } });
    fireEvent.change(passwordInput, { target: { value: 'test' } });

    const spy = jest.spyOn(Storage.prototype, 'setItem');

    const button = screen.getByText(/sign in/i);

    await userEvent.click(button);

    expect(spy).toHaveBeenCalled();
  })
})
