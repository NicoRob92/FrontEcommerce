import React from 'react';
import style from './_Menu.module.scss';
import {NavLink} from 'react-router-dom'
export const Menu = ({ user, handleLogOut, close}) => {
 
 
  return (
    <div className={style.menu} id='menu' >
      <h5> {user.name} </h5>
      <h6>Perfil</h6>
      <NavLink to={'/new-post'}>Post</NavLink>
      <h6>Compras</h6>
      <h6>Ventas</h6>
      <h6>Ayuda</h6>
      <button onClick={() =>{close()}}>close</button>
      <button onClick={(e) => handleLogOut(e)}>Logout</button>
    </div>
  );
};
