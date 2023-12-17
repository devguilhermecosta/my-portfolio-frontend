import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it } from 'vitest';
import ContactElement from '..';
import { BrowserRouter } from 'react-router-dom';
import { baseUrl } from '../../../utils/api';
import { server } from '../../../utils/mocks/node';
import { http, HttpResponse } from 'msw';

const renderContactElement = (text?: string) => {
  return render(
    <BrowserRouter>
      <ContactElement ctaText={text}/>
    </BrowserRouter>
  )
}

describe('<ContactElement />', () => {
  it('should render the element with default text', () => {
    renderContactElement();
    const button = screen.getByText(/fale comigo/i);
    expect(button).toBeInTheDocument();
  });

  it('should render the element with custom text', () => {
    renderContactElement('custom text');
    const button = screen.getByText(/custom text/i);
    expect(button).toBeInTheDocument();
  });

  it('should open the contact page when clicked', async () => {
    server.use(
      http.get(`${baseUrl}/networks/api/v1/`, () => {
        return HttpResponse.json({
          whatsapp: '(88) 8 8888-8888',
          phone: '(99) 9 9999-9999',
          email: 'email@gmail.com'
        }, { status: 200 })
      })
    )
    const user = userEvent.setup();
    renderContactElement();

    const button = screen.getByText(/fale comigo/i);
    await user.click(button);

    await screen.findAllByText('me chama lá no whats');
  });

  it('should open default contact values if error from get api data', async () => {
    server.use(
      http.get(`${baseUrl}/networks/api/v1/`, () => {
        return HttpResponse.json(null, { status: 400 })
      })
    )
    const user = userEvent.setup();
    renderContactElement();

    const button = screen.getByText(/fale comigo/i);
    await user.click(button);

    await screen.findByText('guilherme.partic@gmail.com');  // email
    await screen.findByTestId('46999083251');               // whatsapp number
    await screen.findByText('(46) 9 9908-3251');            // phone number
  });

  it('should show the contact api values', async () => {
    server.use(
      http.get(`${baseUrl}/networks/api/v1/`, () => {
        return HttpResponse.json({
          whatsapp: '(88) 8 8888-8888',
          phone: '(99) 9 9999-9999',
          email: 'email@gmail.com'
        }, { status: 200 })
      })
    )
    const user = userEvent.setup();
    renderContactElement();

    const button = screen.getByText(/fale comigo/i);
    await user.click(button);

    await screen.findByText('email@gmail.com');  // email
    await screen.findByTestId('88888888888');    // treated whatsapp number
    await screen.findByText('(99) 9 9999-9999'); // phone number
  });
});