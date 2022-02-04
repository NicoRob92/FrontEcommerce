import { useState } from 'react';
import { setToken, setUsers, resetLogin } from '../../services/auth';
import { UserLogin } from '../../services/login';
import styles from './_Login.module.scss';
export const Login = ({ show, handleUser, setName }) => {
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
    const logged = localStorage.getItem('logged');
    console.log(logged);
    if (logged === 'true') {
      let loggedUser = {
        username: login.username,
        rol: login.rol,
        id: login.id,
        email: login.email,
      };
      setName(login.username);
      setToken(login.token);
      setUsers(loggedUser);
    } else {
      resetLogin();
      alert('Wrong username o password');
    }
  };

  return (
    <div className={styles.container}>
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
        </form>
        <button className={`${styles.login}`} onClick={show}>
        <svg
            width='25'
            height='25'
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z'
              stroke='white'
              strokeWidth='2'
              strokeLiterlimit='10'
            />
            <path
              d='M20 12L12 20'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M20 20L12 12'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
