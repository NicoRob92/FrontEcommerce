import s from './Card.module.scss';
import { NavLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';

const defaultImage =
  'https://estaticos.muyinteresante.es/media/cache/1140x_thumb/uploads/images/gallery/59bbb29c5bafe878503c9872/husky-siberiano-bosque.jpg';

export default function CardItem({
  image,
  title,
  details,
  price,
  id,
  ratingProm,
}) {
  return (
    <div className={s.container}>
    <NavLink to={`detail/${id}`} className={s.cardlink}>
        <div className={s.imagen} style={{backgroundImage:`url(${image || defaultImage})`}}/>
        <Rating
          className={s.card_rating}
          size='small'
          name='read-only'
          value={ratingProm}
          readOnly
        />

        <h2 className={s.price_title}>${price}</h2>
        {title.length < 17 ? (
          <h5>{title}</h5>
        ) : (
          <h5>{title.substring(0, 17)}...</h5>
        )}
    </NavLink>
    </div>
  );
}
