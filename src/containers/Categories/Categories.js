import { useLocation } from 'react-router-dom';

import Categorie from '../../components/Categorie/Categorie';
import FilterReset from '../../components/Filters/FilterReset';
import FilterSubmit from '../../components/Filters/FilterSubmit';

import styles from './_Categories.module.scss';

const Categories = ({ categories, setCategories, chosenCategories }) => {
  const location = useLocation();
  return (
    <div className={styles.categoriesContainer} id="categories">
      <form>
        {categories?.map((e) => (
          <Categorie
            key={e.id}
            id={e.id}
            name={e.name}
            setCategories={setCategories}
            chosenCategories={chosenCategories}
          />
        ))}
       
          <FilterReset setCategories={setCategories} />      
          <FilterSubmit setCategories={setCategories} />
     
      </form>
    </div>
  );
};

export default Categories;
