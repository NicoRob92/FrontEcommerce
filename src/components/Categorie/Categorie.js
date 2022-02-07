import styles from "./_Categorie.module.scss";

const Categorie = ({ id, name, setCategories, chosenCategories}) => {

  return (
    <div className={styles.categorieContainer}>
      <div className={styles.pointer}>
        <input type="checkbox" value={id} id={id} onChange={setCategories}/>
      </div>
      <label htmlFor={name}>{name}</label>
    </div>
  );
};

export default Categorie;
