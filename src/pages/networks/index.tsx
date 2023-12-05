import MainContainer from "../../components/mainContainer";
import { useState, useEffect, FormEvent, useContext } from 'react';
import { api } from "../../utils/api";
import Input from "../../components/input";
import { AuthContext } from "../../contexts/authContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/backButton";
import SubmitInput from "../../components/submitInput";

export default function Networks(): JSX.Element {
  const [instagram, setInstagram] = useState<string>('');
  const [linkedin, setLinkedin] = useState<string >('');
  const [github, setGithub] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function getNetworks() {
      await api.get('/networks/api/v1/')
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

    await api.patch('/networks/api/v1/', data, config)
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

        <SubmitInput />

      </form>
    </MainContainer>
  )
}