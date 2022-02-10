import { useEffect } from "react";
import styles from "./_CheckoutSuccess.module.scss"

const CheckoutSuccess = ({time}) => {
  useEffect(()=>{
   localStorage.removeItem('posts') 
  })

  return (
    <div className={styles.Container}>
      <div className={styles.message}>La compra se realizo con éxito</div>
      <div>{`Redireccionando en ${time}`}</div>
    </div>
  );;
};

export default CheckoutSuccess;
