import MainContainer from "../../components/mainContainer";
import { Link } from "react-router-dom";
import Style from './header.module.css';
import imageProfile from '../../utils/images/profile.jpg';
import hand from '../../utils/images/Hand.png';
import CallMeButton from "../../components/callMeButton";
import SpaceSection from "../../components/spaceSection";
import Carousel from "../../components/carousel";
import { useState } from "react";
import whatsapp from '../../utils/images/whatsapp.png';
import gmail from '../../utils/images/gmail.png';
import phone from '../../utils/images/phone.png';
import ButtonContact from "../../components/buttonContact";

export default function Home(): JSX.Element {
  const [openContact, setOpenContact] = useState(false);
  const [closeContact, setCloseContact] = useState(false);

  return(
    <MainContainer paddingTop='8px' overflow="hidden">
      {/* CONTACT */}
      {openContact && (
        <section 
          className={`${Style.C_contact} ${openContact ? Style.Open_contact : ''} ${ closeContact ? Style.Close_contact : '' }`} 
          onClick={() => {
            setCloseContact(true);
            setTimeout(() => setOpenContact(false), 750);
          }
        }>
          <section className={Style.C_all_contacts}>
            <ButtonContact 
              text="whatsapp" 
              image={whatsapp} 
              backgroundColor="#4AB743" 
              color="var(--secondaire-std)"
              href="/"
            />
            <ButtonContact 
              text="email" 
              image={gmail} 
              backgroundColor='var(--secondaire-l1)' 
              color="var(--primary-std)"
              href="/"
            />
            <ButtonContact 
              text="phone" 
              image={phone} 
              backgroundColor='var(--contrast-std)' 
              color='var(--secondaire-std)'
              href="/"
            />
          </section>
        </section>
      )}

      {/* MENU */}
      <header className={Style.C_header}>
        <ul className={Style.C_header__ul}>
          <li><Link to='/'>instagram</Link></li>
          <li><Link to='/'>linkedin</Link></li>
          <li><Link to='/'>gitHub</Link></li>
        </ul>
      </header>

      {/* PROFILE */}
      <section className={Style.C_profile}>
        <div className={Style.C_profile_c_image}>
          <img src={imageProfile} alt="image of profile"/>
        </div>
        <div className={Style.C_profile_c_description}>
          <p>Olá, eu sou o Guilherme</p>
          <img src={hand} alt="image of a hand"/>
        </div>
      </section>

      {/* TEXT INTRO */}
      <SpaceSection>
        <section className={Style.C_title}>
          <p>Construir, desenvolver e escalar.</p>
          <p>Soluções digitais personalizadas </p>
          <p>para suas necessidades.</p>
        </section>
      </SpaceSection>
  
      {/* CTA */}
      <SpaceSection>
        <CallMeButton onClick={() => {
          setOpenContact(true); 
          setCloseContact(false);
        }}
        />
      </SpaceSection>

      {/* LINE */}
      <SpaceSection>
        <span className={Style.Break_row}/>
      </SpaceSection>

      {/* SUBTITLE */}
      <SpaceSection>
        <section className={Style.C_sub_title}>
          <p>Contribuindo com idéias e</p>
          <p>resultados impactantes.</p>
        </section>
      </SpaceSection>

      {/* SERVICES */}
      <SpaceSection>
        <Carousel>
          <div className={Style.C_Service}>
            <h2>Prototipagem</h2>
            <p>
              Criação de protótipos avançados de sites 
              e aplicativos para você testar e aprovar 
              antes do desenvolvimento definitivo.
            </p>
          </div>

          <div className={Style.C_Service}>
            <h2>UI/UX</h2>
            <p>
              Interfaces de usuário com design limpo e 
              objetivo, gerando alto engajamento e tornando 
              a experiência do usuário mais imersiva e gratificante.
            </p>
          </div>

          <div className={Style.C_Service}>
            <h2>Sistemas Web</h2>
            <p>
              Muito mais do que um site, um softwares online 
              capaz de alavancar os resultados do seu negócio.
            </p>
          </div>

          <div className={Style.C_Service}>
            <h2>Desenvolvimento</h2>
            <p>
              Técnologias seguras e escaláveis, independente do 
              tamanho da sua necessidade, usando ferramentas 
              modernas e aprovadas pelo mercado.
            </p>
          </div>
        </Carousel>
      </SpaceSection>

      {/* LINE */}
      <SpaceSection>
        <span className={Style.Break_row}/>
      </SpaceSection>

      {/* SUBTITLE */}
      <SpaceSection>
        <section className={Style.C_title}>
          <p>Conheça alguns dos meus trabalhos</p>
        </section>
      </SpaceSection>

      {/* WORKS */}
      <SpaceSection>
        <Carousel>
          <div className={Style.C_work}>
            <Link to='/'>
              <img src="https://picsum.photos/200/300?random=1" alt="" />
            </Link>
          </div>

          <div className={Style.C_work}>
            <Link to='/'>
              <img src="https://picsum.photos/200/300?random=2" alt="" />
            </Link>
          </div>

          <div className={Style.C_work}>
            <Link to='/'>
              <img src="https://picsum.photos/200/300?random=3" alt="" />
            </Link>
          </div>

          <div className={Style.C_work}>
            <Link to='/'>
              <img src="https://picsum.photos/200/300?random=4" alt="" />
            </Link>
          </div>

          <div className={Style.C_work}>
            <Link to='/'>
              <img src="https://picsum.photos/200/300?random=5" alt="" />
            </Link>
          </div>
          
          <div className={Style.C_work}>
            <Link to='/'>
              <img src="https://picsum.photos/200/300?random=6" alt="" />
            </Link>
          </div>
        </Carousel>
      </SpaceSection>

      {/* SUBTITLE */}
      <SpaceSection>
        <section className={Style.C_title}>
          <p>Vamos conversar sobre seu próximo projeto?</p>
        </section>
      </SpaceSection>

      {/* CTA */}
      <SpaceSection>
        <CallMeButton text="você pode me chamar aqui" onClick={() => {
          setOpenContact(true); 
          setCloseContact(false);
        }}/>
      </SpaceSection>

    </MainContainer>
  )
}
