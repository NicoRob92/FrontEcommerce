import s from './Card.module.scss';
import { NavLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Rating from "@mui/material/Rating";

const defaultImage =
  'https://estaticos.muyinteresante.es/media/cache/1140x_thumb/uploads/images/gallery/59bbb29c5bafe878503c9872/husky-siberiano-bosque.jpg';

export default function CardItem({ image, title, details, price, id, ratingProm }) {
  return (
    <NavLink to={`detail/${id}`} className={s.link}>
      <Paper elevation={3}>
        <Card className={s.card}>
          <CardMedia className={s.card_image} component="img"
            image={image || defaultImage}
            alt="post image" />
          <CardContent>

          <Rating name="read-only" value={ratingProm} readOnly />
          <h2 className={s.price_title}>${price}</h2>

            {title.length < 17 ? (
              <h5>{title}</h5>
            ) : (
              <h5>{title.substring(0, 17)}...</h5>
            )}
          </CardContent>
        </Card>
      </Paper>
    </NavLink>
  );
}