import { PostCard } from '../../components/PostCard/PostCard';
import styles from './_Post.module.scss';
import { useState, useEffect } from 'react';
import Paginado from './paginado';
import { Loader } from '../../components/Loader/loader';

const Post = ({ array }) => {
  const [current, setCurrent] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);
  const pages = Math.ceil(array.length / postPerPage);
  const lastindex = current * postPerPage;
  const first = lastindex - postPerPage;
  let postToShow = array.slice(first, lastindex);
  const posts = array.length;

    const next = (e) => {
      e.preventDefault();
      if (current < pages) setCurrent((current) => current + 1);

    };
    const prev = (e) => {
      e.preventDefault();
      if (current > 1) setCurrent((current) => current - 1);

    };

  const paginate = (e) => {
    setCurrent((prev) => e);
  };

  return (
    <div className={styles.container}>
      <div className={styles.posts}>
      {array ? (
        postToShow?.map((e) => <PostCard key={e.id} post={e} />)
      ) : (
        <Loader/>
      )}
      </div>
      <div className={styles.buttons}>

        <button onClick={(e)=> prev(e)}>Prev</button>
        <Paginado itemsP={postPerPage} array={posts} paginate={paginate} />
        <button onClick={(e)=> next(e)}>Next</button>

      </div>
     

    </div>
  );
};

export default Post;
