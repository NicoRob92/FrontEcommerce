import styles from './_Modal.module.scss';
import { useState } from 'react';
import axios from 'axios'



export const ModalDeletePost = ({ id, hidden, show }) => {
  console.log(id)
  const token = localStorage.getItem('token')
  const [success, setSuccess] = useState(false)  

  const updateRol = async () => {
   return await axios.delete(`https://api-ec.herokuapp.com/api/admin/post/${id}`,{
      headers:{
        'Content-Type': 'application/json',
        'token' : token
      }
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    let prueba = await updateRol()
    console.log(prueba)
    if(prueba.data.msg === 'Post Destroyed'){
      setSuccess(true)
      console.log(success)
       setTimeout(()=> setSuccess(false),3000)
    }
  }

  return (
    <div className={styles.modal} hidden={hidden}>
      <div className={styles.container}>
        <h2 className={styles.title}>Eliminar post</h2>

        <button className={styles.close} onClick={(e) => show()}>
          <svg
            width='32'
            height='32'
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z'
              stroke='white'
              strokeWidth='2'
              strokeMiterlimit='10'
            />
            <path
              d='M20 12L12 20'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M20 20L12 12'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
        <form className={styles.form} onSubmit={(e)=>onSubmit(e)}>
          <div className={styles.item}>
            <h1 className={styles.danger}>Seguro quiere eliminar el post</h1>
            </div>
          <button type='submit'>Eliminar Post</button>
        </form>
        {success === true ? <h2 className={styles.success}>Post eliminado</h2> : null}
      </div>
    </div>
  );
};
