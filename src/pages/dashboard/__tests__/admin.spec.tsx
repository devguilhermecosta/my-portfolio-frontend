import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../contexts/authContext';
import Dashboard from '..';

const renderDashboard = () => {
  return render(
    <AuthProvider>
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    </AuthProvider>
  );
}

describe('<Dashboard />', () => {
  it('should render the correct content', async () => {
    renderDashboard();

    await screen.findByText(/administration area/i);
    await screen.findByText(/logout/i);
    await screen.findByText(/networks/i);
    await screen.findByText(/^works$/i);
    await screen.findByText(/show the site/i);

  });

  it('should delete the user token on press the logout button', async () => {
    renderDashboard();

    const logoutButton = screen.getByText(/logout/i);

    fireEvent.click(logoutButton);

    /**
     * the user must be redirected to login page
     */
    await waitFor(() => expect(window.location.href).toContain('/admin/login'));

    /**
     * this means the user token has been removed, 
     * otherwise the user would be redirected to /admin/dashboard
     */
    await waitFor(() => expect(window.location.href).not.toContain('/admin/dashboard'));
  });

  it('should navigate the user to networks page', async () => {
    renderDashboard();

    const logoutButton = screen.getByText(/^networks$/i);

    fireEvent.click(logoutButton);

    await waitFor(() => expect(window.location.href).toContain('/admin/dashboard/networks'));
  });

  it('should navigate to works page', async () => {
    renderDashboard();

    const logoutButton = screen.getByText(/^works$/i);

    fireEvent.click(logoutButton);

    await waitFor(() => expect(window.location.href).toContain('/admin/dashboard/works'));
  });

  it('should navigate to home page', async () => {
    renderDashboard();

    const logoutButton = screen.getByText(/^show the site$/i);

    fireEvent.click(logoutButton);

    await waitFor(() => expect(window.location.href).toContain('/'));
  });
})
