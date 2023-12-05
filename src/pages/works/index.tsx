import MainContainer from "../../components/mainContainer";
import { useEffect, useState } from "react";
import { api, baseUrl } from "../../utils/api";
import Style from './works.module.css';
import { WorkProps } from "../../interfaces/work";
import BackButton from "../../components/backButton";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";

export default function Works(): JSX.Element {
  const [works, setWorks] = useState<WorkProps[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function getWorks() {
      await api.get('/work/api/list/')
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
        
        {works && works.map((work) => (
          <section key={work.id} className={Style.C_work}>
            <a href={`/admin/dashboard/work/${work.slug}`}>
              <img 
                className={Style.C_work_cover} 
                src={`${baseUrl}${work.cover}`} 
                alt={`image of ${work.title}`}
              />
            </a>
            <p>{work.title}</p>
          </section>
        ))}
      </section>
    </MainContainer>
  )
}