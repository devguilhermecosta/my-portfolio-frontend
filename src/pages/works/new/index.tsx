import MainContainer from "../../../components/mainContainer";
import Input from "../../../components/input";
import TextArea from "../../../components/textarea";
import Cover from "../../../components/cover";
import { ChangeEvent, FormEvent, useState, useContext } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import SubmitInput from "../../../components/submitInput";
import Style from './newWork.module.css';
import { api } from "../../../utils/api";
import { AuthContext } from "../../../contexts/authContext";
import Loading from "../../../components/loading";
import toast from "react-hot-toast";
import BackButton from "../../../components/backButton";
import { useNavigate } from "react-router-dom";
import ImagesWorkManager from "../../../components/imagesWorkManager";
import InputCheckbox from "../../../components/inputCheckbox";

interface ErrorProps {
  title?: string;
  description?: string;
  link?: string;
  cover?: string;
}

export default function NewWork(): JSX.Element {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [cover, setCover] = useState<File | null>();
  const [coverUrl, setCoverUrl] = useState<string | undefined>('');
  const [isPublished, setIsPublished] = useState<boolean>(true);
  const [showInHome, setShowInHome] = useState<boolean>(false);

  const [titleError, setTitleError] = useState<string | undefined>('');
  const [linkError, setLinkError] = useState<string | undefined>('');
  const [coverError, setCoverError] = useState<string | undefined>();
  const [descriptionError, setDescriptionError] = useState<string | undefined>();

  const [workId, setWorkId] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const borderError = '2px solid red';

  function handleFileOnChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const file = e.target.files;
    
    if (file) {
      const url = URL.createObjectURL(file[0]);
      setCover(file[0]);
      setCoverUrl(url);
      e.target.value = '';
    }
  }

  function cleanFields(): void {
      setTitle('');
      setDescription('');
      setLink('');
      setCover(null);
      setCoverUrl('');
      setWorkId(undefined);
  }

  function cleanErrorFields(): void {
    setTitleError('');
    setDescriptionError('');
    setLinkError('');
    setCoverError('');
    setIsPublished(true);
    setShowInHome(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {

    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${user}`,
      }
    }

    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      link: formData.get('link'),
      cover: cover,
      is_published: formData.get('is_published'),
      show_in_home: formData.get('show_in_home'),
    }

    await api.post('/work/api/create/', data, config)
    .then((response) => {
      cleanErrorFields();
      setWorkId(response.data.id);
      toast.success('work created successfully', { duration: 4000 });
    })
    .catch(e => {
      const error = e.response.data as ErrorProps;
      setTitleError(error?.title);
      setDescriptionError(error?.description);
      setCoverError(error?.cover);
      setLinkError(error?.link);
      toast.error('check errors on fields', { duration: 4000 });
    })
    .finally(() => setLoading(false))
  }

  return (
    <MainContainer>

      {loading && (<Loading />)}

      <BackButton onClick={() => navigate('/admin/dashboard/works')}/>
  
      <h1 className={Style.C_Work_title}>New Work</h1>

      <form className={Style.C_work_form} encType="multipart/form-data" onSubmit={handleSubmit}>

        <Input 
          labelName="title" 
          value={title} 
          onChange={(e) => {setTitle(e.target.value)}} 
          error={titleError}
        />

        <TextArea 
          label="description"
          value={description}
          error={descriptionError}
          onChange={(e) => setDescription(e.target.value)}
        />
  
        <Input 
          labelName="link" 
          value={link} onChange={(e) => {setLink(e.target.value)}} 
          error={linkError}
        />

        <div style={{ maxWidth: 'fit-content' }}>
          <InputCheckbox
            name='is_published'
            value={isPublished}
            displayLabelValue='publicado'
            onClick={() => setIsPublished(isPublished ? false : true)}
          />

          <InputCheckbox
            name='show_in_home'
            value={showInHome}
            displayLabelValue='está na home'
            onClick={() => setShowInHome(showInHome ? false : true)}
          />
        </div>

        <label htmlFor="cover">cover</label>
        <div className={Style.C_work_c_cover}>
          <AiOutlineUpload 
            id="strokeCover" 
            size={100} 
            style={{
              color: coverError ? 'red' : 'white',
              border: coverError ? borderError : '2px solid var(--secondaire-std)',
              borderRadius: '8px',
              display: 'block',
            }}
          />
          <input
            type="file" 
            name="cover"
            id="cover"
            accept="image/*"
            className={Style.custom_input_file}
            onChange={(e) => handleFileOnChange(e)}
          />
        </div>
        
        { cover && (
          <Cover coverUrl={coverUrl} alt='workcover'/>
        )}

        <SubmitInput />
        
      </form>

      {workId && (
          <ImagesWorkManager user={user} workId={workId} callbackFn={() => cleanFields()}/>
      )}

    </MainContainer>
  )
}