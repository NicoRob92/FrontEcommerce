import styles from "./_CartItem.module.scss";

import * as actionCreators from "../../ducks/actions/actionCreators"

const CartItem = ({ name, id, decrementQuantity, incrementQuantity, removePost, quantity, price }) => {


  return (
    <div className={styles.item} >
      <div>
        <input id={id} type={"button"} value={"X"} onClick={removePost}/>
      </div>
      <div>
        <h5>{name}</h5>
        <span>Total: $ {quantity * price} </span>
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
