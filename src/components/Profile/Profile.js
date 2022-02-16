import React, { useState, useEffect } from 'react';
import style from './_Profile.module.scss';
import { Login } from '../Login/Login';
import { resetLogin } from '../../services/auth';
import { Menu } from '../Menu/Menu';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../ducks/actions/actionCreators';

export const Profile = ({ show }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('userId');
  const [name, setName] = useState(localStorage.getItem('username'));
  const [showMenu, setShowMenu] = useState(false);
  const usuario = useSelector((state) => state.user.user);
  console.log(usuario);

  const handleLogOut = (e) => {
    e.preventDefault();
    resetLogin();
    show();
    history.push('/');
  };

  const image =
    usuario.image ||
    'https://i.pinimg.com/564x/49/c5/33/49c53331d19be74b52d47fcce7e97468.jpg';

  const handleMenu = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
    let menu = document.getElementById('menu');
    showMenu
      ? menu.classList.add(`${style.visible}`)
      : menu.classList.remove(`${style.visible}`);
  };

  const closeMenu = () => {
    setShowMenu(!showMenu);
    let menu = document.getElementById('menu');
    showMenu
      ? menu.classList.add(`${style.visible}`)
      : menu.classList.remove(`${style.visible}`);
  };

  useEffect(() => {
    dispatch(getUserById(id));
  }, [name]);

  return (
    <div className={style.profile}>
      <div
        className={style.pic}
        style={{ backgroundImage: `url(${image})` }}
        alt='not found'
      />

      <button className={style.button} onClick={(e) => handleMenu(e)}>
        {usuario?.first_name?.toUpperCase() || usuario?.username?.toUpperCase()}
      </button>

      <div className={style.menu} id='menu'>
        <Menu
          user={
            usuario?.first_name?.toUpperCase() ||
            usuario?.username?.toUpperCase()
          }
          handleLogOut={handleLogOut}
          close={closeMenu}
        />
      </div>
    </div>
  );
};

export default Profile;
