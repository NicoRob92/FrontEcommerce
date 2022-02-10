import Categories from '../../containers/Categories/Categories';
import Products from '../../containers/Products/Products';
import Paginate from '../../containers/Paginate/Paginate';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPages } from '../../helpers/getPages';
import { getPostsToShow } from '../../helpers/getPostsToShow';
import * as actionCreators from '../../ducks/actions/actionCreators';
import styles from './_Market.module.scss';
// import faker from "faker";
const Market = () => {
  const categories = useSelector((state) => state.reducer.categories);
  const posts = useSelector((state) =>
    state.reducer.posts.filter((e) => e.postStatus === 'Activo')
  );
  const chosenCategories = useSelector(
    (state) => state.reducer.chosenCategories
  );
  const filteredPostsByCategory = useSelector(
    (state) => state.reducer.filteredPostsByCategory
  );

  const dispatch = useDispatch();

  let postsToShow = !filteredPostsByCategory.length
    ? posts
    : filteredPostsByCategory;

  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 12;

  useEffect(() => {
    let element = document.getElementById('categories');
    element
      ? element?.classList.add(`${styles.categories}`)
      : element?.classList.remove(`${styles.categories}`);
  }, []);

  const totalPages = getPages(postsToShow.length, postPerPage);
  let toSlice = getPostsToShow(currentPage, postPerPage);
  let finalPostsToShow = postsToShow?.slice(toSlice.first, toSlice.last);
  
  const setPage = (e) => setCurrentPage((prevState) => (prevState = e.target.value));

  const setCategories = (e) => {
    let index = chosenCategories.findIndex((index) => index === Number(e.target.value));
    if (e.target.checked && index === -1) dispatch(actionCreators.chooseCategories(Number(e.target.value), "add"));
    else if (!e.target.checked && index !== -1) dispatch(actionCreators.chooseCategories(Number(e.target.value), "remove", index));
    else if (e.target.id === "reset") dispatch(actionCreators.resetChosenCategories());
    else if (e.target.id === "filter") {
      dispatch(actionCreators.filterPostsByCategory('reset'))
      dispatch(actionCreators.filterPostsByCategory("market"))
    };
  };

  useEffect(() => {
    return () => {
      dispatch(actionCreators.resetChosenCategories());
      dispatch(actionCreators.filterPostsByCategory('reset'));
    };
  }, []);


  return (
    <div className={styles.container}>
      <div className={styles.Market}>
        <Categories
          categories={categories}
          setCategories={setCategories}
          chosenCategories={chosenCategories}
        />
        <Products products={finalPostsToShow} />
      </div>
      <div className={styles.Paginate}>
        <button
          onClick={(e) =>
            currentPage > 1 && setCurrentPage((prev) => currentPage - 1)
          }>
          Prev
        </button>
        <Paginate totalPages={totalPages} setPage={setPage} />
        <button
          onClick={(e) =>
            currentPage < totalPages &&
            setCurrentPage((prev) => currentPage + 1)
          }>
          Next
        </button>
      </div>
    </div>
  );
};
export default Market;
