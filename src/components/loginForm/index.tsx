import MainContainer from "../mainContainer";
import './loginForm.css';

export default function LoginForm(): JSX.Element {
  return (
    <MainContainer>
      <form name='login_form' id='login_form' className="Login-form">
        <div>
          <label htmlFor="username" className="Login-form__label">Username</label>
          <input type="text" name="username" id="username" className="Login-form__input"/>
        </div>
        <div>
          <label htmlFor="password" className="Login-form__label">Password</label>
          <input type="password" name="password" id="password" className="Login-form__input"/>
        </div>
        <input type="submit" id="submit" value="sign in" className="Login-form__submit"/>
      </form>
    </MainContainer>
  )
}