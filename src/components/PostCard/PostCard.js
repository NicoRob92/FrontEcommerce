import styles from './_PostCard.module.scss';
import {Link} from 'react-router-dom'
import Rating from "@mui/material/Rating";

export const PostCard = ({ post }) => {
  console.log(post)
  return (
    <Link to={`/detail/${post.id}`} className={styles.container}>
      <div className={styles.image}>
        <img src={post.Images.length > 0? post.Images[0].link : 'https://icon-library.com/images/not-found-icon/not-found-icon-28.jpg'} alt='' />
      </div>
      <div className={styles.about}>
      <h1>{post.name}</h1>
      <Rating name="read-only" value={post.ratingProm} readOnly />
      <h2>$ {post.price}</h2>
      </div>
      <div className={styles.options}>
      <span>Envio Gratis</span>
      <span>Stock</span>
      <span>{post.User.role === 'admin' ? `Local` : `Privado`}</span>
      </div>
    
    </Link>
  );
};
