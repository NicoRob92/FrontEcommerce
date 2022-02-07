import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import DetailLeftCard from "../../components/DetailLeftCard/DetailLeftCard";
import DetailRightCard from "../../components/DetailRightCard/DetailRightCard";
import Purchase from "../../components/Purchase/Purchase";
import Review from "../../components/Review/Review";
import Questions from "../../components/Questions/Questions";
import Card from "@mui/material/Card";

import * as actionCreators from "../../ducks/actions/actionCreators";

import styles from "./_Detail.module.scss";

const CardDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [logginStatus, setLogginStatus] = useState(true);
  const [confirmBuy, setConfirmBuy] = useState(false)
  const [address, setAddress] = useState("");
  const [payLink,setPayLink] = useState(null)
  const postById = useSelector((state) => state.reducer.postById);

  JSON.stringify(localStorage.setItem("lastPost", postById.id))


  useEffect(() => {
    dispatch(actionCreators.getPostById(id));
  }, [dispatch, id]);

  const checkDirectBuy = () => {
    setConfirmBuy(prevState => prevState = true)
    let logged = Boolean(localStorage.getItem("logged"))
    if(logged) setLogginStatus(prevState => prevState = logged)
    if(!logged) setLogginStatus(prevState => prevState = logged)
  }
  const getAddress = (e) => {
    setAddress((prevState) => (prevState = e.target.value));
  };

  const buyNowFast = (e) => {
    let logged = Boolean(localStorage.getItem("logged"));
    if (!logged) return
    if (logged) {

      fetch("http://localhost:4000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          item: [{
            id: postById.id,
            title: postById.name,
            description: postById.description,
            quantity: Number(document.getElementById("quantity").value),
            unit_price: parseFloat(postById.price),
            stock: postById.stock,
          }],
          payer: {
            id: Number(localStorage.getItem("userId")),
            email: localStorage.getItem("email"),
            address: {
              street_name: address
            }
          }
        })
      })
      .then((res) => {
        if (res.status === 200 && res.statusText === "OK") return res;
      })
      .then(res => res.json())
      .then(res => {
        setPayLink(prevState => prevState = res.res)
      })
      .catch(res => console.log(res))
    }
  };

  const addPostToCart = () => {
    let posts = JSON.parse(localStorage.getItem("posts")) || {
      item: [],
      payer: {
        id: Number(localStorage.getItem("userId")),
        email: localStorage.getItem("email"),
        address: {
          street_name: null
        }
      },
    };
    
    
    
    const post = {
      id: postById.id,
      title: postById.name,
      stock: postById.stock,
      description: postById.description,
      unit_price: parseFloat(postById.price),
      quantity: Number(document.getElementById("quantity").value),
    };
    // si no existe ningun post en el array de item lo agregamos directamente
    if (posts.item.length === 0) {
      posts.item.push(post);
      localStorage.setItem("posts", JSON.stringify(posts));
    }
    // buscamos si ya existe un post igual en el array si existe lo reemplazamos
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
    // si se encontro el mismo post lo intrpducimos al carrito
    if (check) localStorage.setItem("posts", JSON.stringify(posts));
    // si no se encontro el mismo post lo pusheamos al array de item y lo metemos al carrito
    if (!check) {
      posts.item.push(post);
      localStorage.setItem("posts", JSON.stringify(posts));
    }
    //despachamos una accion que va setear el estado global del carrito con todos los post
    dispatch(actionCreators.setCart(JSON.parse(localStorage.getItem("posts"))));
  };
  return (
    <div className={styles.container}>
      <Card className={styles.detail_container}>
        {postById.Images?.length > 0 ? (<DetailLeftCard postById={postById} />) : null}
        {postById ? <DetailRightCard postById={postById} /> : null}
        {postById ? (
          <Purchase
            postById={postById}
            logginStatus={logginStatus}
            address={address}
            confirmBuy={confirmBuy}
            payLink={payLink}
            checkDirectBuy={checkDirectBuy}
            getAddress={getAddress}
            buyNowFast={buyNowFast}
            addPostToCart={addPostToCart}
          />
        ) : null}
        {/* Review section */}
      </Card>
      <div className={styles.review_container}>
        <Review ProductId={id} />
      </div>
      <div className={styles.questions_container}>
        <Questions Questions={postById.Questions} PostId={id}/>
      </div>
    </div>
  );
};

export default CardDetail;
