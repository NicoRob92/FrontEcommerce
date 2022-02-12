import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './_Home.module.scss';
import Carrousel from '../../containers/Carrousel/Carrousel';
import CarrouselOfertas from '../../containers/CarrouselOfertas/CarrouselOfertas';
import { Link } from 'react-router-dom';
import { getOrders, getUserById } from '../../ducks/actions/actionCreators';

const Home = () => {
  const posts = useSelector((state) =>
    state.reducer.posts.filter((post) => post.postStatus === 'Activo')
  );
  const userId = localStorage.getItem('userId');
  const user = useSelector((state) => state.user.user);
  const images = ['1', '2', '3', '4', '5'];
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  let recientes = posts.map((e) => e);
  recientes = recientes.sort((a, b) => b.id - a.id);

  let destacados = posts.map((e) => e);
  destacados = destacados.sort((a, b) => b.ratingProm - a.ratingProm);
  useEffect(() => {
    let element = document.getElementById('categories');
    element
      ? element?.classList.add(`${styles.categories}`)
      : element?.classList.remove(`${styles.categories}`);
    dispatch(getOrders(token));
    dispatch(getUserById(userId, token));
  }, []);
  return (
    <div className={styles.container}>
      {/* Navbar */}

      <div className={styles.carrousel}>
        {/* Carousel  component */}
        <CarrouselOfertas cards='1' arr={images} />
      </div>

      <div className={styles.carrousel}>
        {/* Carousel  component */}
        <div className={styles.post}>
          <h1>Productos Destacados</h1>
          <Link to='/market' className={styles.link}>
            Ver todos
          </Link>
        </div>
        <div className={styles.containerCar}>
        <Carrousel cards='5' arr={destacados} />
        </div>
      </div>

      <span className={styles.separadorH} />
      <div className={styles.carrousel}>
        {/* Carousel  component */}

        <div className={styles.post}>
          <h1>Productos Recientes</h1>
          <Link to='/market' className={styles.link}>
            Ver todos
          </Link>
        </div>
        <div className={styles.containerCar}>
        <Carrousel cards='5' arr={recientes} />
        </div>
      </div>

      {/* Footer */}
    </div>
  );
};

export default Home;
