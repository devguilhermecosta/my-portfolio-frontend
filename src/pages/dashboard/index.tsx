import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import MainContainer from '../../components/mainContainer';
import Loading from '../../components/loading';
import Style from './admin.module.css';

export default function Dashboard(): JSX.Element {
  const { handleLogout } = useContext(AuthContext);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  return (
    <MainContainer>
      {loading && (
        <Loading />
      )}

      <section className={Style.C_dashboard}>
        <h1>administration area</h1>
        <button onClick={() => {
          setloading(true);
          handleLogout();
          navigate('/admin/login');
        }}
          className={Style.C_dashboard_button_logout}>
          logout
        </button>
        <button 
          className={Style.C_dashboard_button}
          onClick={() => navigate('/admin/dashboard/networks')}
        >
          networks
        </button>
        <button 
          className={Style.C_dashboard_button}
          onClick={() => navigate('/admin/dashboard/works')}
        >
          works
        </button>
        <button 
          className={Style.C_dashboard_button}
          onClick={() => navigate('/')}
        >
          show the site
        </button>
      </section>
    </MainContainer>
  )
}