import Style from './imagesWorkManager.module.css';
import SubmitInput from '../submitInput';
import UploadInput from '../uploadInput';
import { ChangeEvent, useState, FormEvent } from 'react';
import { MdDelete } from "react-icons/md";
import { IoCloseCircleSharp } from "react-icons/io5";
import { api, baseUrl } from '../../utils/api';
import toast from 'react-hot-toast';

interface ImagesManagerProps {
  workId: number;
  user: string | null;
  callbackFn?: () => void;
}

interface ImageProps {
  image: File;
  url: string;
}

export default function ImagesWorkManager({ workId, user, callbackFn }: ImagesManagerProps): JSX.Element {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [visible, setVisible] = useState(true);

  function handleImages(e: ChangeEvent<HTMLInputElement>) {
    const receivedImages = e.target.files;

    if (receivedImages) {
      for(let i = 0; i < receivedImages?.length; i++) {
        const file = receivedImages[i];
        const fielUrl = URL.createObjectURL(file);

        const compositeImage = {
          image: file,
          url: fielUrl,
        }

        setImages((images) => [...images, compositeImage]);
      }
    }
  }

  function handleDelete(imageDelete: ImageProps): void {
    setImages(images.filter((image) => image !== imageDelete));
    console.log(`image deleted successfully: ${imageDelete.image.name}`);
  }

  async function handleUploadImages(e: FormEvent, workId: number): Promise<void> {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${user}`
      }
    }
    
    images.forEach(async (image) => {
      const formData = new FormData();
      formData.append('work_id', JSON.stringify(workId));
      formData.append('url', image.image, image.image.name);

      await api.post(`${baseUrl}/work/api/images/create/`, formData, config)
      .then((r) => {
        toast.success('successfully created', { duration: 4000 });
        console.log(`created successfully with status code ${r.status}`);
      })
      .catch((e) => {       
        toast.error(`error on upload image: ${e}`, { duration: 4000 });
        console.error(`error on upload images with status code ${e.response.status}`);
      })
    });

    setVisible(false);

    /**
     * this must wait at least 1000ms to execute the function, 
     * otherwise the animation will not work
     */
    callbackFn ? setTimeout(() => callbackFn(), 1000) : null;
  }

  return (
      <section data-testid="C_work_imgs" className={`${Style.C_work_images_manager} ${!visible ? Style.close_windows : ''}`}>

        <IoCloseCircleSharp
          data-testid="close_button"
          size={28}
          style={{position: 'absolute', top: 0, right: 0}} 
        />

        <h1>now, add some images</h1>

        <UploadInput multiple={true} onChange={(e) => handleImages(e)}/>

        <section className={Style.C_work_images_grid}>
          {images.length > 0 && images.map((image, index) => (
            <div style={{ position: 'relative' }} key={index}>
              <MdDelete
                data-testid='image-delete' 
                size={28} 
                style={{ 
                  color: 'var(--contrast-l1)', 
                  cursor: 'pointer', 
                  position: 'absolute', 
                  top: 5, right: 5
                }}
                onClick={() => handleDelete(image)}
              />
              <img src={image.url} alt="work image" className={Style.C_work_images_img}/>
            </div>
          ))}
        </section>

        {images.length !== 0 && (
          <SubmitInput value='upload all images' onClick={(e) => handleUploadImages(e, workId)}/>
        )}
      </section>
  )
}