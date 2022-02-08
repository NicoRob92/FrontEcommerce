import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Post from "../../containers/Post/Post";
import Categories from "../../containers/Categories/Categories";
import styles from "./_Search.module.scss";
import NotFound from "../../components/NotFound/NotFound";

import * as actionCreators from "../../ducks/actions/actionCreators";

const Search = () => {
  const dispatch = useDispatch();
  const { name } = useParams();

  const categories = useSelector((state) => state.reducer.categories);
  const chosenCategories = useSelector((state) => state.reducer.chosenCategories);
  const postsByName = useSelector(state => state.reducer.postsByName.filter(post => post.postStatus === 'Activo'))
  const filteredPostByCategory = useSelector(state => state.reducer.filteredPostByCategory)
  console.log(filteredPostByCategory)

  const toShow = filteredPostByCategory?.length ? filteredPostByCategory : postsByName

 
  useEffect(() => {
    dispatch(actionCreators.getPostsByName(name));
  }, [name]);

  // let categoriess = filter && filter?.map((e) => e.Categories);
  // let categoriesId = categories?.flat().map((e) => e.id);
  // let id = new Set(categoriesId);
  // for (const num of id) {
  //   arrayId.push(num);
  // }
  // let arrayCategory = [];
  // arrayId.forEach((e) => arrayCategory.push(categories.filter((x) => x.id === e)));

  // useEffect(() => {
  //   setCategory(arrayCategory.flat());
  // }, [categories]);
  useEffect(() => {
    let element = document.getElementById("categories");
    element
      ? element?.classList.add(`${styles.categories}`)
      : element?.classList.remove(`${styles.categories}`);
  }, [name]);
  console.log(filteredPostByCategory)

  const setCategories = (e) => {
    let index = chosenCategories.findIndex((index) => index === Number(e.target.value));
    if (e.target.checked && index === -1) dispatch(actionCreators.chooseCategories(Number(e.target.value), "add"));
    else if (!e.target.checked && index !== -1) dispatch(actionCreators.chooseCategories(Number(e.target.value), "remove", index));
    else if (e.target.id === "reset") dispatch(actionCreators.resetCategories());
    else if (e.target.id === "filter") dispatch(actionCreators.filterPostsByCategory("search"));
  };

  useEffect(() => {
    return () => {
      dispatch(actionCreators.resetCategories());
    };
  }, []);

  return (
    <div className={styles.container}>
      <Categories
        categories={categories}
        setCategories={setCategories}
        chosenCategories={chosenCategories}
      />

      {postsByName?.length > 0 ? <Post array={toShow} /> : <NotFound />}
    </div>
  );
};

export default Search;
