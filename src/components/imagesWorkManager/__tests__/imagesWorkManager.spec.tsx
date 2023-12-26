import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ImagesWorkManager from '..';
import userEvent from '@testing-library/user-event';
import { server } from '../../../utils/mocks/node';
import { http, HttpResponse } from 'msw';
import { baseUrl } from '../../../utils/api';

global.URL.createObjectURL = vi.fn();

const handerImagesWorkManager = (workId: number, user: string | null) => {
  return render(
    <ImagesWorkManager workId={workId} user={user}/>
  )
}

describe('<ImagesWorkManager />', () => {
  it('should have the correct content', () => {
    handerImagesWorkManager(1, 'user');

    expect(screen.getByText(/now, add some images/)).toBeInTheDocument(); // title
    expect(screen.getByTestId(/upload_images/)).toBeInTheDocument(); // input:file
    expect(screen.getByTestId(/close_button/)).toBeInTheDocument(); // close button
  });

  it('should not render the upload button if at least one image is uploaded', () => {
    handerImagesWorkManager(1, 'user');
    const button = screen.queryByDisplayValue(/upload all images/i);
    expect(button).not.toBeInTheDocument();
  });

  it('should render upload button only when some image is uploaded', async () => {
    const user = userEvent.setup();
    
    handerImagesWorkManager(1, 'user');

    const images = [
      new File(['text'], 'image-test.png', { type: 'image/png' }),
      new File(['text'], 'image-test-2.png', { type: 'image/png' })
    ];
    const inputUpload = screen.getByTestId(/upload_images/i);

    await user.upload(inputUpload, images);

    expect(screen.queryByDisplayValue(/upload all images/i)).toBeInTheDocument();
  });

  it('should remove the image from list of images', async () => {
    const user = userEvent.setup();
    
    handerImagesWorkManager(1, 'user');

    // mock the images
    const images = [
      new File(['text'], 'image-test.png', { type: 'image/png' }),
      new File(['text'], 'image-test-2.png', { type: 'image/png' }),
    ];
    const inputUpload: HTMLInputElement = screen.getByTestId(/upload_images/i);
    await user.upload(inputUpload, images);

    // spy
    const buttonDelete = screen.getAllByTestId(/image-delete/i);
    const spy = vi.spyOn(console, 'log');
    await user.click(buttonDelete[0]);

    expect(spy).toHaveBeenCalledWith("image deleted successfully: image-test.png");
  });

  it('should returns error on create images', async () => {
    // mock the response
    server.use(
      http.post(`${baseUrl}/work/api/images/create/`, () => {
        return new HttpResponse(null, { status: 400 })
      }),
    )

    const user = userEvent.setup();
    
    handerImagesWorkManager(1, 'user');

    // mock the images
    const images = [
      new File(['text'], 'image-test.png', { type: 'image/png' }),
    ];
    const inputUpload: HTMLInputElement = screen.getByTestId(/upload_images/i);
    await user.upload(inputUpload, images);

    // spy
    const spy = vi.spyOn(console, 'error');
    const submitButton = await screen.findByDisplayValue(/upload all images/i);
    await user.click(submitButton);

    expect(spy).toHaveBeenCalledWith("error on upload images with status code 400");
  });

  it('should returns success on create images', async () => {
    // mock the response
    server.use(
      http.post(`${baseUrl}/work/api/images/create/`, () => {
        return new HttpResponse(null, { status: 201 })
      }),
    )

    const user = userEvent.setup();
    
    handerImagesWorkManager(1, 'user');

    // mock the images
    const images = [
      new File(['text'], 'image-test.png', { type: 'image/png' }),
    ];
    const inputUpload: HTMLInputElement = screen.getByTestId(/upload_images/i);
    await user.upload(inputUpload, images);

    // spy
    const spy = vi.spyOn(console, 'log');
    const submitButton = await screen.findByDisplayValue(/upload all images/i);
    await user.click(submitButton);

    expect(spy).toHaveBeenCalledWith("created successfully with status code 201");
  });
})