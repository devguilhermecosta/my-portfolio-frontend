import Style from './workDetail.module.css';
import MainContainer from "../../../../components/mainContainer";
import BackButton from "../../../../components/backButton";
import { useNavigate, useParams } from "react-router-dom";
import { WorkProps } from "../../../../interfaces/work";
import { useEffect, useState } from "react";
import { api } from "../../../../utils/api";
import Loading from "../../../../components/loading";
import ContactElement from "../../../../components/contact";
import { baseUrl } from "../../../../utils/api";
import Carousel from '../../../../components/carousel';
import { BsArrowsAngleExpand } from "react-icons/bs";

export default function HomeWorkDetail(): JSX.Element {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [work, setWork] = useState<WorkProps>();
  const [image, setImage] = useState('');
  const [modalImage, setModalImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getWork() {
      await api.get(`/work/api/${slug}/`)
      .then(r => {
        setWork(r.data);
        setImage(baseUrl + r.data.cover);
      })
      .finally(() => setLoading(false))
    }

    getWork();

  }, [slug])

  if (loading) {
    return (
      <MainContainer>
        <Loading />
      </MainContainer>
    )
  }

  return (
    <MainContainer>
      <BackButton onClick={() => navigate('/')}/>

      {work 
      ? 
        <section className={Style.C_work_main}>
          <section className={Style.C_work}>
            <section className={Style.C_work_details}>
              <h1 className={Style.C_work_title}>{work.title}</h1>
              <p className={Style.C_work_description}>{work.description}</p>
              {work?.link && (
                <a 
                  href={work?.link} 
                  target="_blank" 
                  className={Style.C_work_link}>
                    Link do projeto: {work?.link}
                </a>
              )}
              <ContactElement ctaText="você pode me chamar aqui"/>
            </section>

            <div className={Style.C_work_c_cover}>
              <div className={Style.C_work_expand} onClick={() => setModalImage(image)}>
                <BsArrowsAngleExpand size={28} />
              </div>
              <img src={image} alt={`image of ${work.title}`} />
            </div>
          </section>
          
          <Carousel style={{ marginTop: '20px' }}>
            <div className={Style.C_work_c_image}>
              <img 
                src={baseUrl + work.cover} 
                alt={`image of ${work.title}`}
                onClick={() => setImage(baseUrl + work.cover)}/>
            </div>
            {work?.images && work?.images.map(image => (
              <div 
                key={image.id} 
                className={Style.C_work_c_image}
                onClick={() => setImage(baseUrl + image.url)}
              >
                <img src={`${baseUrl}${image.url}`} alt=""/>
              </div>
            ))}
          </Carousel>

          {modalImage && (
            <div className={Style.C_modal} onClick={() => setModalImage('')}>
              <div className={Style.C_modal_c_image}>
                <img src={image} alt="modal image" />
              </div>
            </div>
          )}

        </section>

      : <h1>Page not found</h1>}

    </MainContainer>
  )
}