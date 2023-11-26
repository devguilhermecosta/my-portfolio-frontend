import { render, screen } from '@testing-library/react';
import Admin from '..';
import Dashboard from '../../dashboard';
import { BrowserRouter } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const axiosMock = new MockAdapter(axios);

describe('<Admin />', () => {
  it('should render the login form if not a valid jwt token', () => {
    const admin = render(
      <BrowserRouter>
        <Admin />
      </BrowserRouter>

    );

    const loginForm = admin.container.querySelector('#login_form');

    expect(loginForm).toBeInTheDocument();
  })

  it('should render the dashboard if a valid JWT token', async () => {
    axiosMock.onPost().reply(200, {
      access: 'abcdef'
    });

    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )

    const dashboard = await screen.findByText(/administration area/i);

    expect(dashboard).toBeInTheDocument();
  })
});