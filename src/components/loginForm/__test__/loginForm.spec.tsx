import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '..';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const axiosMock = new MockAdapter(axios);

describe('<LoginForm />', () => {
  it('should render the form element', () => {
    const form = render(<LoginForm />);
    const formElement = form.container.querySelector('#login_form');
    expect(formElement).toBeInTheDocument();
  });

  it('should render the username input', () => {
    render(<LoginForm />);

    const usernameInput = screen.getByLabelText(/username/i);
    const label = screen.getByText(/username/i);
  
    expect(usernameInput).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('should render the password input', () => {
    render(<LoginForm />);

    const passowordInput = screen.getByLabelText(/password/i);
    const label = screen.getByText(/password/i);
  
    expect(passowordInput).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('should render the submit input', () => {
    render(<LoginForm />);
    const submitInput = screen.getByText(/sign in/i);
    expect(submitInput).toBeInTheDocument();
  });

  it('should render error message if any field is blank', async () => {
    render(<LoginForm />);

    const button = screen.getByText(/sign in/i);
    fireEvent.click(button);

    const elements = await screen.findAllByText(/Campo obrigatório/i);

    // checks if exists two elements with the same error message (username and password)
    expect(elements.length).toBeCloseTo(2);
  })

  it('should render error message if user not found', async () => {
    // mock response
    axiosMock.onPost().reply(401, 'unauthorized');

    render(<LoginForm />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
  
    // mock input data
    fireEvent.change(usernameInput, {target: {value: 'test'}});
    fireEvent.change(passwordInput, {target: {value: 'test'}});

    const button = screen.getByText(/sign in/i);
    fireEvent.click(button);

    await screen.findByText(/usuário ou senha inválidos/i);
  })
});