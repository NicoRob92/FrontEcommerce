import styles from './_OrderCard.module.scss'
import { Link } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
const OrderCard = ({ ids, name, price }) => {

    return (
        <Card sx={{ width: '100%', height: '100%', margin: '5px' }}>
            <CardContent>
                <h6>{name}</h6>
                <h5 className={styles.card_title}>${price}</h5>
            </CardContent>
        </Card>
    )
};

export default OrderCard;