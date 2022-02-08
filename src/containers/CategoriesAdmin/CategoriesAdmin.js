import styles from './_CategoriesAdmin.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getOrders, getCategories } from '../../ducks/actions/actionCreators';
import Paginado from '../Post/paginado';
import axios from 'axios';
import { api } from '../../credentials';

export const CategoriesAdmin = () => {
  const token = localStorage.getItem('token');
  const categories = useSelector((state) => state.reducer.categories);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(null);
  const [current, setCurrent] = useState(1);
  const pages = filter ? filter?.length / 27 : categories?.length / 272;
  const lastIndex = current * 27;
  const first = lastIndex - 27;
  const toShow = filter
    ? filter.slice(first, lastIndex)
    : categories?.slice(first, lastIndex);

  const [category, setCategory] = useState({
    category: ''
  });

  const paginate = (e) => {
    setCurrent(e);
  };

  const next = (e) => {
    e.preventDefault();
    setCurrent(current + 1);
  };

  const prev = (e) => {
    e.preventDefault();
    setCurrent(current - 1);
  };

  const [input, setInput] = useState({
    option: '',
    value: '',
  });
  console.log(categories);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.option === 'id')
      setFilter(categories.filter((x) => x.id === Number(input.value)));
    if (input.option === 'name')
      setFilter(categories.filter((x) => x.name.includes(input.value)));
    else {
      setFilter(null);
    }
  };
  const reset = (e) => {
    e.preventDefault();
    setFilter(null);
  };
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  let idTochange;

  const deleteCategory = async (e) => {
    idTochange = e.id;
    return await axios.delete(`${api}admin/category/${idTochange}`, {
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
    });
  };

  const createCategory = async (e) => {
    e.preventDefault();
    return await axios.post(`${api}admin/category`,JSON.stringify(category), {
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
    });
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [idTochange]);

  return (
    <div className={styles.orderHistory}>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.Form}>
        <div className={styles.containerForm}>
          <select
            name='options'
            onChange={(e) => setInput({ ...input, option: e.target.value })}>
            <option defaultValue={true}>Filtro</option>
            <option key='id' value='id'>
              Id Category
            </option>
            <option key='name' value='name'>
              Nombre
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
        <div className={styles.boxOne}>
          Categorias{' '}
          <div>
            <input
              type='text'
              onChange={(e) => setCategory({...category,category:e.target.value})}></input>
            <button onClick={(e) => createCategory(e)}>Add Category</button>
          </div>
        </div>
        <div className={styles.boxTwo}>
          <div className={styles.title}>Category Id</div>
          {toShow
            ? toShow.map((e) => <div className={styles.item}>{e.id}</div>)
            : null}
        </div>
        <div className={styles.boxThree}>
          <div className={styles.title}>Nombre</div>
          {toShow
            ? toShow.map((e) => <div className={styles.item}>{e.name}</div>)
            : null}
        </div>

        <div className={styles.boxFour}>
          <div className={styles.title}>Actions</div>
          {toShow ? (
            toShow.map((e) => (
              <div key={e.id} className={styles.actions}>
                <button onClick={(x) => deleteCategory(e)}>
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
            <div>Post Not Found</div>
          )}
        </div>
      </div>
      <div className={styles.buttons}>
        <button onClick={(e) => prev(e)}>Prev</button>
        <Paginado
          items={27}
          array={filter?.length || categories.length}
          paginate={paginate}
        />
        <button onClick={(e) => next(e)}>Next</button>
      </div>
    </div>
  );
};
