import MainContainer from "../../components/mainContainer";
import { useState, useEffect, FormEvent, useContext } from 'react';
import { api } from "../../utils/api";
import Input from "../../components/input";
import { AuthContext } from "../../contexts/authContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/backButton";
import SubmitInput from "../../components/submitInput";
import { token_access } from "../../utils/api";

interface ErrorDataProps {
  instagram?: string;
  linkedin?: string;
  github?: string;
  whatsapp?: string;
  phone?: string;
  email?: string;
}

export default function Networks(): JSX.Element {
  const [instagram, setInstagram] = useState<string>('');
  const [linkedin, setLinkedin] = useState<string >('');
  const [github, setGithub] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [instagramError, setInstagramError] = useState<string | undefined>();
  const [linkedinError, setLinkedinError] = useState<string | undefined>();
  const [githubError, setGithubError] = useState<string | undefined>();
  const [whatsappError, setWhatsappError] = useState<string | undefined>();
  const [phoneError, setPhoneError] = useState<string | undefined>();
  const [emailError, setEmailError] = useState<string | undefined>();

  const [networkExists, setNetworkExists] = useState(false);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function getNetworks() {
      await api.get(`/networks/api/v1/?token=${token_access}`)
      .then(response => {
        setInstagram(response.data.instagram);
        setLinkedin(response.data.linkedin);
        setGithub(response.data.github);
        setWhatsapp(response.data.whatsapp);
        setPhone(response.data.phone);
        setEmail(response.data.email);
        setNetworkExists(true);
      })
      .catch(() => {
        toast.error('networks not found');
        setNetworkExists(false);
      })
    }

    getNetworks();
  
  }, []);

  function handleErrorFields(errorData: ErrorDataProps): void {
    setInstagramError(errorData?.instagram);
    setLinkedinError(errorData?.linkedin);
    setGithubError(errorData?.github);
    setWhatsappError(errorData?.whatsapp);
    setPhoneError(errorData?.phone);
    setEmailError(errorData?.email);
  }

  function cleanErrorFields(): void {
    setInstagramError('');
    setLinkedinError('');
    setGithubError('');
    setWhatsappError('');
    setPhoneError('');
    setEmailError('');
  }

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

    if (networkExists) {
      await api.patch('/networks/api/v1/', data, config)
      .then(() => {
        toast.success('save successfully');
        cleanErrorFields();
      })
      .catch((e) => {
        toast.error('error on save');
        handleErrorFields(e.response.data);
      })

      return
    }

    await api.post('/networks/api/v1/', data, config)
    .then(() => {
      toast.success('created successfully');
      cleanErrorFields();
    })
    .catch((e) => {
      toast.error('error on save');
      handleErrorFields(e.response.data);
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
          error={instagramError}
        />
        <Input labelName="linkedin"
          value={linkedin}
          onChange={(e) => {setLinkedin(e.target.value)}}
          error={linkedinError}
        />
        <Input labelName="github"
          value={github}
          onChange={(e) => {setGithub(e.target.value)}}
          error={githubError}
        />
        <Input labelName="whatsapp"
          value={whatsapp}
          onChange={(e) => {setWhatsapp(e.target.value)}}
          error={whatsappError}
        />
        <Input labelName="phone"
          value={phone}
          onChange={(e) => {setPhone(e.target.value)}}
          error={phoneError}
        />
        <Input labelName="email"
          value={email}
          onChange={(e) => {setEmail(e.target.value)}}
          error={emailError}
        />

        <SubmitInput />

      </form>
    </MainContainer>
  )
}