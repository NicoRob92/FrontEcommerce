import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import ReviewBar from './ReviewBar';
import ReviewCard from './ReviewCard';
import st from './_Review.module.scss'
import ReviewForm from './ReviewForm';
import { getReview, getUsers } from '../../ducks/actions/actionCreators'

const Review = ({ ProductId }) => {
    const dispatch = useDispatch()
    const reviewsL = useSelector((state) => state.review.pureReviews)

    const [order, setOrder] = useState('')
    let token = localStorage.getItem('token')
    useEffect(() => {
        dispatch(getReview(ProductId, token))
        dispatch(getUsers(token))
    }, [dispatch])
    let reviews = reviewsL.slice(0,2)
    return (
        <div className={st.container}>

            <div className={st.btns}>
                <ReviewBar Order={setOrder} />
            </div>
            <div>
                {reviews ? (
                    reviews.map((e) => {
                        return <ReviewCard key={e.id} description={e.description} rating={e.rating} name={e.author} />;
                    })
                ) : (
                    <div className={st.cardB}>
                        <div className={st.titleCard}>
                            <h5>
                                This product does not have any review yet
                            </h5>
                        </div>
                        <p className="card-text">
                            Hey! Be the first one to provide a review for this product, you
                            will be able to do it after your purchase.
                        </p>
                    </div>
                )}
            </div>
            <div className={st.submitReview}>
                <ReviewForm key={ProductId} ProductId={ProductId} token={token} reviews={reviewsL} />
            </div>
        </div>
    )
};

export default Review;
