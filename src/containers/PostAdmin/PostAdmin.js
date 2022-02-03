import styles from './_PostAdmin.module.scss';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts} from '../../ducks/actions/actionCreators';
import Paginate from '../Paginate/Paginate';
export const PostAdmin = () => {
  const Post = useSelector((state) => state.reducer.posts);
 
 
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(null); 
  const [toShow,setToShow] = useState(null);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    Post ? setToShow(Post.slice(0,27)) : setToShow(null)
  }, [Post]);
  const [input, setInput] = useState({
    option: '',
    value: '',
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    input.option === 'id' ? setFilter(Post.filter((e) => e[input.option] === Number(input.value))): 
    input.option === 'userId'? setFilter(Post.filter((e) => e.User.id === Number(input.value))) : setFilter(Post.filter((e) => e.User[input.option] === input.value))
  };

  const reset = (e) => {
    e.preventDefault();
    setFilter(null);
  };

 
  // const setPage = (e) => setCurrent((prevState) => (prevState = e.target.value));
  return (
    <div className={styles.container}>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.Form}>
        <div className={styles.containerForm}>
          <select
            name='options'
            onChange={(e) => setInput({ ...input, option: e.target.value })}>
            <option disabled='disabled' selected='true'>
              Filtro
            </option>
            <option value='id'>Post ID</option>
            <option value='username'>Username</option>
            <option value='userId'>User ID</option>
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
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
              <path
                d='M22.6376 22.0897L28.7126 28.1647'
                stroke='white'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
          </button>
          <button onClick={(e) => reset(e)} className={styles.reset}>Clear</button>
        </div>
      </form>
      <div className={styles.grid}>
        <div className={styles.boxOne}>Lista de Post</div>
        <div className={styles.boxTwo}>
          <div className={styles.title}>ID Post</div>
          {filter ? (
            filter?.map((e) => <div className={styles.item}>{e.id}</div>)
          ) : toShow ? (
            toShow.map((e) => <div className={styles.item}>{e.id}</div>)
          ) : (
            <div>Post Not Found</div>
          )}
        </div>
        <div className={styles.boxThree}>
          <div className={styles.title}>Title</div>
          {filter ? (
            filter?.map((e) => <div className={styles.item}>{e.name}</div>)
          ) : toShow ? (
            toShow.map((e) => <div className={styles.item}>{e.name}</div>)
          ) : (
            <div>Post Not Found</div>
          )}
        </div>
        <div className={styles.boxFour}>
          <div className={styles.title}>Link</div>
          {filter ? (
            filter?.map((e) => <div className={styles.item}><a href={`http://localhost:3000/detail/${e.id}`}>{`http://localhost:3000/detail/${e.id}`}</a></div>)
          ) : toShow ? (
            toShow.map((e) => <div className={styles.item}><a href={`http://localhost:3000/detail/${e.id}`}>{`http://localhost:3000/detail/${e.id}`}</a></div>)
          ) : (
            <div>Post Not Found</div>
          )}
        </div>
        <div className={styles.boxFive}>
          <div className={styles.title}>Author</div>
          {filter ? (
            filter?.map((e) => <div className={styles.item}>{`Id: ${e.User.id}  User: ${e.User.username}`}</div>)
          ) : toShow ? (
            toShow.map((e) => <div className={styles.item}>{`Id: ${e.User.id}  User: ${e.User.username}`}</div>)
          ) : (
            <div>Post Not Found</div>
          )}
        </div>
        <div className={styles.boxSix}>
          <div className={styles.title}>Action</div>
          {filter ? (
            filter.map((e) => (
              <div className={styles.actions}>
                <button>
                  <svg
                    width='25'
                    height='25'
                    viewBox='0 0 33 33'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M12.7125 27.1647H6.71253C6.44731 27.1647 6.19296 27.0593 6.00542 26.8718C5.81789 26.6843 5.71253 26.4299 5.71253 26.1647V20.5772C5.71208 20.4473 5.73723 20.3187 5.78657 20.1986C5.8359 20.0784 5.90844 19.9692 6.00003 19.8772L21 4.87719C21.0931 4.7827 21.204 4.70767 21.3263 4.65645C21.4486 4.60523 21.5799 4.57886 21.7125 4.57886C21.8451 4.57886 21.9764 4.60523 22.0987 4.65645C22.2211 4.70767 22.332 4.7827 22.425 4.87719L28 10.4522C28.0945 10.5452 28.1695 10.6561 28.2208 10.7785C28.272 10.9008 28.2984 11.0321 28.2984 11.1647C28.2984 11.2973 28.272 11.4286 28.2208 11.5509C28.1695 11.6732 28.0945 11.7841 28 11.8772L12.7125 27.1647Z'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M17.7125 8.16467L24.7125 15.1647'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M27.7125 27.1647H12.7125L5.77502 20.2272'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M21.2125 11.6647L9.21252 23.6647'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                </button>
                <button>
                  <svg
                    width='25'
                    height='25'
                    viewBox='0 0 33 33'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M6.71252 26.1647L16.7125 16.1647L26.7125 26.1647'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M6.71252 16.1647L16.7125 6.16467L26.7125 16.1647'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                </button>
                <button>
                  <svg
                    width='25'
                    height='25'
                    viewBox='0 0 33 33'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M27.7125 7.16467H5.71252'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M13.7125 13.1647V21.1647'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M19.7125 13.1647V21.1647'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M25.7125 7.16467V26.1647C25.7125 26.4299 25.6072 26.6842 25.4196 26.8718C25.2321 27.0593 24.9777 27.1647 24.7125 27.1647H8.71252C8.44731 27.1647 8.19295 27.0593 8.00542 26.8718C7.81788 26.6842 7.71252 26.4299 7.71252 26.1647V7.16467'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M21.7125 7.16467V5.16467C21.7125 4.63424 21.5018 4.12553 21.1267 3.75046C20.7517 3.37539 20.243 3.16467 19.7125 3.16467H13.7125C13.1821 3.16467 12.6734 3.37539 12.2983 3.75046C11.9232 4.12553 11.7125 4.63424 11.7125 5.16467V7.16467'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                </button>
              </div>
            ))
          ) : toShow ? (
            toShow.map((e) => (
              <div className={styles.actions}>
                <button>
                  <svg
                    width='25'
                    height='25'
                    viewBox='0 0 33 33'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M12.7125 27.1647H6.71253C6.44731 27.1647 6.19296 27.0593 6.00542 26.8718C5.81789 26.6843 5.71253 26.4299 5.71253 26.1647V20.5772C5.71208 20.4473 5.73723 20.3187 5.78657 20.1986C5.8359 20.0784 5.90844 19.9692 6.00003 19.8772L21 4.87719C21.0931 4.7827 21.204 4.70767 21.3263 4.65645C21.4486 4.60523 21.5799 4.57886 21.7125 4.57886C21.8451 4.57886 21.9764 4.60523 22.0987 4.65645C22.2211 4.70767 22.332 4.7827 22.425 4.87719L28 10.4522C28.0945 10.5452 28.1695 10.6561 28.2208 10.7785C28.272 10.9008 28.2984 11.0321 28.2984 11.1647C28.2984 11.2973 28.272 11.4286 28.2208 11.5509C28.1695 11.6732 28.0945 11.7841 28 11.8772L12.7125 27.1647Z'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M17.7125 8.16467L24.7125 15.1647'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M27.7125 27.1647H12.7125L5.77502 20.2272'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M21.2125 11.6647L9.21252 23.6647'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                </button>
                <button>
                  <svg
                    width='25'
                    height='25'
                    viewBox='0 0 33 33'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M6.71252 26.1647L16.7125 16.1647L26.7125 26.1647'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M6.71252 16.1647L16.7125 6.16467L26.7125 16.1647'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                </button>
                <button>
                  <svg
                    width='25'
                    height='25'
                    viewBox='0 0 33 33'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M27.7125 7.16467H5.71252'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M13.7125 13.1647V21.1647'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M19.7125 13.1647V21.1647'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M25.7125 7.16467V26.1647C25.7125 26.4299 25.6072 26.6842 25.4196 26.8718C25.2321 27.0593 24.9777 27.1647 24.7125 27.1647H8.71252C8.44731 27.1647 8.19295 27.0593 8.00542 26.8718C7.81788 26.6842 7.71252 26.4299 7.71252 26.1647V7.16467'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                    <path
                      d='M21.7125 7.16467V5.16467C21.7125 4.63424 21.5018 4.12553 21.1267 3.75046C20.7517 3.37539 20.243 3.16467 19.7125 3.16467H13.7125C13.1821 3.16467 12.6734 3.37539 12.2983 3.75046C11.9232 4.12553 11.7125 4.63424 11.7125 5.16467V7.16467'
                      stroke='white'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
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
      <div>
        <button /* onClick={(e) => prev(e)} */>Prev</button>
        {/* <Paginate totalPages={cant} setPage= {setPage} /> */}
        <button /* onClick={(e) => next(e)}  */>Next</button>
      </div>
    </div>
  );
};
