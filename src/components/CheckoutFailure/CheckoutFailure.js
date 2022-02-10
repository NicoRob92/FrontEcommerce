import styles from "./_CheckoutFailure.module.scss";

const CheckoutFailure = ({time}) => {
  return (
    <div className={styles.Container}>
      <div className={styles.message}>Algo ha salido mal en la compra</div>
      <div>{`Redireccionando en ${time}`}</div>
    </div>
  );
};

export default CheckoutFailure;
