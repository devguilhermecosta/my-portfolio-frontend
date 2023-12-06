import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Works from '..';
import { server } from '../../../utils/mocks/node';
import { http, HttpResponse} from 'msw';
import { BrowserRouter } from 'react-router-dom';

const renderWorks = () => {
  return render(
    <BrowserRouter>
      <Works />
    </BrowserRouter>
  );
}

describe('<Works />', () => {
  it('should render error message if server error', async () => {
    server.use(
      http.get('http://127.0.0.1:8000/work/api/list/', () => {
        return new HttpResponse('internal server error', { status: 500 })
      })
    )

    renderWorks();

    await screen.findByText(/internal server error/i);

  });

  it('should render the works', async () => {
    renderWorks();

    /* see the handlers on ./src/utils/mocks/handlers.ts */

    await screen.findByText(/work title 1/i);
    await screen.findByText(/work title 2/i);
    await screen.findByText(/work title 3/i);

  });

  it('should navigate to new work page', () => {
    renderWorks();

    const newWork = screen.getByText(/new work/i);
    fireEvent.click(newWork);
    expect(window.location.href).toContain('/admin/dashboard/works/new');
  
  });

  it('should return to dashboard', () => {
    renderWorks();

    const backButton = screen.getByText(/</i);
    fireEvent.click(backButton);
    expect(window.location.href).toContain('/admin/dashboard');

  });
})