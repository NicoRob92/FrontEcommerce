import { useState } from "react";
import { useDispatch } from "react-redux";
import EmailAddress from "../EmailAddress/EmailAddress";
import * as actionCreators from "../../ducks/actions/actionCreators";
import {api} from '../../credentials'
import { setAmount } from "../../helpers/setAmoun";
import styles from "./_Purchase.module.scss";

const Purchase = ({ postById }) => {
  const dispatch = useDispatch();
  const [logginStatus, setLogginStatus] = useState(false);
  const [directBuy, setDirectBuy] = useState(false);
  const [payLink, setPayLink] = useState(null);
  const logged = localStorage.getItem('logged')

  const checkDirectBuy = () => {
    setDirectBuy((prevState) => (prevState = !prevState));
  };

  const payLinkGenerator = (e, email, address) => {
    const loggin = Boolean(localStorage.getItem('logged'));
    if (!loggin) return setLogginStatus((prevState) => (prevState = loggin));
    if (loggin) {
      console.log(Number(localStorage.getItem('userId')));
      setLogginStatus((prevState) => (prevState = loggin));
      fetch(`${api}checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          item: [
            {
              id: postById.id,
              title: postById.name,
              description: postById.description,
              quantity: Number(document.getElementById('quantity').value),
              unit_price: parseFloat(postById.price),
              stock: postById.stock,
            },
          ],
          payer: {
            id: Number(localStorage.getItem('userId')),
            email: email,
            address: {
              street_name: address,
            },
          },
        }),
      })
        .then((res) => {
          if (res.status === 200 && res.statusText === 'OK') return res;
        })

        .then((res) => res.json())
        .then((res) => {
          setPayLink((prevState) => (prevState = res.res));
        })
        .catch((res) => console.log(res));
    }
  };

  const addPostToCart = () => {
    const posts = JSON.parse(localStorage.getItem('posts')) || {
      item: [],
      payer: {
        id: Number(localStorage.getItem('userId')),
        email: null,
        address: {
          street_name: null,
        },
      },
    };

    const post = {
      id: postById.id,
      title: postById.name,
      description: postById.description,
      quantity: Number(document.getElementById('quantity').value),
      unit_price: parseFloat(postById.price),
      stock: postById.stock,
    };

    if (posts.item.length === 0) {
      posts.item.push(post);
      localStorage.setItem('posts', JSON.stringify(posts));
    }

    let check = false;
    if (posts.item.length !== 0) {
      for (let i = 0; i < posts.item.length; i++) {
        if (posts.item[i].id === post.id) {
          posts.item[i] = post;
          check = true;
          break;
        }
      }
    }

    if (check) localStorage.setItem('posts', JSON.stringify(posts));
    if (!check) {
      posts.item.push(post);
      localStorage.setItem('posts', JSON.stringify(posts));
    }
    dispatch(actionCreators.setCart(JSON.parse(localStorage.getItem("posts"))));
    setAmount(dispatch,actionCreators)
  };

  return (
    <div className={`card ${styles.purchase_info}`}>
        <div className={styles.purchase_content}>
          {!postById.stock ? (
            <h5>Stock: 0</h5>
          ) : (
            <h5>Stock: {postById.stock}</h5>
          )}
        </div>
        <div className={styles.purchase_button}>
          {postById.stock ? (
            <div className={styles.stock}>
              <span>Cantidad:</span>
              <input
                id='quantity'
                type='number'
                defaultValue={1}
                min={1}
                max={postById.stock}
              />
            </div>
          ) : null}
          {postById.stock > 0 ? (
            <div className={styles.compras}>
              <input
                id='addPostToCart'
                type='button'
                value='Añadir al carrito'
                onClick={addPostToCart}
              />
               <input
                id='checkDirectBuy'
                type='button'
                value='Compra directa'
                onClick={checkDirectBuy}
              />
            </div>
          ) : null}
          <div className={styles.email}>
          {directBuy ? (
            <EmailAddress
              payLinkGenerator={payLinkGenerator}
              payLink={payLink}
              logginStatus={logginStatus}
              logged = {logged}
            />
          ) : <h1>Kwik-E-Mart</h1>}
          </div>
         
        </div>
      </div>
);
};

export default Purchase;
