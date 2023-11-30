import { render, screen } from '@testing-library/react';
import LoginPage from '..';
import { BrowserRouter } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import { AuthProvider } from '../../../contexts/authContext';

 
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
})
