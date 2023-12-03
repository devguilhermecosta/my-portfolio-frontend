import MainContainer from "../../components/mainContainer";
import { useEffect, useState } from "react";
import axios from "axios";
import Style from './works.module.css';
import { WorkProps } from "../../interfaces/work";
import BackButton from "../../components/backButton";
import { useNavigate } from "react-router-dom";

export default function Works(): JSX.Element {
  const [works, setWorks] = useState<WorkProps[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function getWorks() {
      await axios.get('http://127.0.0.1:8000/work/api/list/')
      .then(response => setWorks(response.data))
      .catch(e => {
        setError(`internal server error: ${e}`)
      })
    }

    getWorks();

  }, [])

  return (
    <MainContainer>
      <BackButton onClick={() => navigate('/admin/dashboard')}/>
      <h1 style={{ marginBottom: '30px' }}>Manager Works</h1>

      {error && (<p className={Style.server_error}>{error}</p>)}

      <section className={Style.C_works}>
        {works && works.map((work) => (
          <section key={work.id} className={Style.C_work}>
            <a href={`/admin/dashboard/work/${work.slug}`}>
              <img 
                className={Style.C_work_cover} 
                src={`http://127.0.0.1:8000${work.cover}`} 
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