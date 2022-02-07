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
  const postsByName = useSelector(state => state.reducer.postsByName)
  const filteredPostByCategory = useSelector(state => state.reducer.filteredPostByCategory)
  console.log(filteredPostByCategory)

  const toShow = filteredPostByCategory.length ? filteredPostByCategory : postsByName

  // let arrayId = [];
  useEffect(()=>{
    dispatch(actionCreators.getPostsByName(name))
  },[name])

  

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
    element ? element?.classList.add(`${styles.categories}`) : element?.classList.remove(`${styles.categories}`);
  }, [name]);

  const setCategories = (e) => {
    const target = e.target;
    let index = chosenCategories.findIndex((e) => e === target.id);

    if (target.checked && index === -1) {
      dispatch(actionCreators.chooseCategories(target.id, "add category"));
    } 
    else if (!target.checked && index !== -1) {
      dispatch(actionCreators.chooseCategories(target.id, "remove category", index));
    } 
    else if (target.id === "reset-chosenCategories")
      dispatch(actionCreators.resetCategories());

    else if (target.id === "search")
      dispatch(actionCreators.filterPostByCategory("search"));
  };

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
