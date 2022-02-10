import styles from './_NotFound.module.scss'
import img from "../../Assets/3.png";
const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imagen}>
        <img src={img} />
      </div>
      <div className={styles.parrafo}>
        <h1>404</h1>
        <p>Verifica que la URL sea correcta</p>
      </div>
    </div>
  );
};

export default NotFound