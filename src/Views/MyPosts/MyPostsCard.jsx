import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from "@mui/material/Rating";
import { Paper } from '@mui/material';
import { CardActions } from '@mui/material';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import st from './_MyPosts.module.scss'

const MyPostsCard = ({ id, name, Images, postStatus, price, ratingProm, stock, createdAt }) => {
    return (
        <Paper elevation={3}>
            <Card sx={{ display: 'flex',justifyContent: 'space-between',width: 700 ,marginTop:'2%'}}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <h4 className={st.card_title}>{name}</h4>
                        <h5 className={st.card_price}>USD${price}</h5>
                        <Rating name="read-only" value={ratingProm} readOnly />
                        <p>Stock <span>({stock})</span></p>
                        <p>Stado <span>{postStatus}</span></p>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <p>Creado: <span>{createdAt.substring(0,10)}</span></p>
                    </Box>
                    <CardActions>
                        <Link to={`user/editpost/${id}`} style={{ textDecoration: 'none' }}>
                            <Button variant="contained" endIcon={<EditIcon />} color='success'>
                                Edit
                            </Button>
                        </Link>
                    </CardActions>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: '60%' , maxHeight:'320px', backgroundSize:'cover', marginLeft:'5px'}}
                    image={Images[0].link}
                />

            </Card></Paper>
    )
}

export default MyPostsCard

