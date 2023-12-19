import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Cover from '..';
import { BrowserRouter } from 'react-router-dom';

describe('<Cover />', () => {
  it('should to be in the document', () => {
    render(
    <BrowserRouter>
      <Cover coverUrl='/' alt='my image'/>
    </BrowserRouter>
    )
    const cover = screen.getByAltText(/my image/i);
    expect(cover).toBeInTheDocument();
  })
})