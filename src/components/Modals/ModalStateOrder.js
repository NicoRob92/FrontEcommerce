import styles from './_Modal.module.scss';
import { useState } from 'react';
import { resetPassword } from '../../ducks/actions/actionCreators';
import { useDispatch } from 'react-redux';
import {api} from '../../credentials'

import axios from 'axios'
export const ModalStateOrder = ({ id, hidden, show }) => {
  console.log(id)
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const [success, setSuccess] = useState(false)
  const [status, setStatus] = useState('');

  const onChange = (e) => {
    setStatus(e.target.value)
  };

  const body = {
    status:status
  }

  const changeStatus = async () => {
   return await axios.put(`${api}admin/order/${id}`,body,{
      headers:{
        'Content-Type': 'application/json',
        'token' : token
      }
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    let prueba = await changeStatus()
    console.log(prueba.data)
    if(prueba.data.msg === 'Password Restore '){
      setSuccess(true)
      console.log(success)
       setTimeout(()=> setSuccess(false),3000)
    }
  }

  return (
    <div className={styles.modal} hidden={hidden}>
      <div className={styles.container}>
        <h2 className={styles.title}>Modificar Password</h2>
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
            <label>Select an option</label>
            <select onChange={(e) => onChange(e)}>
            <option type='checkbox' value='creada' key='creada'>Creada</option>
            <option type='checkbox' value='procesada' key='procesada'>procesada</option>
            <option type='checkbox' value='completada' key='completada'>completada</option>
            </select>
          </div>

          <button type='submit'>Change Status</button>
        </form>
        {success === true ? <h1 className={styles.success}>Status Changed</h1> : null}
      </div>
    </div>
  );
};
