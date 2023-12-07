import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import NewWork from '..';
import userEvent from '@testing-library/user-event';
import { server } from '../../../../utils/mocks/node';
import { http, HttpResponse } from 'msw';
import { baseUrl } from '../../../../utils/api';
import { act } from 'react-dom/test-utils';

global.URL.createObjectURL = vi.fn();

const handerNewWorkForm = () => {
  return render(
    <BrowserRouter>
      <NewWork />
    </BrowserRouter>
  );
}

describe('<NewWork >', () => {
  it('should render a new work form', async () => {
    handerNewWorkForm();

    await screen.findByText('<');
    await screen.findByLabelText(/title/i);
    await screen.findByLabelText(/description/i);
    await screen.findByLabelText(/link/i);
    await screen.findByLabelText(/cover/i);
    await screen.findByText(/save/i);

  });

  it('should render the inputs with border red when error on post request', async () => {
    server.use(http.post(`${baseUrl}/work/api/create/`, () => {
      return HttpResponse.json({
        title: 'Campo obrigatório',
        description: 'Campo obrigatório',
        cover: 'Envie somente imagens',
      }, { status: 400 })
    }))

    const user = userEvent.setup();

    const page = handerNewWorkForm();

    const borderStyle = '2px solid red';
    const submitButton = screen.getByText(/save/i);
    await user.click(submitButton);

    expect(await screen.findByLabelText(/title/i)).toHaveStyle({ border: borderStyle });
    expect(await screen.findByLabelText(/description/i)).toHaveStyle({ border: borderStyle });
    expect(page.container.querySelector('#strokeCover')).toHaveStyle({ border: borderStyle });

  });

  it('should not load the work image manager if an error occurs in the work creation request', async () => {
    server.use(http.post(`${baseUrl}/work/api/create/`, async () => {
      return HttpResponse.json({
        title: 'Campo obrigatório',
        link: 'Campo obrigatório',
        description: 'Campo obrigatório',
        cover: 'Campo obrigatório',
      }, { status: 400 })
    }))

    const user = userEvent.setup();

    handerNewWorkForm();

    const submitButton = screen.getByText(/save/i);
    await user.click(submitButton);

    const imagesManager = screen.queryByText(/now, add some images/i);

    expect(imagesManager).not.toBeInTheDocument();

  });

  it('should render the work images manager if the work is created', async () => {
    server.use(http.post(`${baseUrl}/work/api/create/`, async () => {
      return HttpResponse.json({
        id: 1,
        title: 'work title',
        link: 'https://link.com',
        description: 'work description',
      }, { status: 201 })
    }))

    const user = userEvent.setup();

    handerNewWorkForm();

    const submitButton = screen.getByText(/save/i);
    await user.click(submitButton);

    expect(await screen.findByText(/now, add some images/i));

  });

  it('should clean the work form if the work images are created', async () => {
    /* work data to mock all inputs */
    const workData = {
      title: 'work title',
      link: 'https://link.com',
      description: 'work description',
    };

    /* mock the requests */
    server.use(
      http.post(`${baseUrl}/work/api/create/`, async () => {
      return HttpResponse.json({
        id: 1,
        title: 'work title',
        link: 'https://link.com',
        description: 'work description',
        }, { status: 201 })
      }),
      http.post(`${baseUrl}/work/api/images/create/`, () => {
        return new HttpResponse(null, { status: 201 })
      })
    
    )

    /* call userEvent */
    const user = userEvent.setup();

    /* render the new work form */
    handerNewWorkForm();

    /**
     * mocks the input data.
     * this is not necessary but I want to test the inputs before form submission
     */
    const titleInput = screen.getByLabelText(/title/i);
    const linkUnput = screen.getByLabelText(/link/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    await user.type(titleInput, workData.title);
    await user.type(linkUnput, workData.link);
    await user.type(descriptionInput, workData.description);

    expect(titleInput).toHaveDisplayValue(workData.title);
    expect(linkUnput).toHaveDisplayValue(workData.link);
    expect(descriptionInput).toHaveDisplayValue(workData.description);

    /**
     * mocks sending the form to register the work.
     * after the work is saved, the form to upload all images is open 
     */
    const submitButton = screen.getByText(/save/i);
    await user.click(submitButton);

    /**
     * mocks image upload
     */
    const inputUpload = await screen.findByTestId(/upload_images/i);
    const images = [
      new File(['hello'], 'hello.png', {type: 'image/png'}),
      new File(['there'], 'there.png', {type: 'image/png'}),
    ];
    user.upload(inputUpload, images)

    /* this button only appears when images are uploaded */
    const buttonUpload = await screen.findByDisplayValue(/upload all images/i);

    /* click on button */
    await act( () => userEvent.click(buttonUpload))
    
    /**
     * when the work images are created;
     * all inputs data must be cleaned.
    */
    expect(await screen.findByLabelText(/title/i)).toHaveDisplayValue('');
    expect(await screen.findByLabelText(/link/i)).toHaveDisplayValue('');
    expect(await screen.findByLabelText(/description/i)).toHaveDisplayValue('');

  });
})