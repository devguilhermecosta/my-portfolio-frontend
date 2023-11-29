import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import MainContainer from '../../components/mainContainer';
import './loginForm.css';
import { useNavigate, Navigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const { handleLogin, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  function validateFields(): boolean {
    /**
     * Checks if the fields are blank.
     */
    setUsernameError(!username ? 'Campo obrigatório' : '');
    setPasswordError(!password ? 'Campo obrigatório' : '');

    return !username || !password ? false : true
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
  
    if (!validateFields()) return;
    
    setLoading(true);

    handleLogin(e)
    .then(() => {
      navigate('/admin/dashboard', { replace: true });
      setLoading(true);
    })
    .catch(() => {
      setLoading(false);
      setUsernameError('Usuário ou senha inválidos');
    });
  }

  if (loading) {
    return (
      <h1>loading...</h1>
    )
  }

  if (isAuthenticated) {
    return (
      <Navigate to='/admin/dashboard' />
    )
  }

  return (
    <MainContainer>
      <form 
        name='login_form' 
        id='login_form' 
        className="Login-form"
        onSubmit={(e) => handleSubmit(e)}
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
          {usernameError && (
            <p style={{ color: 'red' }}>{usernameError}</p>
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
          {passwordError && (
            <p style={{ color: 'red' }}>{passwordError}</p>
          )}
        </div>
        <input type="submit" id="submit" value="sign in" className="Login-form__submit"/>
      </form>
    </MainContainer>
  )
}