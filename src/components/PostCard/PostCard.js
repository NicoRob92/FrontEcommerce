import styles from './_PostCard.module.scss';
import {Link} from 'react-router-dom'
export const PostCard = ({ post }) => {
  return (
    <Link to={`/detail/${post.id}`} className={styles.container}>
    
      <div className={styles.image}>
        <img src={post.image} alt='' />
      </div>
      <div className={styles.about}>
      <h1>{post.name}</h1>
      <h2>$ {post.price}</h2>
      </div>
      <div className={styles.options}>
      <span>Envio Gratis</span>
      <span>Stock</span>
      <span>Privado</span>
      </div>
    
    </Link>
  );
};
