import styles from './_MyPosts.module.scss'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserPosts } from '../../ducks/actions/actionCreators'
import MyPostsCard from './MyPostsCard'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Paper } from '@mui/material'
const MyPosts = () => {
    const dispatch = useDispatch()
    const userPosts = useSelector((state) => state.posts.UserPosts)
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    useEffect(() => {
        dispatch(getUserPosts(userId, token))
    }, [])
    return (
        <div className={styles.container}>
            <h1>Your Posts</h1>
            <Paper elevation={3}>
                <Card sx={{ width: '100%' }}>
                    <CardContent>
                        {userPosts.map((e) => {
                            return <MyPostsCard key={e.id} id={e.id} Images={e.Images} name={e.name} postStatus={e.postStatus} price={e.price} ratingProm={e.ratingProm} stock={e.stock} createdAt={e.createdAt} />
                        })}
                    </CardContent>
                </Card>
            </Paper>
        </div>
    )
}

export default MyPosts