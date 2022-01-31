import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ReviewBar from './ReviewBar';
import ReviewCard from './ReviewCard';
import st from './_Review.module.scss'
import ReviewForm from './ReviewForm';
import {getReview} from '../../ducks/actions/actionCreators'
const Review = ({ProductId}) => {
    const dispatch = useDispatch()
    // const reviews = useSelector((state) => state.reviews)
    const reviews = [{
        "id": 20,
        "name": "Pez Globo",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie felis eget purus sagittis sodales quis id eros.",
        "price": "629",
        "stock": 5,
        "ratingProm": "2",
        "status": true,
        "createdAt": "2022-01-28T23:39:43.965Z",
        "updatedAt": "2022-01-29T16:20:08.250Z",
        "UserId": 1
    }]
    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    useEffect(() => {
        dispatch(getReview(ProductId))
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
            <div className={st.card}>
                {reviews ? (
                    reviews?.map((e) => {
                        return <ReviewCard description={e.description} ratingProm={e.ratingProm}/>;
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
                <ReviewForm ProductId={ProductId} />
            </div>
        </div>
    )
};

export default Review;
