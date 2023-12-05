import MainContainer from "../../../components/mainContainer";
import Input from "../../../components/input";
import { ChangeEvent, FormEvent, useState, useContext } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import SubmitInput from "../../../components/submitInput";
import Style from './newWork.module.css';
import { api } from "../../../utils/api";
import { AuthContext } from "../../../contexts/authContext";
import toast from "react-hot-toast";

export default function NewWork(): JSX.Element {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [cover, setCover] = useState<string | undefined>();
  const { user } = useContext(AuthContext);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    
    const file = event.currentTarget.files;
    
    if (file) {
      const url = URL.createObjectURL(file[0]);
      setCover(url);
    }

  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {

  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user}`,
    },
  }

  const data = {
    title: formData.get('title'),
    description: formData.get('description'),
    link: formData.get('link'),
    cover: formData.get('cover'),
  }


  await api.post('/work/api/create/', data, config)
  .then(() => toast.success('work created successfully'))
  .catch((e) => toast.error(e))

  }

  return (
    <MainContainer>
      <h1 className={Style.C_Work_title}>New Work</h1>
      <form className={Style.C_work_form} encType="multipart/form-data" onSubmit={handleSubmit}>

        <Input labelName="title" value={title} onChange={(e) => {setTitle(e.target.value)}}/>
  
        <div className={Style.C_work_c_textarea}>
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
          />
        </div>
  
        <Input labelName="link" value={link} onChange={(e) => {setLink(e.target.value)}} />

        <div className={Style.C_work_c_cover}>
          <AiOutlineUpload size={100} style={{
            border: '1px solid var(--secondaire-std)',
            borderRadius: '8px',
            display: 'block',
          }}/>
          <input
            type="file" 
            name="cover"
            accept="image/*"
            className={Style.custom_input_file}
            onChange={(e) => handleFileChange(e)}
          />
        </div>
        
        {cover && (
          <img src={cover} alt="coverimage" className={Style.Image_preview}/>
        )}

        <SubmitInput />
        
      </form>

    </MainContainer>
  )
}