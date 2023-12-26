import MainContainer from "../../components/mainContainer";
import { useEffect, useState } from "react";
import { api, baseUrl } from "../../utils/api";
import Style from './works.module.css';
import { WorkProps } from "../../interfaces/work";
import BackButton from "../../components/backButton";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";
import { token_access } from "../../utils/api";

export default function Works(): JSX.Element {
  const [works, setWorks] = useState<WorkProps[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function getWorks() {
      await api.get(`/work/api/list/?token=${token_access}`)
      .then(response => setWorks(response.data))
      .catch(e => {
        setError(`internal server error: ${e}`)
      })
    }

    getWorks();

  }, [])

  return (
    <MainContainer>
      <Button 
        value="new work" 
        onClick={() => navigate('/admin/dashboard/works/new')}
        position="top-right"
      />
      <BackButton onClick={() => navigate('/admin/dashboard')}/>
      <h1 style={{ marginBottom: '30px' }}>Manager Works</h1>

      {error && (<p className={Style.server_error}>{error}</p>)}

      <section className={Style.C_works}>
        
        {works.length > 0 && works.map((work) => (
          <section key={work.id} className={Style.C_work}>
            <div className={Style.C_work_image_container}>
              <a href={`/admin/dashboard/works/${work.slug}`}>
                <img 
                  className={Style.C_work_cover} 
                  src={`${baseUrl}${work.cover}`} 
                  alt={`image of ${work.title}`}
                />
              </a>
              <p>{work.title}</p>
            </div>
          </section>
        ))}
      </section>
    </MainContainer>
  )
}