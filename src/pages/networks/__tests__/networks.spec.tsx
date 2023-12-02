import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Networks from '..';

describe('<Networks />', () => {
  it('should render the networks', async () => {
    render(<Networks />);
  
    await screen.findByText('guilherme@email.com');
    await screen.findByText('https://github.com');
    await screen.findByText('https://instagram.com');
    await screen.findByText('https://linkedin.com');
    await screen.findByText('46999083251');
    await screen.findByText('https://whatsapp.com');

  })
})