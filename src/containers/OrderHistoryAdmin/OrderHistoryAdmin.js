import styles from './__OrderHistoryAdmin.module.scss';
import {useSelector , useDispatch} from 'react-redux';
import {useEffect} from 'react'
import {getOrders} from '../../ducks/actions/actionCreators'

export const OrderHistoryAdmin = () => {
  const token = localStorage.getItem('token')
  const orders = useSelector((state) => state.reducer.orders)
  const dispatch = useDispatch()
  console.log(orders)

  useEffect(() => {
    dispatch(getOrders(token))
  },[])
 
  return (
    <div className={styles.orderHistory}>
      <div className={styles.grid}>
        <div className={styles.boxOne}>Lista de Ordenes</div>
        <div className={styles.boxTwo}>
          <div className={styles.title}>Nº de Orden</div>
         {orders? orders.map(e => <div className={styles.item}>{e.id}</div>) : null}
        </div>
        <div className={styles.boxThree}>
          <div className={styles.title}>Usuario</div>
          {orders? orders.map(e => <div className={styles.item}>{e.user.id}</div>) : null}

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
