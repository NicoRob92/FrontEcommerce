import Categorie from "../../components/Categorie/Categorie";
import FilterReset from "../../components/Filters/FilterReset";
import FilterSubmit from "../../components/Filters/FilterSubmit";

import styles from "./_Categories.module.scss";

const Categories = ({ categories, setCategories, chosenCategories }) => {
  return (
    <form className={styles.categoriesContainer} id="categories">
      <div className={styles.categories}>
        <br></br>
        {categories?.map((e) => (
          <Categorie
            key={e.id}
            id={e.id}
            name={e.name}
            setCategories={setCategories}
            chosenCategories={chosenCategories}
          />
        ))}
        <div className={styles.button}>
          <FilterReset setCategories={setCategories} />
          <FilterSubmit setCategories={setCategories} />
        </div>
      </div>
    </form>
  );
};

export default Categories;
