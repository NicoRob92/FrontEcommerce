import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Post from "../../containers/Post/Post";
import Categories from "../../containers/Categories/Categories";
import styles from "./_Search.module.scss";
import { Loader } from "../../components/Loader/loader";
import NotFound from "../../components/NotFound/NotFound";
import * as actionCreators from "../../ducks/actions/actionCreators";

const Search = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  const categories = useSelector((state) => state.reducer.categories);
  const chosenCategories = useSelector((state) => state.reducer.chosenCategories);
  const postsByName = useSelector((state) => state.reducer.postsByName);
  const filteredPostsByCategory = useSelector((state) => state.reducer.filteredPostsByCategory);

  const toShow = filteredPostsByCategory.length ? filteredPostsByCategory : postsByName;

  useEffect(() => {
    dispatch(actionCreators.filterPostsByCategory('reset'))
    dispatch(actionCreators.getPostsByName(name));
  }, [name]);

  useEffect(() => {
    let element = document.getElementById("categories");
    element
      ? element?.classList.add(`${styles.categories}`)
      : element?.classList.remove(`${styles.categories}`);
  }, [name]);

  const setCategories = (e) => {
    let index = chosenCategories.findIndex((index) => index === Number(e.target.value));
    if (e.target.checked && index === -1) dispatch(actionCreators.chooseCategories(Number(e.target.value), "add"));
    else if (!e.target.checked && index !== -1) dispatch(actionCreators.chooseCategories(Number(e.target.value), "remove", index));
    else if (e.target.id === "reset") dispatch(actionCreators.resetChosenCategories());
    else if (e.target.id === "filter") {
      dispatch(actionCreators.filterPostsByCategory('reset'))
      dispatch(actionCreators.filterPostsByCategory("search"))
    };
  };

  useEffect(() => {
    return () => {
      dispatch(actionCreators.resetChosenCategories());
      dispatch(actionCreators.resetPostByName())
      dispatch(actionCreators.filterPostsByCategory('reset'))
    };
  }, []);

  return (
    <div className={styles.container}>
      <Categories
        categories={categories}
        setCategories={setCategories}
        chosenCategories={chosenCategories}
      />
      {postsByName?.length > 0 && <Post array={toShow} /> }
    </div>
  );
};
export default Search;
