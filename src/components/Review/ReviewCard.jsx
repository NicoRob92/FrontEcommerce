import React from 'react';
import Rating from "@mui/material/Rating";

const ReviewCard = ({ description, rating, name }) => {
    return (
        <div className='card'>
            <div className='card-body'>
                <h5 className='h5'>{name}</h5>
                <Rating name="read-only" value={rating} readOnly />
                <p>{description}</p>
            </div>
        </div>
    )
};

export default ReviewCard;
