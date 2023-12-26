import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import UploadInput from '..';

describe('<UploadInput />', () => {
  it('should is not allowed upload multiple files', async() => {
    // mock user event
    const user = userEvent.setup();

    // render input:file with multiple property with false
    render(<UploadInput onChange={() => {}} multiple={false}/>);

    // mock files
    const files = [
      new File(['test'], 'image-test.png', { type: 'image/png' }),
      new File(['test'], 'image-test2.png', { type: 'image/png' }),
      new File(['test'], 'image-test2.png', { type: 'image/png' }),
    ];
    const input: HTMLInputElement = screen.getByTestId('upload_images');

    // tries upload mult files
    await user.upload(input, files);

    // but only one file is uploaded
    expect(input.files).toHaveLength(1);
  });

  it('should is allowed upload multiple files', async() => {
    // mock user event
    const user = userEvent.setup();

    // render input:file with multiple property with true
    render(<UploadInput onChange={() => {}} multiple={true}/>);

    // mock files
    const files = [
      new File(['test'], 'image-test.png', { type: 'image/png' }),
      new File(['test'], 'image-test2.png', { type: 'image/png' }),
      new File(['test'], 'image-test2.png', { type: 'image/png' }),
    ];
    const input: HTMLInputElement = screen.getByTestId('upload_images');

    // tries upload mult files
    await user.upload(input, files);

    // three files were uploaded
    expect(input.files).toHaveLength(3);
  });

  it('should call the onChange event', async() => {
    // mock user event
    const user = userEvent.setup();

    // render input:file with an event
    render(<UploadInput onChange={() => console.log('image uploaded')} multiple={true}/>);
    
    // spy the console
    const event = vi.spyOn(console, 'log')

    // mock files
    const file = new File(['test'], 'image-test.png', { type: 'image/png' });
    const input: HTMLInputElement = screen.getByTestId('upload_images');
    await user.upload(input, file);

    expect(event).toHaveBeenCalledWith('image uploaded');
  });
})