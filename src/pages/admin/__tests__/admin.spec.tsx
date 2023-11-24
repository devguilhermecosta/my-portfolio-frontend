import { render } from '@testing-library/react';
import Admin from '..';


describe('<Admin />', () => {
  it('should render the login form', () => {
    const admin = render(<Admin />);

    const loginForm = admin.container.querySelector('#login_form');

    expect(loginForm).toBeInTheDocument();
  });
});