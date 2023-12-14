import MainContainer from "../../components/mainContainer";
import { Link } from "react-router-dom";
import Style from './header.module.css';
import imageProfile from '../../utils/images/profile.jpg';
import hand from '../../utils/images/Hand.png';
import CallMeButton from "../../components/callMeButton";
import SpaceSection from "../../components/spaceSection";
import Carousel from "../../components/carousel";

export default function Home(): JSX.Element {

  return(
    <MainContainer paddingTop='8px' overflow="hidden">
      <header className={Style.C_header}>
        <ul className={Style.C_header__ul}>
          <li><Link to='/'>instagram</Link></li>
          <li><Link to='/'>linkedin</Link></li>
          <li><Link to='/'>gitHub</Link></li>
        </ul>
      </header>

      <section className={Style.C_profile}>
        <div className={Style.C_profile_c_image}>
          <img src={imageProfile} alt="image of profile"/>
        </div>
        <div className={Style.C_profile_c_description}>
          <p>Olá, eu sou o Guilherme</p>
          <img src={hand} alt="image of a hand"/>
        </div>
      </section>

      <SpaceSection>
        <section className={Style.C_title}>
          <p>Construir, desenvolver e escalar.</p>
          <p>Soluções digitais personalizadas </p>
          <p>para suas necessidades.</p>
        </section>
      </SpaceSection>
  
      <SpaceSection>
        <CallMeButton />
      </SpaceSection>

      <SpaceSection>
        <span className={Style.Break_row}/>
      </SpaceSection>

      <SpaceSection>
        <section className={Style.C_sub_title}>
          <p>Contribuindo com idéias e</p>
          <p>resultados impactantes.</p>
        </section>
      </SpaceSection>

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

      <SpaceSection>
        <span className={Style.Break_row}/>
      </SpaceSection>

      <SpaceSection>
        <section className={Style.C_title}>
          <p>Conheça alguns dos meus trabalhos</p>
        </section>
      </SpaceSection>

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

    </MainContainer>
  )
}

//TODO add comments at the top of each element to identify them