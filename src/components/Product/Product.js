import { Link } from "react-router-dom";

import styles from "./_Product.module.scss";
const Product = ({ name, price, image, id }) => {
  return (
    <Link className={styles.link} to={`/detail/${id}`}>
      <div className={styles.productContainer}>
        <img className={styles.image} src={image} alt={name} />
        <h5>{name}</h5>
        <h2>{price}$</h2>
      </div>
    </Link>
  );
};

export default Product;
