import MainContainer from "../../components/mainContainer";
import { useState, useEffect } from 'react';
import Style from './networks.module.css';
import axios from "axios";

interface NetworksProps {
  instagram?: string;
	linkedin?: string;
	github?: string;
	whatsapp?: string;
	phone?: string;
	email?: string;
}

export default function Networks(): JSX.Element {
  const [networkList, setNetworkList] = useState<NetworksProps>();
  const [instagram, setInstagram] = useState<string | undefined>('');
  const [linkedin, setLinkedin] = useState<string | undefined>('');
  const [github, setGithub] = useState<string | undefined>('');
  const [whatsapp, setWhatsapp] = useState<string | undefined>('');
  const [phone, setPhone] = useState<string | undefined>('');
  const [email, setEmail] = useState<string | undefined>('');

  useEffect(() => {
    async function getNetworks() {
      await axios.get('http://127.0.0.1:8000/networks/api/v1/')
      .then(response => setNetworkList(response.data))
      .catch((e) => console.log('error: ', e))
    }

    getNetworks();
  
  }, []);

  useEffect(() => {
    if (networkList) {
      setInstagram(networkList?.instagram);
      setLinkedin(networkList?.linkedin);
      setGithub(networkList?.github);
      setWhatsapp(networkList?.whatsapp);
      setPhone(networkList?.phone);
      setEmail(networkList?.email);
    }
  }, [networkList])

  return (
    <MainContainer>
      <h1>Networks</h1>
      {networkList && (
        <form action="">
          className={Style.input}
          <input 
            type="text" 
            value={instagram}
            onChange={(e) => {setInstagram(e.target.value)}}
            className={Style.input}
          />
          <input 
            type="text" 
            value={linkedin}
            onChange={(e) => {setLinkedin(e.target.value)}}
            className={Style.input}
          />
          <input 
            type="text" 
            value={github}
            onChange={(e) => {setGithub(e.target.value)}}
            className={Style.input}
          />
          <input 
            type="text" 
            value={whatsapp}
            onChange={(e) => {setWhatsapp(e.target.value)}}
            className={Style.input}
          />
          <input 
            type="text" 
            value={phone}
            onChange={(e) => {setPhone(e.target.value)}}
            className={Style.input}
          />
          <input 
            type="text" 
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}
            className={Style.inpinputElementut}
          />
        </form>
      )}
    </MainContainer>
  )
}