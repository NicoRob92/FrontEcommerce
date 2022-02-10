import Categories from "../../containers/Categories/Categories";
import Products from "../../containers/Products/Products";
import Paginate from "../../containers/Paginate/Paginate";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPages } from "../../helpers/getPages";
import { getPostsToShow } from "../../helpers/getPostsToShow";
import * as actionCreators from "../../ducks/actions/actionCreators";
import styles from "./_Market.module.scss";
// import faker from "faker";
const Market = () => {
  const categories = useSelector((state) => state.reducer.categories);
  const posts = useSelector((state) =>
    state.reducer.posts.filter((e) => e.postStatus === "Activo")
  );
  const chosenCategories = useSelector(
    (state) => state.reducer.chosenCategories
  );
  const filteredPostsByCategory = useSelector(
    (state) => state.reducer.filteredPostsByCategory
  );
  const [msg, setMsg] = useState(false);

  const dispatch = useDispatch();

  let postsToShow = !filteredPostsByCategory.length
    ? posts
    : filteredPostsByCategory;

  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 12;

  useEffect(() => {
    let element = document.getElementById("categories");
    element
      ? element?.classList.add(`${styles.categories}`)
      : element?.classList.remove(`${styles.categories}`);
  }, []);

  const totalPages = getPages(postsToShow.length, postPerPage);
  let toSlice = getPostsToShow(currentPage, postPerPage);
  let finalPostsToShow = postsToShow?.slice(toSlice.first, toSlice.last);

  const setPage = (e) =>
    setCurrentPage((prevState) => (prevState = e.target.value));

  const setCategories = (e) => {
    let index = chosenCategories.findIndex(
      (index) => index === Number(e.target.value)
    );
    if (e.target.checked && index === -1)
      dispatch(actionCreators.chooseCategories(Number(e.target.value), "add"));
    else if (!e.target.checked && index !== -1)
      dispatch(
        actionCreators.chooseCategories(Number(e.target.value), "remove", index)
      );
    else if (e.target.id === "reset") {
      dispatch(actionCreators.resetChosenCategories());
      dispatch(actionCreators.filterPostsByCategory("reset"));
      setMsg((prevState) => (prevState = false));
      console.log(filteredPostsByCategory)
    } else if (e.target.id === "filter") {
      dispatch(actionCreators.filterPostsByCategory("reset"));
      dispatch(actionCreators.filterPostsByCategory("market"));
      setMsg((prevState) => (prevState = true));
    }
  };

  useEffect(() => {
    return () => {
      dispatch(actionCreators.resetChosenCategories());
      dispatch(actionCreators.filterPostsByCategory("reset"));
    };
  }, []);
  console.log(filteredPostsByCategory.length);
  const closeMsg = () => {
    setMsg((prevState) => (prevState = false));
  }

  return (
    <div className={styles.container}>
      {msg && !filteredPostsByCategory.length ? (
        <div className={styles.msgCont}>
          <h1 className={styles.msg}>
            No se encontraron productos pero te mostramos todos de nuevo
          </h1>
          <h1 className={styles.close} onClick={closeMsg}>X</h1>
        </div>
      ) : null}
      <div className={styles.Market}>
        <Categories
          categories={categories}
          setCategories={setCategories}
          chosenCategories={chosenCategories}
        />
        <Products products={finalPostsToShow} />
      </div>
      <div className={styles.Paginate}>
        {/* <button
          onClick={(e) =>
            currentPage > 1 && setCurrentPage((prev) => currentPage - 1)
          }
        >
          Prev
        </button> */}
        <Paginate totalPages={totalPages} setPage={setPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        {/* <button
          onClick={(e) =>
            currentPage < totalPages &&
            setCurrentPage((prev) => currentPage + 1)
          }
        >
          Next
        </button> */}
      </div>
    </div>
  );
};
export default Market;
