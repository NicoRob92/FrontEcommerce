import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Searchbar from '../../components/Searchbar/Searchbar';
import Profile from '../../components/Profile/Profile';
import Cart from '../../components/Cart/Cart';

import * as actionCreators from '../../ducks/actions/actionCreators';

import styles from './_Navbar.module.scss';

const Navbar = () => {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const cart = useSelector((state) => state.reducer.cart);
  const logged = localStorage.getItem('logged')

  const show = () => {
    setShowLogin(!showLogin);
  };

  const removePost = (e) => {
    let id = Number(e.target.id);
    let posts = JSON.parse(localStorage.getItem("posts"));
    posts.item = posts?.item?.filter((e) => e.id !== Number(id));
    dispatch(actionCreators.setCart(posts));
    localStorage.setItem("posts", JSON.stringify(posts));

  };

  const incrementQuantity = (e) => {
    let id = Number(e.target.id);
    let posts = JSON.parse(localStorage.getItem("posts"));
    posts.item.forEach((e) => {
      e.id === id && e.stock > e.quantity && e.quantity++;
    });
    dispatch(actionCreators.setCart(posts));
    localStorage.setItem("posts", JSON.stringify(posts));
  };

  const decrementQuantity = (e) => {
    let id = Number(e.target.id);
    let posts = JSON.parse(localStorage.getItem("posts"));
    posts.item.forEach((e) => {
      e.id === id && e.quantity > 1 && e.quantity--;
    });
    dispatch(actionCreators.setCart(posts));
    localStorage.setItem("posts", JSON.stringify(posts));
  };
  

  return (
    <div className={styles.navbar}>
      {/* Ecommerce */}
      <div className={styles.container}>
        <Link to={"/"} className={styles.tittle}>
          <h2>Ecommerce</h2>
        </Link>
      </div>
      <div className={styles.container}>
        <Link to={"/market"} className={styles.market}>
          <h4>Market</h4>
        </Link>

      </div>
      {/* Searchbar */}
      <div className={styles.container}>
        <Searchbar className={styles.searchbar} />
      </div>
      {/* Profile */}
      {showLogin === false && !logged ? (
        <div className={styles.container}>
          <button onClick={show} className={styles.login}>Login</button>
          <div className={styles.cart}>
            <button onClick={() => setShowCart(!showCart)}>
              <svg
                width="33"
                height="21"
                viewBox="0 0 33 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 0.359009L15 13.359H29L33 1.35901V0.359009H23V1.35901H31.9459L28.2792 12.359H15.6868L10.9333 2.97129e-05L10 0.359009ZM10 0.359009H0V1.35901H10V0.359009ZM17.5 19.359C18.3284 19.359 19 18.6874 19 17.859C19 17.0306 18.3284 16.359 17.5 16.359C16.6716 16.359 16 17.0306 16 17.859C16 18.6874 16.6716 19.359 17.5 19.359ZM17.5 20.359C18.8807 20.359 20 19.2397 20 17.859C20 16.4783 18.8807 15.359 17.5 15.359C16.1193 15.359 15 16.4783 15 17.859C15 19.2397 16.1193 20.359 17.5 20.359ZM28 17.859C28 18.6874 27.3284 19.359 26.5 19.359C25.6716 19.359 25 18.6874 25 17.859C25 17.0306 25.6716 16.359 26.5 16.359C27.3284 16.359 28 17.0306 28 17.859ZM29 17.859C29 19.2397 27.8807 20.359 26.5 20.359C25.1193 20.359 24 19.2397 24 17.859C24 16.4783 25.1193 15.359 26.5 15.359C27.8807 15.359 29 16.4783 29 17.859Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>

          <NavLink to="/register" className={styles.register}>
            Register
          </NavLink>

          <Cart
            showCart={showCart}
            setShowCart={setShowCart}
            cartState={cart}
            removePost={removePost}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
          />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.profile}>
            <Profile show={show} />
          </div>
          <div className={styles.cart}>
            <button onClick={() => setShowCart(!showCart)}>
              <svg
                width="33"
                height="21"
                viewBox="0 0 33 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 0.359009L15 13.359H29L33 1.35901V0.359009H23V1.35901H31.9459L28.2792 12.359H15.6868L10.9333 2.97129e-05L10 0.359009ZM10 0.359009H0V1.35901H10V0.359009ZM17.5 19.359C18.3284 19.359 19 18.6874 19 17.859C19 17.0306 18.3284 16.359 17.5 16.359C16.6716 16.359 16 17.0306 16 17.859C16 18.6874 16.6716 19.359 17.5 19.359ZM17.5 20.359C18.8807 20.359 20 19.2397 20 17.859C20 16.4783 18.8807 15.359 17.5 15.359C16.1193 15.359 15 16.4783 15 17.859C15 19.2397 16.1193 20.359 17.5 20.359ZM28 17.859C28 18.6874 27.3284 19.359 26.5 19.359C25.6716 19.359 25 18.6874 25 17.859C25 17.0306 25.6716 16.359 26.5 16.359C27.3284 16.359 28 17.0306 28 17.859ZM29 17.859C29 19.2397 27.8807 20.359 26.5 20.359C25.1193 20.359 24 19.2397 24 17.859C24 16.4783 25.1193 15.359 26.5 15.359C27.8807 15.359 29 16.4783 29 17.859Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
          <Cart
            showCart={showCart}
            setShowCart={setShowCart}
            cartState={cart}
            removePost={removePost}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
