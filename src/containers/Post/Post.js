import { PostCard } from "../../components/PostCard/PostCard";
import styles from './_Post.module.scss'
const Post = ({array}) =>{
    
    return (
        <div className={styles.container}>
            {array ? array?.map(e => <PostCard key={e.id} post={e}/>) : <h1>Loading</h1>}
        </div>
    )
}

export default Post