import { useEffect } from "react";
import styles from "./_CheckoutPending.module.scss"



const CheckoutPending = ({time}) => {
  useEffect(()=>{
    localStorage.removeItem('posts') 
   })
 
   return (
    <div className={styles.Container}>
      <div className={styles.message}>La compra se esta procesando</div>
      <div>{`Redireccionando en ${time}`}</div>
    </div>
  );;
};

export default CheckoutPending;
