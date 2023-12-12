import MainContainer from "../../components/mainContainer";
import { Link } from "react-router-dom";
import Style from './header.module.css';

export default function Home(): JSX.Element {
  return(
    <MainContainer>
      <header className={Style.C_header}>
        <ul className={Style.C_header__ul}>
          <li><Link to='/'>instagram</Link></li>
          <li><Link to='/'>linkedin</Link></li>
          <li><Link to='/'>gitHub</Link></li>
        </ul>
      </header>

      <section>
        <div>
          <img src="../../utils/images/profile.png" alt="image of profile" />
          <p></p>
        </div>
      </section>
    </MainContainer>
  )
}