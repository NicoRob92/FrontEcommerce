import React, { useState, useEffect } from 'react';
import style from './_Profile.module.scss';
import { Login } from '../Login/Login';
import { resetLogin } from '../../services/auth';
import { Menu } from '../Menu/Menu';
import { useHistory } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import {getUserById} from '../../ducks/actions/actionCreators'

export const Profile = ({ show }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const logged = localStorage.getItem('logged');
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('userId');
  const [name, setName] = useState(localStorage.getItem('username'));
  const [showMenu, setShowMenu] = useState(false);
  const usuario = useSelector((state) => state.user.user)
  console.log(usuario)
  const handleLogOut = (e) => {
    e.preventDefault();
    resetLogin();
    show();
    history.push('/');
  };

  const handleMenu = (e) => {
    e.preventDefault();
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    dispatch(getUserById(id, token))
  },[name])

  return (
    <div className={style.container}>
      <div className={style.profile}>
        <img className={style.pic} src={usuario.image} alt='not found'/>
        <button className={style.button} onClick={(e) => handleMenu(e)}>
          {usuario?.username?.toUpperCase()}
        </button>
        {showMenu === true ? (
          <div className={style.menu}>
            <Menu
              user={name?.toUpperCase()}
              handleLogOut={handleLogOut}
              close={closeMenu}
            />{' '}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
