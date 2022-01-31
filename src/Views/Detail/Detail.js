import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import DetailLeftCard from "../../components/DetailLeftCard/DetailLeftCard";
import DetailRightCard from "../../components/DetailRightCard/DetailRightCard";
import Purchase from "../../components/Purchase/Purchase";
import Review from "../../components/Review/Review";
import Card from '@mui/material/Card';

import * as actionCreators from "../../ducks/actions/actionCreators";

import styles from "./_Detail.module.scss";

const CardDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const postById = useSelector((state) => state.reducer.postById);
  console.log(postById)

  useEffect(() => {
    dispatch(actionCreators.getPostById(id));
  }, [dispatch, id]);

  const addPostToCart = () => {
    let quantity = document.getElementById("quantity").value;

    let posts = JSON.parse(localStorage.getItem("posts")) || {
      item: [],
      id: 1, //falta conseguir id de usuario
    };

    const post = {
      id: postById.id,
      title: postById.name,
      stock: postById.stock,
      description: postById.description,
      unit_price: parseFloat(postById.price),
      quantity: Number(quantity)
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
        {postById.Images?.length > 0 ? <DetailLeftCard postById={postById} /> : null}
        {postById ? <DetailRightCard postById={postById} /> : null}
        {postById ? <Purchase postById={postById} addPostToCart={addPostToCart} /> : null}
        {/* Review section */}
      </Card>
      <Card className={styles.review_container}>
      <Review ProductId={id} />
      </Card>
    </div>
  );
};

export default CardDetail;
