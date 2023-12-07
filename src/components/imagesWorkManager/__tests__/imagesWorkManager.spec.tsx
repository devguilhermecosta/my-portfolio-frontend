// TODO create all tests
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ImagesWorkManager from '..';

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

  it('should render upload button only when some image is uploaded', () => {


  });
})