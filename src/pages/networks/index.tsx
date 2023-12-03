import MainContainer from "../../components/mainContainer";
import { useState, useEffect, FormEvent, useContext } from 'react';
import axios from "axios";
import Input from "../../components/input";
import { AuthContext } from "../../contexts/authContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/backButton";

export default function Networks(): JSX.Element {
  const [instagram, setInstagram] = useState<string | undefined>('');
  const [linkedin, setLinkedin] = useState<string | undefined>('');
  const [github, setGithub] = useState<string | undefined>('');
  const [whatsapp, setWhatsapp] = useState<string | undefined>('');
  const [phone, setPhone] = useState<string | undefined>('');
  const [email, setEmail] = useState<string | undefined>('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function getNetworks() {
      await axios.get('http://127.0.0.1:8000/networks/api/v1/')
      .then(response => {
        setInstagram(response.data.instagram);
        setLinkedin(response.data.linkedin);
        setGithub(response.data.github);
        setWhatsapp(response.data.whatsapp);
        setPhone(response.data.phone);
        setEmail(response.data.email);
      })
    }

    getNetworks();
  
  }, []);


  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
 
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user}`,
      },
    }

    const data = {
      instagram: formData.get('instagram'),
      linkedin: formData.get('linkedin'),
      github: formData.get('github'),
      whatsapp: formData.get('whatsapp'),
      phone: formData.get('phone'),
      email: formData.get('email')
    }

    await axios.patch('http://127.0.0.1:8000/networks/api/v1/', data, config)
    .then((response) => {
      toast.success('save successfully');
      console.log(`save successfully with status code ${response.status}`);
    })
    .catch((e) => {
      toast.error('error on save');
      console.error(`error on save: ${e}`);
    })
  }

  return (
    <MainContainer>
      <BackButton onClick={() => navigate('/admin/dashboard')}/>
      <h1>Networks</h1>
      <form action="" onSubmit={handleUpdate}>
        <Input labelName="instagram"
          value={instagram}
          onChange={(e) => {setInstagram(e.target.value)}}
        />
        <Input labelName="linkedin"
          value={linkedin}
          onChange={(e) => {setLinkedin(e.target.value)}}
        />
        <Input labelName="github"
          value={github}
          onChange={(e) => {setGithub(e.target.value)}}
        />
        <Input labelName="whatsapp"
          value={whatsapp}
          onChange={(e) => {setWhatsapp(e.target.value)}}
        />
        <Input labelName="phone"
          value={phone}
          onChange={(e) => {setPhone(e.target.value)}}
        />
        <Input labelName="email"
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
        />
        <input 
          type="submit" 
          value="save"
          style={{
            marginTop: '15px',
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: 'none',
            outline: 'none',
            backgroundColor: 'var(--contrast-std)',
            color: 'var(--secondaire-l1)',
            cursor: 'pointer',
          }}/>
      </form>
    </MainContainer>
  )
}