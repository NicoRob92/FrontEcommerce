import { useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ReviewBar from './ReviewBar';
import ReviewCard from './ReviewCard';
import st from './_Review.module.scss'
import ReviewForm from './ReviewForm';
import {getReview, getUsers} from '../../ducks/actions/actionCreators'

const Review = ({ProductId}) => {
    const dispatch = useDispatch()
    const reviews = useSelector((state) => state.review.reviews)

    let theme = createTheme();
    theme = responsiveFontSizes(theme);
    let token = localStorage.getItem('token')

    useEffect(() => {
        dispatch(getReview(ProductId, token))
        dispatch(getUsers(token))
    }, [dispatch])

    return (
        <div className={st.container}>
            <div>
                <ThemeProvider theme={theme}>
                    <Typography className={st.title} variant="h4">Ratings and reviews</Typography>
                </ThemeProvider>
            </div>
            <div className={st.btns}>
                <ReviewBar />
            </div>
            <div>
                {reviews ? (
                    reviews.Reviews?.map((e) => {
                        return <ReviewCard key={e.id}   description={e.description} rating={e.rating} name={e.author}/>;
                    })
                ) : (
                    <div className={st.cardB}>
                        <div className={st.titleCard}>
                            <ThemeProvider theme={theme}>
                                <Typography variant="h5">
                                    This product does not have any review yet
                                </Typography>
                            </ThemeProvider>
                        </div>
                        <p className="card-text">
                            Hey! Be the first one to provide a review for this product, you
                            will be able to do it after your purchase.
                        </p>
                    </div>
                )}
            </div>
            <div className={st.submitReview}>
                <ReviewForm key={ProductId} ProductId={ProductId} token={token} />
            </div>
        </div>
    )
};

export default Review;
