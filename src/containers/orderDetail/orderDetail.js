import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../credentials';
import axios from 'axios';
import { useParams,useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOrderbyId } from '../../ducks/actions/actionCreators';
import styles from './_orderDetail.module.scss';

export const OrderDetail = () => {
  const token = localStorage.getItem('token');
  const [username, setUserName] = useState({
    username: localStorage.getItem('username'),
  });
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const orden = useSelector((state) => state.orderUser.orderUserDetail);
  useEffect(() => {
    dispatch(getOrderbyId(id, username, token));
  }, []);

  
    let suma= 0;
    orden?.OrderDetails?.forEach((e) => suma = suma+(e.Post.price * e.amount))
  
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={(e) => history.push('/compras')}>Back</button>
      <div className={styles.grid}>
        <div className={styles.div1}>
          <div className={styles.title}>Detalle de orden Nº {orden.id}</div>
        </div>
        <div className={styles.div2}>
          <div className={styles.title}>id Productos</div>
          {orden.OrderDetails?.map(e => <div className={styles.item}>{e.Post.id}</div>)}
        </div>

        <div className={styles.div3}>
          <div className={styles.title}>Detalle del producto</div>
          {orden.OrderDetails?.map(e => <div className={styles.item}>{e.Post.name}</div>)}

        </div>
        <div className={styles.div4}>
          <div className={styles.title}>Cantidad</div>
          {orden.OrderDetails?.map(e => <div className={styles.item}>{e.amount}</div>)}

        </div>
        <div className={styles.div5}>
          <div className={styles.title}>Sub-Total</div>
          {orden.OrderDetails?.map(e => <div className={styles.item}>$ {Number(e.Post.price)*Number(e.amount)}</div>)}

        </div>
        <div className={styles.div6}>
          <div className={styles.title}>Datos</div>
          <div className={styles.direccion}>
          <div className={styles.estado}>Direccion de envio: <p>{orden?.delivery_adress}</p></div>
          <div className={styles.estado}>Fecha de creacion: <p> {orden?.createdAt?.substring(0,10)}</p></div>
          </div>
          
          <div className={styles.estado}>Estado de la orden: <p>{orden?.status}</p></div>
        </div>
        <div className={styles.div7}>
          <div className={styles.title}>Total</div>
          <div>$ {suma}</div>
        </div>
      </div>
    </div>
  );
};
