import { useTheme } from '@mui/material/styles';
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

const MyPostsCard = ({ id, name, Images, postStatus, price, ratingProm, stock, createdAt }) => {
    return (
        <Paper elevation={3}>
            <Card sx={{ display: 'flex', width: 700 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <h4>{name}</h4>
                        <h5>USD${price}</h5>
                        <Rating name="read-only" value={ratingProm} readOnly />
                        <p>Stock <span>{stock}</span></p>
                        <p>Stado <span>{postStatus}</span></p>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <p>Creado: <span>{createdAt}</span></p>
                    </Box>
                    <CardActions>
                        <Link to={`user/editpost/${id}`} style={{ textDecoration: 'none' }}>
                            <Button variant="contained" endIcon={<EditIcon />}>
                                Edit
                            </Button>
                        </Link>
                    </CardActions>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 300 }}
                    image={Images[0].link}
                />

            </Card></Paper>
    )
}

export default MyPostsCard

