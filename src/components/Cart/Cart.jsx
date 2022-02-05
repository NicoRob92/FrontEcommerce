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
  const [payLink, setPayLink] = useState(null);
  const [logginStatus, setLogginStatus] = useState(null)
  const [address,setAddress] = useState("")
  const [postsState, setPostsState] = useState(false)

  const cart = useRef(null);
  useEffect(() => {
    if (!showCart) return cart.current.classList.add(`${styles.closed}`);
    return cart.current.classList.remove(`${styles.closed}`);
  });

  useEffect(()=>{
    let postsInLS = JSON.parse(localStorage.getItem("posts"))
    postsInLS.item.length ? setPostsState(prevState => prevState = true) : setPostsState(prevState => prevState = false)
  })

  const checkLoggin = () => {
    const loggin = Boolean(localStorage.getItem("logged"))
    if(!loggin) setLogginStatus(prevState => prevState = loggin)
    if(loggin) setLogginStatus(prevState => prevState = loggin)
  }

  const gettingAddress = (e) => {
    setAddress(prevState => prevState = e.target.value)
  }

  const sendCheckout = () => {
    let posts = JSON.parse(localStorage.getItem("posts"));  
    if (!posts.item.length) return;
    posts.payer.address.street_name = address


    fetch("http://localhost:4000/api/checkout", {
      method: "POST",
      body: JSON.stringify(posts),
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
              {postsState ?<div>
                <input type="button" value="Deseas proceder con la compra?" onClick={checkLoggin} />
              </div> : null}
              
              {logginStatus === false ? <p>Debes estar logeado</p> : logginStatus === true ?<input id="address-input" type="text" onChange={gettingAddress} placeholder="Direccion de envio"></input>: null}
              <div>
                {address ? <div><input type="button" onClick={sendCheckout}value="Generar Link de pago"/></div>:null}
                {payLink ? (
                  <a href={payLink}>
                    Pagar
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
