import { useState, useEffect, useContext, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api, baseUrl } from '../../../utils/api';
import { WorkProps, ImageWorkProps } from '../../../interfaces/work';
import MainContainer from '../../../components/mainContainer';
import NotFound from '../../../components/notFound';
import Input from '../../../components/input';
import TextArea from '../../../components/textarea';
import Cover from '../../../components/cover';
import Loading from '../../../components/loading';
import UploadInput from '../../../components/uploadInput';
import SubmitInput from '../../../components/submitInput';
import { AuthContext } from '../../../contexts/authContext';
import toast from 'react-hot-toast';
import BackButton from '../../../components/backButton';
import Carousel from '../../../components/carousel';
import Style from './workDetails.module.css';
import { MdDelete } from "react-icons/md";
import ImagesWorkManager from '../../../components/imagesWorkManager';

export default function WorkDetail(): JSX.Element {
  const [work, setWork] = useState<WorkProps>();
  const [imagesWork, setImagesWork] = useState<ImageWorkProps[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const { slug } = useParams();
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [cover, setCover] = useState<File | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  const [titleControl, setTitleControl] = useState('');

  const [errorTitle, setErrorTitle] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [errorLink, setErrorLink] = useState('');

  useEffect(() => {
    async function getWork(slug: string | undefined): Promise<void> {
      await api.get(`${baseUrl}/work/api/${slug}/`)
      .then((response) => {
        setWork(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setLink(response.data?.link);
        getImagesWork(response.data?.id)
      })
      .catch(() => setWork(undefined))
      .finally(() => setLoading(false))
    }

    getWork(slug);

  }, [slug])

  async function getImagesWork(workId: number) {
    await api.get(`work/api/images/${workId}/list/`)
    .then(r => setImagesWork(r.data))
  }

  function handleCover(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const image = e.target.files;

    if (image) {
      setCover(image[0]);
      setCoverUrl(URL.createObjectURL(image[0]));
    }
  }

  if (loading) {
    return (
      <MainContainer>
        <Loading />
      </MainContainer>
    )
  }

  function cleanErrorFields(): void {
    setErrorTitle('');
    setErrorDescription('');
    setErrorLink('');
  }

  function addFieldToFormData(
    formData: FormData, 
    key: string, 
    newValue: string, 
    originalValue?: string): void {
      if (originalValue !== newValue) formData.append(key, newValue);
  }

  async function handleSubmit(e: FormEvent<Element>): Promise<void> {
    e.preventDefault();
    
    setSaving(true);

    const config = {
      headers: {
        'Content-Type': 'muiltipart/form-data',
        'Authorization': `Bearer ${user}`,
      }
    }

    const formData = new FormData();
    if (title !== titleControl) addFieldToFormData(formData, 'title', title, work?.title);
    addFieldToFormData(formData, 'description', description, work?.description);
    addFieldToFormData(formData, 'link', link, work?.link)
    if (cover) formData.append('cover', cover);

    await api.patch(`${baseUrl}/work/api/${slug}/`, formData, config)
    .then((r) => {
      const msg = `save successfully with status code ${r.status}`;
      console.log(msg);
      toast.success(msg, { duration: 4000 });
      cleanErrorFields();
      setTitleControl(title);
    })
    .catch((e) => {
      setErrorTitle(e.response.data?.title);
      setErrorDescription(e.response.data?.description);
      setErrorLink(e.response.data?.link ? e.response.data?.link[0] : '');
      const msg = `error on save with status ${e.response.status}`
      console.error(msg);
      toast.error(msg, { duration: 4000 });
    })
    .finally(() => setSaving(false))
  }

  async function handleImageDelete(imageId: number) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user}`
      }
    }

    await api.delete(`work/api/image/${imageId}/`, config)
    .then(() => {
      setImagesWork(imagesWork.filter(image => image.id !== imageId));
      toast.success('image deleted successfully');
    })
    .catch(() => toast.error('error on image delete'))
  }

  return (
    <MainContainer>

      <BackButton onClick={() => navigate('/admin/dashboard/works', { replace: true })}/>

      {saving && <Loading />}

    {work 
    ? <>
        <form
        encType='multipart/form-data'
          style={{ width: '100%', maxWidth: '840px' }}
        >
          <Input 
            labelName='title' 
            value={title}
            error={errorTitle}
            onChange={e => setTitle(e.target.value)}
          />

          <TextArea
            label='description'
            value={description}
            error={errorDescription}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Input 
            labelName='link' 
            value={link}
            error={errorLink}
            onChange={e => setLink(e.target.value)}
          />

          {work?.cover && (
            <div style={{
              position: 'relative',
              width: 'fit-content',
              margin: '0 auto',
            }}>
              <UploadInput 
                position='absolute' 
                top='50%' left='50%' 
                transform='translate(-50%, -50%)'
                multiple={false}
                onChange={(e) => {handleCover(e)}}
              />

              {coverUrl 
              ? <Cover coverUrl={coverUrl} alt={`image of ${cover?.name}`}/>
              : <Cover coverUrl={`${baseUrl}${work.cover}`} alt={`image of ${title}`}/>
              }
              
            </div>
          )}

          <Carousel style={{ marginTop: '20px' }}>
            {imagesWork && imagesWork.map(image => (
              <div key={image.id} className={Style.C_work_image}>
                <MdDelete 
                  size={28}
                  color='var(--secondaire-g1)'
                  style={{ 
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    backgroundColor: 'rgba(0, 0, 0, 70%)',
                    borderRadius: '50%',
                    padding: '3px',
                    cursor: 'pointer',
                   }}
                  onClick={() => handleImageDelete(image?.id)}
                />
                <img src={`${baseUrl}${image.url}`} alt='work image' />
              </div>
            ))}
          </Carousel>

          <ImagesWorkManager 
            testId='imagesManager'
            user={user}
            workId={work?.id}
            callbackFn={() => getImagesWork(work?.id)}
          />

          <SubmitInput onClick={(e) => handleSubmit(e)}/>

        </form>
      </>
    : <NotFound />
    }
  </MainContainer>
  )
}

