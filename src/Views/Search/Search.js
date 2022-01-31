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

  const getPostByName= async () => {
    const arr = await axios.get(
      `https://api-ec.herokuapp.com/api/post?name=${name}`
    );
    let array = arr.data;
    array.forEach((e) => {
      e.image = faker.image.image(350, 350, true);
    });
    setFilter(array);
  };

  let categoriesId = filter ? filter?.map((e) => e.categoryId) : null;
  let id = new Set(categoriesId);
  for (const num of id) {
    arrayId.push(num);
  }
  let arrayCategory = [];
  arrayId.forEach((e) => arrayCategory.push(state.filter((x) => x.id === e)));

  useEffect(() => {
    getPostByName()
  }, [name]);

  useEffect(() => {
    setCategory(arrayCategory.flat());
  }, [filter]);

  const setCategoriesToFilter = (e) => {
    const target = e.target;
    let index = chosenCategories.findIndex((e) => e === target.id);
    console.log('me ejecuto');

    if (target.checked && index === -1) {
      // setChosenCategories((prevState) => (prevState = [...prevState, target.id]));
      console.log('1');
      dispatch(actionsCreators.chooseCategories(target.id, 'add category'));
    } else if (!target.checked && index !== -1) {
      console.log('2');
      // setChosenCategories((prevState) => (prevState = prevState.filter((e, i) => i !== index)));
      dispatch(
        actionsCreators.chooseCategories(target.id, 'remove category', index)
      );
    }
  };

  return (
    <div className={styles.container}>
      <Categories
        categories={category}
        setCategoriesToFilter={setCategoriesToFilter}
        chosenCategories={chosenCategories}
      />
      {filter?.length > 0 ? <Post array={filter} /> : <NotFound/>}
    </div>
  );
};

export default Search;
