import { useEffect,useState } from "react";
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
  const [QorR , setQorR]= useState({
    tab:"review"
  })
  const { id } = useParams();
  const dispatch = useDispatch();
  const postById = useSelector((state) => state.reducer.postById);

  useEffect(() => {
    dispatch(actionCreators.getPostById(id));
    JSON.stringify(localStorage.setItem("lastPost", id));
  }, [dispatch, id]);
  function handleQorR(e) {
   setQorR({
       tab:e.target.value
   })
  }
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
      <div>
          <h4>Reseñas y preguntas</h4>
          <hr/>
      </div>

      <div >
        <button value="review" name="review" onClick={handleQorR} className={QorR.tab=="review"?"btn btn-primary":"mx-1 p-2 card d-inline"}>Reseñas</button>
        <button value="question" onClick={handleQorR} className={QorR.tab=="question"?"btn btn-primary":"mx-1 p-2 card d-inline"}>Preguntas</button>
      </div>
      {
        QorR.tab=="review"?
        <div className={styles.review_container}>
          <Review ProductId={id} />
        </div>
        :
        <div className={styles.questions_container}>
          <Questions  PostId={id}/>
        </div>
      }


    </div>
  );
};

export default CardDetail;
