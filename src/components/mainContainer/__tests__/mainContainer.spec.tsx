import { describe, expect } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainContainer from '..';

describe('<MainContainer />', () => {
  function mockElement(): JSX.Element {
    return (
      <div></div>
    )
  }

  it('should render the main element', () => {
    const children = mockElement();
    const main = render(<MainContainer>{children}</MainContainer>);
    const mainElement = main.container.querySelector('#container');
    expect(mainElement).toBeDefined();
  });

  it('should have the style', () => {
    const children = mockElement();
    const main = render(<MainContainer>{children}</MainContainer>);
    const mainElement = main.container.querySelector('#container');
    expect(mainElement).toHaveStyle({
      backgroundColor: '#040C0C',
      padding: '50px 10px',
      minHeight: '100vh',
      display: 'flex',
    })
  });
});