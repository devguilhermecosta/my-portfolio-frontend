import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import NewWork from '..';

describe('<NewWork >', () => {
  it('should render a new work form', async () => {
    render(<NewWork />);

    await screen.findByLabelText(/title/i);
    await screen.findByLabelText(/description/i);
    await screen.findByLabelText(/link/i);
    await screen.findByLabelText(/cover/i);

  });
})