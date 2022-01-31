import React from 'react';
import Rating from "@mui/material/Rating";

const ReviewCard = ({ description, ratingProm }) => {
    return (
        <div className='card'>
            <div className='card-body'>
                <h5 className='h5'>User name</h5>
                <Rating name="read-only" value={ratingProm} readOnly />
                <p>{description}</p>
            </div>
        </div>
    )
};

export default ReviewCard;
