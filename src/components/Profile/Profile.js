import React, { useState,useEffect } from 'react';
import style from './_Profile.module.scss';
import { Login } from '../Login/Login';
import { resetLogin } from '../../services/auth';
import { Menu } from '../Menu/Menu'

export const Profile = ({ show }) => {
  const logged = localStorage.getItem('logged');
  const [name, setName] = useState(localStorage.getItem('username'));
  const [showMenu, setShowMenu] =useState(false);

  const handleLogOut = (e) => {
    e.preventDefault();
    resetLogin();
    show();
  };

  const handleMenu = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(!showMenu);
  }
  
  return (
    <div className={style.container}>
      {logged === 'true' ? (
        <div className={style.profile}>
          <button className={style.button} onClick={(e)=> handleMenu(e)}>{name?.toUpperCase()}</button>
          {showMenu === true ? <div className={style.menu}><Menu user={name?.toUpperCase()} handleLogOut={handleLogOut} close= {closeMenu}/> </div>: null }
          </div>
      ) : (
        <Login show={show} setName={setName} />
      )}
    </div>
  );
};

export default Profile;
