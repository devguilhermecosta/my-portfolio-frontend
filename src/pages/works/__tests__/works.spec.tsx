import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Works from '..';
import { server } from '../../../utils/mocks/node';
import { http, HttpResponse} from 'msw';
import { BrowserRouter } from 'react-router-dom';
import { workList } from '../../../utils/mocks/worksList';

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
      http.get('/work/api/list/', () => {
        return new HttpResponse('internal server error', { status: 500 })
      })
    );

    renderWorks();

    await screen.findByText(/internal server error/i);

  });

  it('should render the works', async () => {
    server.use(
      http.get('/work/api/list/', () => {
        return HttpResponse.json(workList, { status: 200 })
      })
    );

    renderWorks();

    await screen.findByText(/work title 1/i);
    await screen.findByText(/work title 2/i);
    await screen.findByText(/work title 3/i);

  });

  it('should navigate to new work page', () => {
    server.use(
      http.get('/work/api/list/', () => {
        return HttpResponse.json(workList, { status: 200 })
      })
    );

    renderWorks();

    const newWork = screen.getByText(/new work/i);
    fireEvent.click(newWork);
    expect(window.location.href).toContain('/admin/dashboard/works/new');
  
  });

  it('should return to dashboard', () => {
    server.use(
      http.get('/work/api/list/', () => {
        return HttpResponse.json(workList, { status: 200 })
      })
    );

    renderWorks();

    const backButton = screen.getByText(/</i);
    fireEvent.click(backButton);
    expect(window.location.href).toContain('/admin/dashboard');

  });
})