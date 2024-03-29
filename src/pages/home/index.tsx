import MainContainer from "../../components/mainContainer";
import { Link } from "react-router-dom";
import Style from './home.module.css';
import imageProfile from '../../utils/images/profile.jpg';
import hand from '../../utils/images/Hand.png';
import SpaceSection from "../../components/spaceSection";
import Carousel from "../../components/carousel";
import ContactElement from "../../components/contact";
import { useEffect, useState } from "react";
import { api, baseUrl } from "../../utils/api";
import { HEADER_API_KEY } from "../../utils/api/headers";
import { WorkProps } from '../../interfaces/work';
import Header from "../../components/header";


export default function Home(): JSX.Element {
  const [works, setWorks] = useState<WorkProps[]>([]);

  useEffect(() => {
    async function getWorks() {
      await api.get(`/work/api/list/`, { headers: HEADER_API_KEY })
      .then(r => setWorks(r.data))
    }

    getWorks();

  }, [])

  function renderWork(work: WorkProps) {
    if (work.is_published && work.show_in_home) {
      return (
        <div key={work.id} className={Style.C_work}>
          <Link to={`work/${work.slug}`}>
            <img className={Style.C_work_img} src={`${baseUrl}/${work.cover}`} alt={`image of ${work.title}`}/>
          </Link>
        </div>
      )
    }
  }
  
  return(
    <MainContainer paddingTop='8px' overflow="hidden">

      <Header />

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
        <ContactElement />
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
      {works.length > 0 && (
        <SpaceSection>
        <section className={Style.C_title}>
          <p>Conheça alguns dos meus trabalhos</p>
        </section>
        </SpaceSection>
      )}

      {/* WORKS */}
      <SpaceSection>
        <Carousel>
          {works.length > 0 && works.map(work => (
            renderWork(work)
          ))}
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
        <ContactElement ctaText="você pode me chamar aqui"/>
      </SpaceSection>

    </MainContainer>
  )
}
