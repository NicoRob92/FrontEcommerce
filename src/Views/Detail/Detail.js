import { useEffect } from "react";
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
  const postById = useSelector((state) => state.reducer.postById);

  useEffect(() => {
    dispatch(actionCreators.getPostById(id));
    JSON.stringify(localStorage.setItem("lastPost", id));
  }, [dispatch, id]);

  return (
    <div className={styles.container}>
      <Card className={styles.detail_container}>
        {postById.Images?.length > 0 ? (
          <DetailLeftCard postById={postById} />
        ) : null}
        {postById ? <DetailRightCard postById={postById} /> : null}
        {postById ? <Purchase postById={postById} /> : null}
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
