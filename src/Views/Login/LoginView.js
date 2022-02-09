import styles from './_LoginView.module.scss';
import { Login } from '../../components/Login/Login';
import Google from '../../components/GoogleAuth/Google.jsx';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
export const LoginView = () => {

  const [name, setName] = useState(localStorage.getItem('username'));


  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <div className={styles.logs}>

          <Login setName={setName}/>

          <span className={styles.separador}/>
          <Google/>
        </div >
        <span className={styles.separadorH}/>
        <div  className={styles.register}>
            <h4>No tienes cuenta?</h4>
            <NavLink to='/register' className={styles.link}> Registrarse </NavLink>
        </div>
      </div>
    </div>
  );
};
