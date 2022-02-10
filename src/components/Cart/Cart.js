import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EmailAddress from '../EmailAddress/EmailAddress';
import CartItem from './CartItem';

import { api } from '../../credentials';
import { setAmount } from '../../helpers/setAmoun';

import styles from './_Cart.module.scss';
import * as actionCreators from '../../ducks/actions/actionCreators';

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
  const amount = useSelector((state) => state.reducer.amount);
  const dispatch = useDispatch();
  const logged = localStorage.getItem('logged')
  useEffect(() => {
    setAmount(dispatch, actionCreators);
  }, []);

  const cart = useRef(null);
  useEffect(() => {
    if (!showCart) return cart.current.classList.add(`${styles.closed}`);
    return cart.current.classList.remove(`${styles.closed}`);
  });

  useEffect(() => {
    let postsInLS = JSON.parse(localStorage.getItem('posts'));
    postsInLS?.item?.length
      ? setPostsLength((prevState) => (prevState = true))
      : setPostsLength((prevState) => (prevState = false));
  });
  const payLinkGenerator = (e, email, address) => {
    if (!postsLength) return;
    let loggin = Boolean(localStorage.getItem('logged'));
    if (!loggin) return setLogginStatus(false);
    if (loggin) setLogginStatus(true);
    let postsInLS = JSON.parse(localStorage.getItem('posts'));
    postsInLS.payer.address.street_name = address;
    postsInLS.payer.email = email;

    fetch(`${api}checkout`, {
      method: 'POST',
      body: JSON.stringify(postsInLS),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200 && res.statusText === 'OK') return res;
      })
      .then((res) => res.json())
      .then((res) => {
        setPayLink((prevState) => (prevState = res.res));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className={styles.cartContainer}>
      <section className={styles.cart} ref={cart}>
        <div>
          <button onClick={() => setShowCart(false)} className={styles.close}>
            <svg
              width='32'
              height='32'
              viewBox='0 0 32 32'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z'
                stroke='black'
                strokeWidth='2'
                strokeLiterlimit='10'
              />
              <path
                d='M20 12L12 20'
                stroke='black'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M20 20L12 12'
                stroke='black'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
        </div>
        <div className={styles.title}>
          <h1>Tu carrito</h1>
          <hr/>
          <h5>Tu total: ${amount}</h5>
        </div>
        <div className={styles.cartList}>
          <div className={styles.items}>
          {cartState?.item?.map((post) => (
            <CartItem
              key={post.id}
              name={post.title}
              id={post.id}
              quantity={post.quantity}
              price={post.unit_price}
              decrementQuantity={decrementQuantity}
              incrementQuantity={incrementQuantity}
              removePost={removePost}
            />
          ))}
          </div>
          {postsLength ? (
            <EmailAddress
              logginStatus={logginStatus}
              payLinkGenerator={payLinkGenerator}
              payLink={payLink}
              logged ={logged}
            />
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default Cart;
