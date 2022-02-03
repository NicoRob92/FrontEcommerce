import { useState } from 'react';
import { setToken, setUsers , resetLogin} from '../../services/auth';
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
    const logged = localStorage.getItem('logged')
    console.log(logged)    
    if (logged === 'true') {
      let loggedUser = {
        username: login.username,
        rol: login.rol,
        id: login.id,
        email: login.email
      };
      setName(login.username);
      setToken(login.token);
      setUsers(loggedUser);
    } else {
      resetLogin()
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
            Log In
          </button>
        </form>
        <button className={`${styles.login}`} onClick={show}>
          x
        </button>
      </div>
    </div>
  );
};
