import { useState } from 'react';
import { setToken, setUsers, resetLogin } from '../../services/auth';
import { UserLogin } from '../../services/login';
import { useHistory } from 'react-router-dom';
import styles from './_Login.module.scss';
import {setName} from '../../ducks/actions/actionCreators'
import {useDispatch} from 'react-redux'
export const Login = ({ show, handleUser}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const login = await UserLogin(user);
    if (login.msg === 'user logged') {
      let loggedUser = {
        username: login.username,
        rol: login.rol,
        id: login.id,
        email: login.email,
      };
      dispatch(setName(login.username))
      setToken(login.token);
      setUsers(loggedUser);
      history.push('/')
    } else {
      resetLogin();
      alert('Wrong username o password');
    }

  };

  return (
      <div className={styles.container}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            handleSubmit(e);
          }}>
          <input
            type='text'
            name='username'
            value={user.username}
            placeholder='User'
            onChange={(e) => handleChange(e)}
          />
          <input
            type='password'
            name='password'
            value={user.password}
            placeholder='Password'
            onChange={(e) => handleChange(e)}></input>
          <div className={styles.buttonContainer}>

            <span>Login</span>
          <button className={`${styles.login}`} type='submit'>
            <svg
              width='25'
              height='25'
              viewBox='0 0 33 33'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M11.8628 21.5132L17.1128 16.2632L11.8628 11.0132'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M3.11279 16.2632H17.1128'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M17.1128 5.26318H24.1128C24.378 5.26318 24.6324 5.36854 24.8199 5.55608C25.0074 5.74361 25.1128 5.99797 25.1128 6.26318V26.2632C25.1128 26.5284 25.0074 26.7828 24.8199 26.9703C24.6324 27.1578 24.378 27.2632 24.1128 27.2632H17.1128'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
          </div>
        </form>
      </div>
  );
};
