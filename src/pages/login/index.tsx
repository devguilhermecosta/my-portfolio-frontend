import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import MainContainer from '../../components/mainContainer';
import Style from './login.module.css';
import Loading from '../../components/loading';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const { userAuthentication, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  function validateFields(): boolean {
    /**
     * Checks if the fields are blank.
     */
    setUsernameError(!username ? 'Campo obrigatório' : '');
    setPasswordError(!password ? 'Campo obrigatório' : '');

    return !username || !password ? false : true
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
  
    if (!validateFields()) return;
    
    setLoading(true);

    await axios.post('http://127.0.0.1:8000/api/token/', {
      username: username,
      password: password,
    })
    .then(response => {
      userAuthentication(response.data);
      navigate('/admin/dashboard', { replace: true });
      setLoading(true);
    })
    .catch(() => {
      setLoading(false);
      setUsernameError('Usuário ou senha inválidos');
    })
  }

  if (isAuthenticated) {
    return (
      <Navigate to='/admin/dashboard' />
    )
  }

  return (
    <MainContainer>

      {loading && (
        <Loading />
      )}

      <form 
        name='login_form' 
        id='login_form' 
        className={Style.Login_form}
        onSubmit={(e) => handleSubmit(e)}
        >
        <div>
          <label htmlFor="username" className={Style.Login_form__label}>Username</label>
          <input 
            type="text" 
            name="username" 
            id="username" 
            className={Style.Login_form__input}
            value={username}
            onChange={(e) => {setUsername(e.target.value)}}
            />
          {usernameError && (
            <p style={{ color: 'red' }}>{usernameError}</p>
          )}
        </div>
        <div>
          <label htmlFor="password" className={Style.Login_form__label}>Password</label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            className={Style.Login_form__input}
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
            />
          {passwordError && (
            <p style={{ color: 'red' }}>{passwordError}</p>
          )}
        </div>
        <input type="submit" id="submit" value="sign in" className={Style.Login_form__submit}/>
      </form>
    </MainContainer>
  )
}