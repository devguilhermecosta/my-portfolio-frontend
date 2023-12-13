import MainContainer from "../../components/mainContainer";
import { Link } from "react-router-dom";
import Style from './header.module.css';
import imageProfile from '../../utils/images/profile.jpg';
import hand from '../../utils/images/Hand.png';
import CallMeButton from "../../components/callMeButton";

export default function Home(): JSX.Element {
  return(
    <MainContainer paddingTop='8px'>
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

      <section className={Style.C_title}>
        <p>Construir, desenvolver e escalar.</p>
        <p>Soluções digitais personalizadas </p>
        <p>para suas necessidades.</p>
      </section>

      <CallMeButton marginTop='45px'/>

      <span style={{
        display: 'block',
        width: 'calc(100vw - 50%)',
        height: '1.5px',
        backgroundColor: 'var(--primary-l1)',
        marginTop: '45px',
        borderRadius: '50%',
      }}/>
    </MainContainer>
  )
}

//TODO create the media queries for the elements space