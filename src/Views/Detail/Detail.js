import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import DetailLeftCard from "../../components/DetailLeftCard/DetailLeftCard";
import DetailRightCard from "../../components/DetailRightCard/DetailRightCard";
import Purchase from "../../components/Purchase/Purchase";
import Review from "../../components/Review/Review";
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
  console.log(payLink)
  

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

  let logged = Boolean(localStorage.getItem("logged"));
  const addPostToCart = () => {
    let quantity = document.getElementById("quantity").value;

    let userId = Number(localStorage.getItem("userId"));
    let username = localStorage.getItem("username");
    let email = localStorage.getItem("email");

    let posts = JSON.parse(localStorage.getItem("posts")) || {
      item: [],
      payer: {
        id: userId,
        username,
        email,
      },
    };

    const post = {
      id: postById.id,
      title: postById.name,
      stock: postById.stock,
      description: postById.description,
      unit_price: parseFloat(postById.price),
      quantity: Number(quantity),
    };

    if (posts.item.length === 0) {
      posts.item.push(post);
      localStorage.setItem("posts", JSON.stringify(posts));
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
    if (check) localStorage.setItem("posts", JSON.stringify(posts));

    if (!check) {
      posts.item.push(post);
      localStorage.setItem("posts", JSON.stringify(posts));
    }
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
      <Card className={styles.review_container}>
        <Review ProductId={id} />
      </Card>
    </div>
  );
};

export default CardDetail;
