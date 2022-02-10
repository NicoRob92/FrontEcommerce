import styles from "./_CartItem.module.scss";

import * as actionCreators from "../../ducks/actions/actionCreators";

const CartItem = ({
  name,
  id,
  decrementQuantity,
  incrementQuantity,
  removePost,
  quantity,
  price,
}) => {
  return (
    <div className={styles.item}>
      <div className={styles.cont}>
        <input className={styles.button}id={id} type={"button"} value={"X"} onClick={removePost} />
      </div>
      <div className={styles.cont}>
        <h5 className={styles.title}>{name}</h5>
      </div>
      <div>
        <p>Total: $ {quantity * price} </p>
      </div>
      <div>
        <input
          id={id}
          type={"button"}
          value={"+"}
          onClick={incrementQuantity}
        />
        <input
          id={id}
          type={"button"}
          value={"-"}
          onClick={decrementQuantity}
        />
      </div>
      <div>
        <p>{quantity}</p>
      </div>
    </div>
  );
};

export default CartItem;
