import styles from './_LoginView.module.scss';
import { Login } from '../../components/Login/Login';
import Google from '../../components/GoogleAuth/Google.jsx';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom'
export const LoginView = () => {
    
    const location = useLocation()
    const path = location.pathname
    const reload = ()=>{
        window.location.reload();
    }
    useEffect(() => {
        
    },[path])
    
    
  return (
    <div className={styles.container} >
      <div className={styles.center}>
        <div className={styles.logs}>
          <Login />        
        <div onclick={(e) => reload(e)}>x</div>
          <Google hidden={true}/>
        </div>
      </div>
    </div>
  );
};
