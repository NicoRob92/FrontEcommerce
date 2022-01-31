import Categories from "../../containers/Categories/Categories";
import Products from "../../containers/Products/Products";
import Paginate from "../../containers/Paginate/Paginate";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getPages } from "../../helpers/getPages";
import { getPostToShow } from "../../helpers/getPostToShow";

import * as actionsCreators from "../../ducks/actions/actionCreators";

import styles from "./_Market.module.scss";

// import faker from "faker";

const Market = () => {
  const categories = useSelector((state) => state.reducer.categories);
  const post = useSelector((state) => state.reducer.posts);
  const chosenCategories = useSelector((state) => state.reducer.chosenCategories);
  const filteredPostByCategory = useSelector((state) => state.reducer.filteredPostByCategory);
  const dispatch = useDispatch();

  let postToShow = filteredPostByCategory.length === 0 ? post : filteredPostByCategory;


  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 20;

  useEffect(() => {
    let element = document.getElementById("categories");
    element
      ? element?.classList.add(`${styles.categories}`)
      : element?.classList.remove(`${styles.categories}`);
  }, []);

  const totalPages = getPages(postToShow?.length, postPerPage);

  let toSlice = getPostToShow(currentPage, postPerPage);

  let finalPostToShow = postToShow?.slice(toSlice.first, toSlice.last);

  const setPage = (e) => setCurrentPage((prevState) => (prevState = e.target.value));

  const setCategories = (e) => {
    const target = e.target;
    let index = chosenCategories.findIndex((e) => e === Number(target.value));

    if (target.checked && index === -1)
      dispatch(actionsCreators.chooseCategories(Number(target.value), "add category"));
    else if (!target.checked && index !== -1)
      dispatch(actionsCreators.chooseCategories(Number(target.value), "remove category", index));
    else if (target.id === "reset-chosenCategories")
      dispatch(actionsCreators.resetCategories());
    else if (target.id === "search")
      dispatch(actionsCreators.filterPostByCategory());
  };

  return (
    <>
      <div className={styles.Market}>
        <Categories
          categories={categories}
          setCategories={setCategories}
          chosenCategories={chosenCategories}
        />
        <Products products={finalPostToShow} />
      </div>
      <div className={styles.Paginate}>
        <Paginate totalPages={totalPages} setPage={setPage} />
      </div>
    </>
  );
};

export default Market;
