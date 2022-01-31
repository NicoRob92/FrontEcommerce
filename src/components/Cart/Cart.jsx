import { useRef, useEffect, useState } from "react";

import CartItem from "./CartItem";

import styles from "./Cart.module.scss";

const Cart = ({
  showCart,
  setShowCart,
  cartState,
  removePost,
  incrementQuantity,
  decrementQuantity,
}) => {
  const [redirection, setRedirection] = useState(null);
  console.log(cartState);

  const cart = useRef(null);
  useEffect(() => {
    if (!showCart) return cart.current.classList.add(`${styles.closed}`);
    return cart.current.classList.remove(`${styles.closed}`);
  });

  let checkLength = JSON.parse(localStorage.getItem("posts"));

  const sendCheckout = () => {
    if (!checkLength) return;
    fetch("http://localhost:4000/api/checkout", {
      method: "POST",
      body: localStorage.getItem("posts"),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200 && res.statusText === "OK") return res;
      })
      .then((res) => res.json())
      .then((res) => {
        setRedirection((prevState) => (prevState = res.res));
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
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
            <div>
              <div>
                <input type="button" value="comprar" onClick={sendCheckout} />
              </div>
              <div>
                {redirection ? (
                  <a href={redirection}>
                    Seguro que quieres proceder con compra?
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Cart;
