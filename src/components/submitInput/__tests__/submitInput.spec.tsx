import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SubmitInput from '..';
import userEvent from '@testing-library/user-event';

describe('<SubmitInput />', () => {
  it('should have the correct input value', async () => {
    render(<SubmitInput value='input value test'/>);
    expect(await screen.findByDisplayValue('input value test'));
  });

  it('should call the onClick event when is clicked', async () => {
    const user = userEvent.setup();

    render(<SubmitInput onClick={() => console.log('test')} value='input value test'/>);
    const input = screen.getByDisplayValue('input value test');

    const event = vi.spyOn(console, 'log');
    await user.click(input);

    expect(event).toHaveBeenCalledWith('test');
  });
})