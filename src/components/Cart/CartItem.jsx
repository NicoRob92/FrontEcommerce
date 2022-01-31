import styles from "./CartItem.module.scss";

const CartItem = ({ name, id, decrementQuantity, incrementQuantity, removePost, quantity }) => {
  return (
    <div className={styles.item}>
      <div>
        <input id={id} type={"button"} value={"X"} onClick={removePost}/>
      </div>
      <div>
        <h5>{name}</h5>
      </div>
      <div>
        <span>{quantity}</span>
        <input id={id} type={"button"} value={"+"} onClick={incrementQuantity}/>
        <input id={id} type={"button"} value={"-"} onClick={decrementQuantity}/>
      </div>
    </div>
  );
};

export default CartItem;
