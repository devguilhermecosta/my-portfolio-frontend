import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '..';
import { BrowserRouter } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import 'axios';
 
const handlers = [
  http.post('/api/token/', () => {
    return new HttpResponse(null, { status: 401 })
  }),
]

const server = setupServer(...handlers);

function renderLoginPage() {
  return (
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    )
  )
}

describe('<loginPage />', () => {
  beforeEach(() => {
    server.listen()
    console.log('intercepting...')
  })

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

  it('should render error message if user not found', async () => {
    renderLoginPage();

    // mock input data
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(usernameInput, {target: {value: 'test'}});
    fireEvent.change(passwordInput, {target: {value: 'test'}});

    const button = await screen.findByText(/sign in/i);     

    await userEvent.click(button);
  
    await screen.findByText(/usuário ou senha inválidos/i);

  });
})



// describe('<LoginForm />', () => {
//   const axiosMock = new MockAdapter(axios);

//   it('should render the form element', () => {
//     const form = render(<LoginPage />);
//     const formElement = form.container.querySelector('#login_form');
//     expect(formElement).toBeInTheDocument();
//   });

//   it('should render the username input', () => {
//     render(<LoginPage />);

//     const usernameInput = screen.getByLabelText(/username/i);
//     const label = screen.getByText(/username/i);
  
//     expect(usernameInput).toBeInTheDocument();
//     expect(label).toBeInTheDocument();
//   });

//   it('should render the password input', () => {
//     render(<LoginPage />);

//     const passowordInput = screen.getByLabelText(/password/i);
//     const label = screen.getByText(/password/i);
  
//     expect(passowordInput).toBeInTheDocument();
//     expect(label).toBeInTheDocument();
//   });

//   it('should render the submit input', () => {
//     render(<LoginPage />);
//     const submitInput = screen.getByText(/sign in/i);
//     expect(submitInput).toBeInTheDocument();
//   });

//   it('should render error message if any field is blank', async () => {
//     render(<LoginPage />);

//     const button = screen.getByText(/sign in/i);
//     fireEvent.click(button);

//     const elements = await screen.findAllByText(/Campo obrigatório/i);

//     // checks if exists two elements with the same error message (username and password)
//     expect(elements.length).toBeCloseTo(2);
//   })

//   it('should render error message if user not found', async () => {
//     // mock response
//     axiosMock.onPost().reply(401, 'unauthorized');

//     render(<LoginPage />);

//     // mock input data
//     const usernameInput = screen.getByLabelText(/username/i);
//     const passwordInput = screen.getByLabelText(/password/i);
//     fireEvent.change(usernameInput, {target: {value: 'test'}});
//     fireEvent.change(passwordInput, {target: {value: 'test'}});

//     const button = screen.getByText(/sign in/i);
//     fireEvent.click(button);

//     await screen.findByText(/usuário ou senha inválidos/i);
//   })

//   it('should save the token refresh in localStorage', async () => {
//     // mock response
//     axiosMock.onPost().reply(200, {
//       refresh: 'abcdef',
//       access: 'abcde'
//     });
    
//     render(<LoginPage />);

//     // mock input data
//     const usernameInput = screen.getByLabelText(/username/i);
//     const passwordInput = screen.getByLabelText(/password/i);
//     fireEvent.change(usernameInput, {target: {value: 'test'}});
//     fireEvent.change(passwordInput, {target: {value: 'test'}});

//     const button = screen.getByText(/sign in/i);
  
//     // mock the localStorage
//     const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');
   
//     await userEvent.click(button);
  
//     expect(mockSetItem).toHaveBeenCalledTimes(1);
//     })
// });