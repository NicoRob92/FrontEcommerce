import style from './_Menu.module.scss';
import { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';
export const Menu = ({ user, handleLogOut, close, show }) => {
  const rol = localStorage.getItem('rol');
  const id = localStorage.getItem('userId');

  return (
    <div className={style.menu}>
      <div className={style.tittle}>
        <h5> {user} </h5>
        <button
          className={style.closeButton}
          onClick={() => {
            close();
          }}>
          <svg
            width='32'
            height='32'
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
      <hr />
      <div className={style.articles}>
        <NavLink className={style.link} to={`/user/profile/${id}`}>
          Perfil
        </NavLink>

        <NavLink className={style.link} to={'/new-post'}>
          Post
        </NavLink>

        <NavLink className={style.link} to={'/compras'}>
          Compras
        </NavLink>
        {rol !== 'admin' ? (
        <NavLink className={style.link} to={'/ventas'}>
          Ventas
        </NavLink>
        ) : null}
        <NavLink className={style.link} to={'/my-posts'}>
          My Posts
        </NavLink>

        {rol === 'admin' ? (
          <NavLink className={style.link} to={'/admin'}>
            Administracion
          </NavLink>
        ) : null}
      </div>

      <button className={style.logout} onClick={(e) => handleLogOut(e)}>
        <svg
          width='75'
          height='75'
          viewBox='0 0 45 35'
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
