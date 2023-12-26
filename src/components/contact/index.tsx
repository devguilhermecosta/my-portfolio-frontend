import Style from './contact.module.css';
import { useState } from "react";
import ButtonContact from "../buttonContact";
import whatsappLogo from '../../utils/images/whatsapp.png'
import gmailLogo from '../../utils/images/gmail.png';
import phoneLogo from '../../utils/images/phone.png';
import CallMeButton from '../callMeButton';
import { api } from '../../utils/api';
import { token_access } from '../../utils/api';
import { CSSProperties } from 'react';

export default function ContactElement({ ctaText, style }: { ctaText?: string, style?: CSSProperties }): JSX.Element {
  const [openContact, setOpenContact] = useState(false);
  const [closeContact, setCloseContact] = useState(false);

  const [whatsappNumber, setWhatsappNumer] = useState('46999083251');
  const [phoneNumber, setPhoneNumber] = useState('(46) 9 9908-3251');
  const [email, setEmail] = useState('guilherme.partic@gmail.com');

  async function getContact() {
    await api.get(`/networks/api/v1/?token=${token_access}`)
    .then(r => {
      const whatsapp: string = r.data.whatsapp;
      setWhatsappNumer(whatsapp.replace(/[^0-9]/g, ''));
      setPhoneNumber(r.data.phone);
      setEmail(r.data.email)
    })
    .catch(() => {})
  }

  return (
    <>
      {openContact && (
        <section 
        className={`${Style.C_contact} ${openContact ? Style.Open_contact : ''} ${ closeContact ? Style.Close_contact : '' }`} 
        onClick={() => {
          setCloseContact(true);
          setTimeout(() => setOpenContact(false), 750);
        }}>
          <section className={Style.C_all_contacts}>
            <ButtonContact 
              target='_blank'
              text='me chama lá no whats' 
              image={whatsappLogo} 
              backgroundColor="var(--whatsapp-std)" 
              color="var(--secondaire-std)"
              href={`https://wa.me/${whatsappNumber}?text=Olá Guilherme`}
              testId={whatsappNumber}
            />
            <ButtonContact 
              text={email}
              image={gmailLogo} 
              backgroundColor='var(--secondaire-l1)' 
              color="var(--primary-std)"
              href="/"
            />
            <ButtonContact 
              text={phoneNumber}
              image={phoneLogo} 
              backgroundColor='var(--contrast-std)' 
              color='var(--secondaire-std)'
              href="/"
            />
          </section>
        </section>
      )}
      
      <CallMeButton text={ctaText} style={style} onClick={() => {
        getContact();
        setOpenContact(true);
        setCloseContact(false);
      }}/>

    </>
  )
}