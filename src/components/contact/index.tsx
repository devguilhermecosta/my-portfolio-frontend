import Style from './contact.module.css';
import { useState } from "react";
import ButtonContact from "../buttonContact";
import whatsapp from '../../utils/images/whatsapp.png'
import gmail from '../../utils/images/gmail.png';
import phone from '../../utils/images/phone.png';
import CallMeButton from '../callMeButton';

export default function ContactElement({ ctaText }: { ctaText?: string }): JSX.Element {
  const [openContact, setOpenContact] = useState(false);
  const [closeContact, setCloseContact] = useState(false);

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
              text="(46 9 9908-3251)" 
              image={whatsapp} 
              backgroundColor="var(--whatsapp-std)" 
              color="var(--secondaire-std)"
              href="/"
            />
            <ButtonContact 
              text="guilherme.partic@gmail.com" 
              image={gmail} 
              backgroundColor='var(--secondaire-l1)' 
              color="var(--primary-std)"
              href="/"
            />
            <ButtonContact 
              text="(46 9 9908-3251)" 
              image={phone} 
              backgroundColor='var(--contrast-std)' 
              color='var(--secondaire-std)'
              href="/"
            />
          </section>
        </section>
      )}
      
      <CallMeButton text={ctaText} onClick={() => {
        setOpenContact(true);
        setCloseContact(false);
      }}/>

    </>
  )
}