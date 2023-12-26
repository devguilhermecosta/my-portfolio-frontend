import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NotFound from '..';

describe('<NotFound >', () => {
  it('should render page not found', () => {
    render(<NotFound />);
    const text = screen.getByText(/page not found/i);
    expect(text).toBeInTheDocument();
  })
})