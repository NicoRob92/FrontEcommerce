import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmailAddress from "../EmailAddress/EmailAddress";
import {api} from '../../credentials'
import { setAmount } from "../../helpers/setAmoun";

import CartItem from "./CartItem";

import styles from "./_Cart.module.scss";
import * as actionCreators from "../../ducks/actions/actionCreators"

const Cart = ({
  showCart,
  setShowCart,
  cartState,
  removePost,
  incrementQuantity,
  decrementQuantity,
}) => {
  const [logginStatus, setLogginStatus] = useState(false);
  const [payLink, setPayLink] = useState(null);
  const [postsLength, setPostsLength] = useState(false);
  const amount = useSelector(state => state.reducer.amount)

  const dispatch = useDispatch()

  useEffect(()=>{
    setAmount(dispatch,actionCreators)
  },[])


  const cart = useRef(null);
  useEffect(() => {
    if (!showCart) return cart.current.classList.add(`${styles.closed}`);
    return cart.current.classList.remove(`${styles.closed}`);
  });

  useEffect(() => {
    let postsInLS = JSON.parse(localStorage.getItem("posts"));
    postsInLS?.item?.length
      ? setPostsLength((prevState) => (prevState = true))
      : setPostsLength((prevState) => (prevState = false));
  });
  const payLinkGenerator = (e, email, address) => {
    if (!postsLength) return;
    let loggin = Boolean(localStorage.getItem("logged"))
    if(!loggin) return setLogginStatus(false)
    if(loggin) setLogginStatus(true)
    let postsInLS = JSON.parse(localStorage.getItem("posts"));
    postsInLS.payer.address.street_name = address;
    postsInLS.payer.email = email;

    fetch(`${api}checkout`, {

      method: "POST",
      body: JSON.stringify(postsInLS),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200 && res.statusText === "OK") return res;
      })
      .then((res) => res.json())
      .then((res) => {
        setPayLink((prevState) => (prevState = res.res));
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
    {console.log("me renderizo")}
      <div className={styles.cartContainer}>
        <section className={styles.cart} ref={cart}>
          <div>
            <input
              type="button"
              value="X"
              onClick={() => setShowCart(false)}
              className={styles.close}
            />
          </div>
          <div className={styles.title}>
            <h1>Tu carrito</h1>
            
          </div>
          <div className={styles.amount}>
            <h5>Tu total: ${amount}</h5>
          </div>
          <div className={styles.title}>
            
          </div>
          <div className={styles.cartList}>
            {cartState?.item?.map((post) => (
              <CartItem
                key={post.id}
                name={post.title}
                id={post.id}
                quantity={post.quantity}
                decrementQuantity={decrementQuantity}
                incrementQuantity={incrementQuantity}
                removePost={removePost}
              />
            ))}
            {postsLength ? (
              <EmailAddress
                logginStatus={logginStatus}
                payLinkGenerator={payLinkGenerator}
                payLink={payLink}
              />
            ) : null}
          </div>
        </section>
      </div>
    </>
  );
};

export default Cart;
