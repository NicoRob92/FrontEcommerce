import styles from './_UsersAdmin.module.scss';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../ducks/actions/actionCreators';
import { ModalPass } from '../../components/Modals/ModalPass';
import { ModalRol } from '../../components/Modals/ModalRol';
import { ModalDeleteUser } from '../../components/Modals/ModalDeleteUser';
import Paginado from '../Post/paginado';
export const UsersAdmin = () => {
  let Users = useSelector((state) => state.reducer.users);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(null);
  const token = localStorage.getItem('token');
  const [show, setShow] = useState(true);
  const [editUser, setEditUser] = useState(false);
  const [editRol, setEditRol] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [rol, setrol] = useState(0);
  const [id, setId] = useState(null);
  const [current, setCurrent] = useState(1);
  const lastIndex = current * 27;
  const first = lastIndex - 27;
  const pages = Math.ceil(filter ? filter?.length / 27 : Users.length / 27);
  let toShow = filter
    ? filter?.slice(first, lastIndex)
    : Users.slice(first, lastIndex);
  const paginate = (e) => {
    setCurrent(e);
  };
  const next = (e) => {
    e.preventDefault();
    if (current < pages) setCurrent((current) => current + 1);
  };
  const prev = (e) => {
    e.preventDefault();
    if (current > 1) setCurrent((current) => current - 1);
  };

  const handleEditPass = (e) => {
    setId(e);
    setEditUser(!editUser);
    setShow(!show);
  };

  const handleEditRol = (e) => {
    setId(e);
    setEditRol(!editRol);
    setShow(!show);
  };
  const handleDeleteUser = (e) => {
    setId(e);
    setDeleteUser(!deleteUser);
    setShow(!show);
  };

  const handleShow = () => {
    setShow(!show);
    editUser ? setEditUser(!editUser) : setEditUser(editUser);
    editRol ? setEditRol(!editRol) : setEditRol(editRol);
    deleteUser ? setDeleteUser(!deleteUser) : setDeleteUser(deleteUser);
  };

  const changeRol = () => {
    rol < 2 ? setrol((prev) => rol + 1) : setrol((prev) => 0);
    if (rol === 0) setFilter(null);
    if (rol === 1) setFilter(Users.filter((e) => e.role === 'admin'));
    if (rol === 2) setFilter(Users.filter((e) => e.role === 'user'));
  };

  Users = Users?.sort((a, b) => a.id - b.id);
  useEffect(() => {
    dispatch(getUsers(token));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsers(token));
  }, [show]);

  const [input, setInput] = useState({
    option: '',
    value: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilter(Users.filter((e) => e[input.option] == input.value));
  };

  const reset = (e) => {
    e.preventDefault();
    setFilter(null);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.Form}>
        <div className={styles.containerForm}>
          <select
            name='options'
            onChange={(e) => setInput({ ...input, option: e.target.value })}>
            <option defaultValue={true}>Filtro</option>
            <option key={'id'} value='id'>
              User ID
            </option>
            <option key={'user'} value='username'>
              Username
            </option>
            <option key={'emai'} value='email'>
              Email
            </option>
          </select>
          <input
            type='text'
            name='filter'
            placeholder='Buscar'
            onChange={(e) => setInput({ ...input, value: e.target.value })}
          />
          <button type='submit' className={styles.search}>
            <svg
              width='25'
              height='25'
              viewBox='0 0 33 33'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M15.2125 25.1647C21.0115 25.1647 25.7125 20.4637 25.7125 14.6647C25.7125 8.86568 21.0115 4.16467 15.2125 4.16467C9.41353 4.16467 4.71252 8.86568 4.71252 14.6647C4.71252 20.4637 9.41353 25.1647 15.2125 25.1647Z'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M22.6376 22.0897L28.7126 28.1647'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
          <button onClick={(e) => reset(e)} className={styles.reset}>
            Clear
          </button>
        </div>
      </form>
      <div className={styles.grid}>
        <div className={styles.boxOne}>Lista de Usuarios</div>
        <div className={styles.boxTwo}>
          <div className={styles.title}>ID User</div>
          {toShow ? (
            toShow.map((e) => (
              <div key={e.id} className={styles.item}>
                {e.id}
              </div>
            ))
          ) : (
            <div>Users Not Found</div>
          )}
        </div>
        <div className={styles.boxThree}>
          <div className={styles.title}>Username</div>
          {toShow ? (
            toShow.map((e) => (
              <div key={e.id} className={styles.item}>
                {e.username.indexOf('@') === -1
                  ? e.username
                  : e.username.substring(0, e.username.indexOf('@'))}
              </div>
            ))
          ) : (
            <div>Users Not Found</div>
          )}
        </div>
        <div className={styles.boxFour}>
          <div className={styles.title}>Email</div>
          {toShow ? (
            toShow.map((e) => (
              <div key={e.id} className={styles.item}>
                {e.email}
              </div>
            ))
          ) : (
            <div>Users Not Found</div>
          )}
        </div>
        <div className={styles.boxFive}>
          <div className={styles.title} >
            Rol
            <button onClick={(e) => changeRol(e)}>
            <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M15 21V9'
                  stroke='black'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
                <path
                  d='M9 15V3'
                  stroke='black'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
                <path
                  d='M12 18L14.913 20.913C14.961 20.961 15.039 20.961 15.087 20.913L18 18'
                  stroke='black'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
                <path
                  d='M6 5.99998L8.91296 3.08702C8.96103 3.03895 9.03897 3.03895 9.08704 3.08702L12 5.99998'
                  stroke='black'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
            </button>

          </div>
          {toShow ? (
            toShow.map((e) => (
              <div key={e.id} className={styles.item}>
                {e.role}
              </div>
            ))
          ) : (
            <div>Users Not Found</div>
          )}
        </div>
        <div className={styles.boxSix}>
          <div className={styles.title}>Status</div>
          {toShow ? (
            toShow.map((e) => (
              <div key={e.id} className={styles.item}>
                {e.status === true ? 'Activo' : 'Inactivo'}
              </div>
            ))
          ) : (
            <div>Users Not Found</div>
          )}
        </div>
        <div className={styles.boxSeven}>
          <div className={styles.title}>Action</div>
          {toShow ? (
            toShow.map((e) => (
              <div key={e.id} className={styles.actions}>
                <button key={e.name} onClick={(x) => handleEditPass(e.id)}>
                  <svg
                    width='25'
                    height='25'
                    viewBox='0 0 33 33'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M12.7125 27.1647H6.71253C6.44731 27.1647 6.19296 27.0593 6.00542 26.8718C5.81789 26.6843 5.71253 26.4299 5.71253 26.1647V20.5772C5.71208 20.4473 5.73723 20.3187 5.78657 20.1986C5.8359 20.0784 5.90844 19.9692 6.00003 19.8772L21 4.87719C21.0931 4.7827 21.204 4.70767 21.3263 4.65645C21.4486 4.60523 21.5799 4.57886 21.7125 4.57886C21.8451 4.57886 21.9764 4.60523 22.0987 4.65645C22.2211 4.70767 22.332 4.7827 22.425 4.87719L28 10.4522C28.0945 10.5452 28.1695 10.6561 28.2208 10.7785C28.272 10.9008 28.2984 11.0321 28.2984 11.1647C28.2984 11.2973 28.272 11.4286 28.2208 11.5509C28.1695 11.6732 28.0945 11.7841 28 11.8772L12.7125 27.1647Z'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M17.7125 8.16467L24.7125 15.1647'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M27.7125 27.1647H12.7125L5.77502 20.2272'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M21.2125 11.6647L9.21252 23.6647'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
                <button
                  key={e.name + 'key'}
                  onClick={(x) => handleEditRol(e.id)}>
                  {e.status ? (
                    <svg
                      width='25'
                      height='25'
                      viewBox='0 0 32 32'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        opacity='0.2'
                        d='M16 20C20.4183 20 24 16.4183 24 12C24 7.58172 20.4183 4 16 4C11.5817 4 8 7.58172 8 12C8 16.4183 11.5817 20 16 20Z'
                        fill='white'
                      />
                      <path
                        d='M16 20C20.4183 20 24 16.4183 24 12C24 7.58172 20.4183 4 16 4C11.5817 4 8 7.58172 8 12C8 16.4183 11.5817 20 16 20Z'
                        stroke='white'
                        strokeWidth='2'
                        strokeMiterlimit='10'
                      />
                      <path
                        d='M3.875 27C5.10367 24.8714 6.87104 23.1038 8.99944 21.8749C11.1278 20.6459 13.5423 19.9989 16 19.9989C18.4577 19.9989 20.8722 20.6459 23.0006 21.8749C25.129 23.1038 26.8963 24.8714 28.125 27'
                        stroke='white'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  ) : (
                    <svg
                      width='25'
                      height='25'
                      viewBox='0 0 32 32'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        opacity='1'
                        d='M16 20C20.4183 20 24 16.4183 24 12C24 7.58172 20.4183 4 16 4C11.5817 4 8 7.58172 8 12C8 16.4183 11.5817 20 16 20Z'
                        fill='red'
                      />
                      <path
                        d='M16 20C20.4183 20 24 16.4183 24 12C24 7.58172 20.4183 4 16 4C11.5817 4 8 7.58172 8 12C8 16.4183 11.5817 20 16 20Z'
                        stroke='white'
                        strokeWidth='2'
                        strokeMiterlimit='10'
                      />
                      <path
                        d='M3.875 27C5.10367 24.8714 6.87104 23.1038 8.99944 21.8749C11.1278 20.6459 13.5423 19.9989 16 19.9989C18.4577 19.9989 20.8722 20.6459 23.0006 21.8749C25.129 23.1038 26.8963 24.8714 28.125 27'
                        stroke='white'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  )}
                </button>
                <button key={e.id} onClick={(x) => handleDeleteUser(e.id)}>
                  <svg
                    width='25'
                    height='25'
                    viewBox='0 0 33 33'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M27.7125 7.16467H5.71252'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M13.7125 13.1647V21.1647'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M19.7125 13.1647V21.1647'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M25.7125 7.16467V26.1647C25.7125 26.4299 25.6072 26.6842 25.4196 26.8718C25.2321 27.0593 24.9777 27.1647 24.7125 27.1647H8.71252C8.44731 27.1647 8.19295 27.0593 8.00542 26.8718C7.81788 26.6842 7.71252 26.4299 7.71252 26.1647V7.16467'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M21.7125 7.16467V5.16467C21.7125 4.63424 21.5018 4.12553 21.1267 3.75046C20.7517 3.37539 20.243 3.16467 19.7125 3.16467H13.7125C13.1821 3.16467 12.6734 3.37539 12.2983 3.75046C11.9232 4.12553 11.7125 4.63424 11.7125 5.16467V7.16467'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <div>Users Not Found</div>
          )}
        </div>
      </div>
      <div className={styles.buttons}>
        <button onClick={(e) => prev(e)}>Prev</button>
        <Paginado
          items={27}
          array={filter?.length || Users.length}
          paginate={paginate}
        />
        <button onClick={(e) => next(e)}>Next</button>
      </div>
      {editUser ? <ModalPass id={id} show={handleShow} hidden={show} /> : null}
      {editRol ? <ModalRol id={id} show={handleShow} hidden={show} /> : null}
      {deleteUser ? (
        <ModalDeleteUser id={id} show={handleShow} hidden={show} />
      ) : null}
    </div>
  );
};
