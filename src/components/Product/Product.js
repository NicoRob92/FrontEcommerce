import { Link } from 'react-router-dom';
import Rating from "@mui/material/Rating";

import styles from './_Product.module.scss';
const Product = ({ name, price, image, id ,ratingProm}) => {
  return (
    <Link className={styles.link} to={`/detail/${id}`}>
        <img className={styles.image} src={image} alt={name} />
        <div className={styles.about}>
          <Rating name="read-only" value={ratingProm} readOnly />
          <h2>$ {price}ºº</h2>
          <h5>{name?.length > 20 ? `${name?.substring(0,20)}...`: name }</h5>
          
        </div>
    </Link>
  );
};

export default Product;
