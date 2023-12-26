import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, vi } from 'vitest';
import TextArea from '..';
import { BrowserRouter } from 'react-router-dom';

const mockFn = vi.fn()

const renderTextarea = (error?: string) => {
  return render(
    <BrowserRouter>
      <TextArea label='test' onChange={() => mockFn()} error={error}/>
    </BrowserRouter>
  )
}

describe('<TextArea>', () => {
  it('should render the element', () => {
    renderTextarea();
    const element = screen.getByLabelText(/test/);
    expect(element).toBeInTheDocument();
  });

  it('should call the onChange event', async () => {
    const user = userEvent.setup();
    renderTextarea();

    const element = screen.getByLabelText(/test/);
    await user.type(element, 'foo bar');

    expect(mockFn).toHaveBeenCalled();
  });

  it('should have border red when error', async () => {
    renderTextarea('error message');

    const element = screen.getByLabelText(/test/);

    expect(element).toHaveStyle({
      border: '2px solid red'
    });
  });

  it('should not have border red without error', async () => {
    renderTextarea();

    const element = screen.getByLabelText(/test/);

    expect(element).not.toHaveStyle({
      border: '2px solid red'
    });
  });
})