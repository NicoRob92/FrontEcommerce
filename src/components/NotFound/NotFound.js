import styles from './_NotFound.module.scss'
const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imagen}>
    
      </div>
      <div className={styles.parrafo}>
        <h1>No hay publicaciones que coincidan con tu búsqueda.</h1>
        <ul>
          <li>Revisá la ortografía de la palabra.</li>
          <li>Utilizá palabras más genéricas o menos palabras.</li>
          <li>Navegá por las categorías para encontrar un producto similar</li>
        </ul>
      </div>
    </div>
  );
};

export default NotFound