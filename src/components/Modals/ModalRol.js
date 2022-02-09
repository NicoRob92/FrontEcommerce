import styles from './_Modal.module.scss';
import { useState } from 'react';
import { resetPassword } from '../../ducks/actions/actionCreators';
import { useDispatch } from 'react-redux';
import axios from 'axios'
import {api} from '../../credentials'

export const ModalRol = ({ id, hidden, show }) => {
  console.log(id)
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState('')
  const [rol, setRol] = useState({
    input: '',
    id: id,    
    type:'ROLE'
  });

  const onChange = (e) => {
    setRol({
      ...rol,
      [e.target.name]: e.target.value,
    });
  };
  

  const updateRol = async () => {
   return await axios.put(`${api}admin/user/${id}`,rol,{
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
    if(prueba.data){
      setSuccess(true)
      console.log(success)
       setTimeout(()=> setSuccess(false),3000)
    }
  }

  const validate = (input) => {
    let error = ''
    if (!input.input) {
      error = "A role is required"
    }
    return error
  }

  const handleBlurErrors = () => {
    setErrors(validate(rol))
  }
 
  return (
    <div className={styles.modal} hidden={hidden}>
      <div className={styles.container}>
        <h2 className={styles.title}>Modificar Rol</h2>
          
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
          <div className={styles.itemrol}>
            <label> Elegir Rol </label>
            <select onChange={(e)=> onChange(e)} name='input' onBlur={handleBlurErrors}>
                <option key='0' defaultValue={true}>Select</option>
                <option key='1' value='user'>User</option>
                <option key='2' value='admin'>Admin</option>
            </select>
            </div>
            {errors ? <p>{errors}</p> : null}
          <button disabled={errors ? true : false} type='submit'>Change Rol</button>
        </form>
        {success === true ? <h1 className={styles.success}>Succesfully changed Rol</h1> : null}
      </div>
    </div>
  );
};
