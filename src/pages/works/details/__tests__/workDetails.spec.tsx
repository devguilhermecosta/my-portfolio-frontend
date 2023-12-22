import '@testing-library/jest-dom';
import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { server } from '../../../../utils/mocks/node';
import { http, HttpResponse } from 'msw';
import { BrowserRouter } from 'react-router-dom';
import { baseUrl } from '../../../../utils/api';
import WorkDetail from '..';
import { imagesWorkList } from '../../../../utils/mocks/imagesWorkList';

const globalURL = global.URL.createObjectURL = vi.fn();

const renderWorkDetail = () => {
  return render(
    <BrowserRouter>
      <WorkDetail />
    </BrowserRouter>
  )
}

describe('<WorkDetail />', () => {
  it('should return page not found if work not found', async () => {
    server.use(
      http.get(`${baseUrl}/work/api/:slug/`, () => {
        return new HttpResponse(null, { status: 404 })
      })
    )

    renderWorkDetail();

    await screen.findByText('page not found');
  });

  it('should render the work data', async () => {
    renderWorkDetail();

    await screen.findByDisplayValue('work title');
    await screen.findByDisplayValue('work description');
    await screen.findByDisplayValue('https://my-work.com');
    await screen.findByAltText(/image of work title/i);
  });

  it('should navigate to works page on button click', async () => {
    const user = userEvent.setup();
    renderWorkDetail();

    const backButton = await screen.findByTestId('backButton');
    await user.click(backButton);

    expect(window.location.href).toContain('admin/dashboard/works');
  });

  it('should change the field data', async () => {
    // new data to change input value
    const newData = {
      title: 'new title',
      description: 'new description',
      link: 'new link',
      coverName: 'coverTest.png',
    }

    const user = userEvent.setup();

    renderWorkDetail();

    // get all fields
    const title = await screen.findByDisplayValue('work title');
    const description = await screen.findByDisplayValue('work description');
    const link = await screen.findByDisplayValue('https://my-work.com');
    await screen.findByAltText(/image of work title/i);  // cover

    // clear all fields, except the cover
    user.clear(title);
    user.clear(description);
    user.clear(link);

    // type new field value
    await userEvent.type(title, newData.title);
    await userEvent.type(description, newData.description);
    await userEvent.type(link, newData.link);

    // mock the new cover
    const inputUploadCover: HTMLInputElement = await screen.findByTestId('upload_images');
    const newCover = new File(['text'], newData.coverName, { type: 'image/png' });
    await userEvent.upload(inputUploadCover, newCover);

    // checks if the new data is ok
    expect(screen.getByDisplayValue(newData.title));
    expect(screen.getByDisplayValue(newData.description));
    expect(screen.getByDisplayValue(newData.link));
    if (inputUploadCover.files) expect(inputUploadCover.files[0].name).toContain(newData.coverName);

    // checks if the cover url has been created
    expect(globalURL).toHaveBeenCalledTimes(1);

  });

  it('should return status code 400', async () => {
    // intercept the request
    server.use(
      http.patch(`${baseUrl}/work/api/:slug/`, () => {
        return new HttpResponse(null, { status: 400 })
      })
    )

    const user = userEvent.setup();

    renderWorkDetail();

    const submitInput = await screen.findByDisplayValue(/save/);
    const spy = vi.spyOn(console, 'error');
    await user.click(submitInput);

    expect(spy).toHaveBeenCalledWith('error on save with status 400');
  });

  it('should change the inputs to red when status code 400', async () => {
    // intercept the request
    server.use(
      http.patch(`${baseUrl}/work/api/:slug/`, () => {
        return HttpResponse.json({
          link: 'Formato incorreto',
          title: 'Campo obrigatório',
          description: 'Campo obrigatório',
        }, { status: 400 })
      })
    )

    const user = userEvent.setup();
    const borderError = '2px solid red';
    renderWorkDetail();

    const title = await screen.findByLabelText(/title/i);
    const description = await screen.findByLabelText(/description/i);
    const link = await screen.findByLabelText(/link/i);

    // clear all fields, except the cover
    user.clear(title);
    user.clear(description);
    user.clear(link);

    // set the link with an invalid url
    user.type(link, 'test');

    const submitInput = await screen.findByDisplayValue(/save/);
    await user.click(submitInput);

    expect(title).toHaveStyle({ border: borderError });
    expect(description).toHaveStyle({ border: borderError });
    expect(link).toHaveStyle({ border: borderError });
  });

  it('should return status code 204', async () => {
    // intercept the request
    server.use(
      http.patch(`${baseUrl}/work/api/:slug/`, () => {
        return new HttpResponse(null, { status: 204 })
      })
    )

    const user = userEvent.setup();
    renderWorkDetail();

    const submitInput = await screen.findByDisplayValue(/save/);
    const spy = vi.spyOn(console, 'log');

    await user.click(submitInput);

    expect(spy).toHaveBeenCalledWith('save successfully with status code 204');
  });

  it('should show the changed value after patch request', async () => {
    // intercept the request
    server.use(
      http.patch(`${baseUrl}/work/api/:slug/`, () => {
        return new HttpResponse(null, { status: 204 })
      })
    )

    // new data to change input value
    const newData = {
      title: 'new title',
      description: 'new description',
      link: 'new link',
      coverName: 'new cover',
    }

    const user = userEvent.setup();
    renderWorkDetail();

    // get all fields
    const title = await screen.findByDisplayValue('work title');
    const description = await screen.findByDisplayValue('work description');
    const link = await screen.findByDisplayValue('https://my-work.com');
    await screen.findByAltText(/image of work title/i);  // cover

    // clear all fields, except the cover
    user.clear(title);
    user.clear(description);
    user.clear(link);

    // type new field value
    await userEvent.type(title, newData.title);
    await userEvent.type(description, newData.description);
    await userEvent.type(link, newData.link);

    // mock the new cover
    const inputUploadCover: HTMLInputElement = await screen.findByTestId('upload_images');
    const newCover = new File(['text'], newData.coverName, { type: 'image/png' });
    await userEvent.upload(inputUploadCover, newCover);

    const submitInput = await screen.findByDisplayValue(/save/);

    await user.click(submitInput);

    expect(await screen.findByDisplayValue(newData.title));
    expect(await screen.findByDisplayValue(newData.description));
    expect(await screen.findByDisplayValue(newData.link));
    expect(await screen.findByAltText(`image of ${newData.title}`));
  });

  it('should loads images work', async () => {
    // intercept the request
    server.use(
      http.get(`${baseUrl}/work/api/images/:id/list/`, () => {
        return HttpResponse.json(imagesWorkList, { status: 200 })
      })
    )

    // render the component
    renderWorkDetail();

    await screen.findByAltText('image 1 of work work title');
    await screen.findByAltText('image 2 of work work title');
  })

  it('should delete the images work', async () => {
    // intercept the request
    server.use(
      http.get(`${baseUrl}/work/api/images/:id/list/`, () => {
        return HttpResponse.json(imagesWorkList, { status: 200 })
      }),
      http.delete(`${baseUrl}/work/api/image/:id/`, () => {
        return new HttpResponse(null, { status: 204 })
      })
    )

    // create an user event
    const user = userEvent.setup();

    // render the component
    renderWorkDetail();

    const spy = vi.spyOn(console, 'log');

    await screen.findByAltText('image 1 of work work title');

    const btnDeleteImg01 = await screen.findByTestId('btn-delete-of-img-1');
    await user.click(btnDeleteImg01);

    expect(spy).toHaveBeenCalledWith('image deleted successfully');
  })

  it('should return error on delete the images work', async () => {
    // intercept the request
    server.use(
      http.get(`${baseUrl}/work/api/images/:id/list/`, () => {
        return HttpResponse.json(imagesWorkList, { status: 200 })
      }),
      http.delete(`${baseUrl}/work/api/image/:id/`, () => {
        return new HttpResponse(null, { status: 400 })
      })
    )

    // create an user event
    const user = userEvent.setup();

    // render the component
    renderWorkDetail();

    const spy = vi.spyOn(console, 'error');

    await screen.findByAltText('image 1 of work work title');

    const btnDeleteImg01 = await screen.findByTestId('btn-delete-of-img-1');
    await user.click(btnDeleteImg01);

    expect(spy).toHaveBeenCalledWith('error on delete the image');
  })
})