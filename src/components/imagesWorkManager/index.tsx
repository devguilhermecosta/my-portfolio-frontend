import Style from './imagesWorkManager.module.css';
import SubmitInput from '../submitInput';
import UploadInput from '../uploadInput';
import { ChangeEvent, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { IoCloseCircleSharp } from "react-icons/io5";

interface ImageProps {
  image: File;
  url: string;
}

export default function ImagesWorkManager({ workId }: { workId: number }): JSX.Element {
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

  function handleDelete(url: string): void {
    setImages(images.filter((image) => image.url !== url));
  }

  return (
      <section className={`${Style.C_work_images_manager} ${!visible ? Style.close_windows : ''}`}>

        <IoCloseCircleSharp 
          size={28} 
          style={{ color: 'red', position: 'absolute', top: 0, right: 0}} 
          onClick={() => setVisible(false)}
        />

        <h1>now, add some images</h1>

        <UploadInput multiple={true} onChange={(e) => handleImages(e)}/>

        <section className={Style.C_work_images_grid}>
          {images.length > 0 && images.map((image, index) => (
            <div style={{ position: 'relative' }} key={index}>
              <MdDelete 
                size={28} 
                style={{ 
                  color: 'var(--contrast-l1)', 
                  cursor: 'pointer', 
                  position: 'absolute', 
                  top: 5, right: 5
                }}
                onClick={() => handleDelete(image.url)}
              />
              <img src={image.url} alt="work image" className={Style.C_work_images_img}/>
            </div>
          ))}
        </section>

        {images.length !== 0 && (
          <SubmitInput />
        )}
      </section>
  )
}