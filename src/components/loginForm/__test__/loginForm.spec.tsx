import { render, screen } from '@testing-library/react';
import LoginForm from '..';

describe('<LoginForm />', () => {
  it('should render the form element', () => {
    const form = render(<LoginForm />);
    const formElement = form.container.querySelector('#login_form');
    expect(formElement).toBeInTheDocument();
  });

  it('should render the username input', () => {
    const form = render(<LoginForm />);

    const usernameInput = form.container.querySelector('#username');
    const label = screen.getByText(/username/i);
  
    expect(usernameInput).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('should render the password input', () => {
    const form = render(<LoginForm />);

    const passowordInput = form.container.querySelector('#password');
    const label = screen.getByText(/password/i);
  
    expect(passowordInput).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('should render the submit input', () => {
    render(<LoginForm />);
    const submitInput = screen.getByText(/sign in/i);
    expect(submitInput).toBeInTheDocument();
  });
});