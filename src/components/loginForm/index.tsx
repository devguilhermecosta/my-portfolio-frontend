import { FormEvent, useState } from "react";
import MainContainer from "../mainContainer";
import axios from "axios";
import './loginForm.css';

export default function LoginForm(): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  async function handleForm(event: FormEvent) {
    event.preventDefault();

    setUsernameErrorMessage(username ? '' : 'Campo obrigatório');
    setPasswordErrorMessage(password ? '' : 'Campo obrigatório');

    if (!username || !password) return;

    const url = 'http://127.0.0.1:8000/api/token/'
   
    axios({
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username: username,
        password: password
      }
    })
    .then(response => {
      localStorage.setItem('tokenRefresh', JSON.stringify(response.data.refresh));
      setRefreshToken(JSON.stringify(response.data.refresh));
    })
    .catch(() => {
      setUsernameErrorMessage('Usuário ou senha inválidos');
    })
  }

  return (
    <MainContainer>
      <form 
        name='login_form' 
        id='login_form' 
        className="Login-form"
        onSubmit={handleForm}
        >
        <div>
          <label htmlFor="username" className="Login-form__label">Username</label>
          <input 
            type="text" 
            name="username" 
            id="username" 
            className="Login-form__input"
            value={username}
            onChange={(e) => {setUsername(e.target.value)}}
            />
          {usernameErrorMessage && (
            <p style={{ color: 'darkred' }}>{usernameErrorMessage}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className="Login-form__label">Password</label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            className="Login-form__input"
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
            />
          {passwordErrorMessage && (
            <p style={{ color: 'darkred' }}>{passwordErrorMessage}</p>
          )}
        </div>
        <input type="submit" id="submit" value="sign in" className="Login-form__submit"/>
      </form>
    </MainContainer>
  )
}