import React, { useState,useEffect } from 'react';
import style from './_Profile.module.scss';
import { Login } from '../Login/Login';
import { resetLogin } from '../../services/auth';
import { Menu } from '../Menu/Menu'
import { useHistory , useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Profile = ({ show }) => {
  const history = useHistory()
  const userName = useSelector((state) => state.reducer.name)
  // console.log(userName)
  const logged = localStorage.getItem('logged');
  const [name, setName] = useState('');
  const [showMenu, setShowMenu] =useState(false);
  
  const handleLogOut = (e) => {
    e.preventDefault();
    resetLogin();
    show();
   history.push('/')
  };

  const handleMenu = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(!showMenu);
  }
  
  useEffect(() => {
    setName(userName)
  },[userName])
   
  return (
    <div className={style.container}>
        <div className={style.profile}>
          <button className={style.button} onClick={(e)=> handleMenu(e)}>{name?.toUpperCase()}</button>
          {showMenu === true ? <div className={style.menu}><Menu user={name?.toUpperCase()} handleLogOut={handleLogOut} close= {closeMenu}/> </div>: null }
          </div>
    </div>
  );
};

export default Profile;
