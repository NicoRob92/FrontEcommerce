import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import faker from 'faker';
import Post from '../../containers/Post/Post';
import Categories from '../../containers/Categories/Categories';
import styles from './_Search.module.scss';
import * as actionsCreators from '../../ducks/actions/actionCreators';
import NotFound from '../../components/NotFound/NotFound';

const Search = () => {
  const { name } = useParams();
  const state = useSelector((state) => state.reducer.categories);
  const chosenCategories = useSelector(
    (state) => state.reducer.chosenCategories
  );
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(null);
  const [category, setCategory] = useState(null);
  let arrayId = [];

  const getPostByName = async () => {
    const arr = await axios.get(`https://api-ec.herokuapp.com/api/post?name=${name}`);
    let array = arr.data;
   
    setFilter(array);
  };

  let categories = filter ? filter?.map((e) => e.Categories) : null;
  let categoriesId = categories?.flat().map((e) => e.id);
  let id = new Set(categoriesId);
  for (const num of id) {
    arrayId.push(num);
  }
  let arrayCategory = [];
  arrayId.forEach((e) => arrayCategory.push(state.filter((x) => x.id === e)));

  useEffect(() => {
    getPostByName();
  }, [name]);

  useEffect(() => {
    setCategory(arrayCategory.flat());
  }, [state]);

  useEffect(() => {
    let element = document.getElementById('categories');
    element
      ? element?.classList
          .add(`${styles.categories}`)
          
      : element?.classList.remove(`${styles.categories}`);
  }, [name]);

  const setCategoriesToFilter = (e) => {
    const target = e.target;
    let index = chosenCategories.findIndex((e) => e === target.id);
    if (target.checked && index === -1) {
      dispatch(actionsCreators.chooseCategories(target.id, 'add category'));
    } else if (!target.checked && index !== -1) {
      dispatch(
        actionsCreators.chooseCategories(target.id, 'remove category', index)
      );
    }
  };

  return (
    <div className={styles.container}>
      <Categories        
        categories={arrayCategory.flat()}
        setCategoriesToFilter={setCategoriesToFilter}
        chosenCategories={chosenCategories}
      />

      {filter?.length > 0 ? <Post array={filter} /> : <NotFound />}
    </div>
  );
};

export default Search;
