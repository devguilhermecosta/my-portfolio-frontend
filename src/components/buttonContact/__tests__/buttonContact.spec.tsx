import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ButtonContact from '..';
import { BrowserRouter } from 'react-router-dom';

const renderButton = () => {
  return render(
    <BrowserRouter>
      <ButtonContact 
        image='/path'
        text='buttonText'
        backgroundColor='red'
        color='white'
        href='/'
        testId='buttonTestId'
      />
    </BrowserRouter>
  )
}

describe('<ButtonContact />', () => {
  it('should have the correct text', () => {
    renderButton();
    const button = screen.getByText('buttonText');
    expect(button).toBeInTheDocument();
  });

  it('should have the correct style', () => {
    renderButton();
    const button = screen.getByTestId('buttonTestId');
    expect(button).toHaveStyle({
      backgroundColor: 'red',
      color: 'white',
    })
  });

  it('should show the image', () => {
    renderButton();
    const buttonImg = screen.getByAltText('logo of buttonText');
    expect(buttonImg).toBeInTheDocument();
  });
});