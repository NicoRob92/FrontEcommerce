import React from 'react';
import style from './_Menu.module.scss';

 
 

import { NavLink } from 'react-router-dom';
export const Menu = ({ user, handleLogOut, close }) => {
  const rol = localStorage.getItem('rol');
  console.log(user);
  return (
    <div className={style.menu} id='menu'>
      <div className={style.tittle}>
        <h5> {user} </h5>
        <button
          className={style.closeButton}
          onClick={() => {
            close();
          }}>
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
      <menu>
        <li key='0' type='none'>
          <h6>Perfil</h6>
        </li>

        <li key='2' type='none'>
          <NavLink to={'/new-post'}>Post</NavLink>
        </li>
        <li key='3' type='none'>
          Compras
        </li>
        <li key='4' type='none'>
          Ventas
        </li>
        <li key='5' type='none'>
          Ayuda
        </li>
        {rol === 'admin' ? (
          <li key='1' type='none'>
            <NavLink to={'/admin'}>Administracion</NavLink>
          </li>
        ) : null}
      </menu>

      <button className={style.logout}onClick={(e) => handleLogOut(e)}>
        <svg
          width='32'
          height='32'
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M21.75 10.75L27 16L21.75 21.25'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M13 16H27'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M13 27H6C5.73478 27 5.48043 26.8946 5.29289 26.7071C5.10536 26.5196 5 26.2652 5 26V6C5 5.73478 5.10536 5.48043 5.29289 5.29289C5.48043 5.10536 5.73478 5 6 5H13'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
    </div>
  );
};
