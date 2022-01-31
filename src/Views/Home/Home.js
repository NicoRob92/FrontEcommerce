import { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./_Home.module.scss";
import Carrousel from "../../containers/Carrousel/Carrousel";
import CarrouselOfertas from "../../containers/CarrouselOfertas/CarrouselOfertas";
import { Link } from "react-router-dom";
const Home = () => {
  const posts = useSelector((state) => state.reducer.posts);
  const images = ["1", "2", "3", "4", "5"];

  useEffect(() => {
    let element = document.getElementById("categories");
    element
      ? element?.classList.add(`${styles.categories}`)
      : element?.classList.remove(`${styles.categories}`);
  });

  return (
    <div className={styles.container}>
      {/* Navbar */}

      <div className={styles.carrousel}>
        {/* Carousel  component */}
        <CarrouselOfertas cards="1" arr={images} />
      </div>
      <span className={styles.separador}></span>

      <div className={styles.carrousel}>
        {/* Carousel  component */}
        <div className={styles.post}>
          <h1>postos Destacados</h1>
          <Link to="/market">Ver todos</Link>
        </div>
        <Carrousel cards="4" arr={posts} />
      </div>
      <span className={styles.separador}></span>

      <div className={styles.carrousel}>
        {/* Carousel  component */}

        <div className={styles.post}>
          <h1>Subastas Destacadas</h1>
          <Link to="/market">Ver todos</Link>
        </div>
        <Carrousel cards="4" arr={posts} />
      </div>

      {/* Footer */}
    </div>
  );
};

export default Home;
