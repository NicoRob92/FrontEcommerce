import styles from './__OrderHistoryAdmin.module.scss';
import {useSelector} from 'react-redux';


export const OrderHistoryAdmin = () => {
  const Users = useSelector((state) => state.reducer.users)
  console.log(Users)
  return (
    <div className={styles.orderHistory}>
      <div className={styles.grid}>
        <div className={styles.boxOne}>Lista de Ordenes</div>
        <div className={styles.boxTwo}>
          <div className={styles.title}>Nº de Orden</div>
          <div className={styles.item}>43534</div>
        </div>
        <div className={styles.boxThree}>
          <div className={styles.title}>Usuario</div>
          <div className={styles.item}>NicoRob92</div>

        </div>
        <div className={styles.boxFour}>
          <div className={styles.title}>Link</div>
          <div className={styles.item}><a href="http://ecommerce.netlify.ap/user/nicorob92/post?id=43534">http://ecommerce.netlify.ap/user/nicorob92/post?id=43534</a></div>

        </div>
        <div className={styles.boxFive}>
          <div className={styles.title}>Fecha</div>
          <div className={styles.item}>28/01/2022</div>

        </div>
        <div className={styles.boxSix}>
          <div className={styles.title}>Actions</div>
          <div className={styles.item}>43534</div>
        </div>
      </div>
    </div>
  );
};
