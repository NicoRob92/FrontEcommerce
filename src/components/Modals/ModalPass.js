import styles from './_Modal.module.scss';
import { useState } from 'react';
import { resetPassword } from '../../ducks/actions/actionCreators';
import { useDispatch } from 'react-redux';
import {api} from '../../credentials'

import axios from 'axios'
export const ModalPass = ({ id, hidden, show }) => {
  console.log(id)
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  const [password, setPassword] = useState({
    password: '',
    confirmPassword: '',    
  });

  const onChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const body = {
    id:id,
    password:password.confirmPassword
  }

  const resetPassword = async () => {
   return await axios.put(`${api}admin/user/reset-password-force`,body,{
      headers:{
        'Content-Type': 'application/json',
        'token' : token
      }
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    let prueba = await resetPassword()
    if(prueba.data.msg === 'Password Restore '){
      setSuccess(true)
      console.log(success)
       setTimeout(()=> setSuccess(false),3000)
    }
  }

  const validate = (input) => {
    let errors = {}
    if (!input.password) {
      errors.password = "a password is required";
    } else if (
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(input)
    ) {
      errors.password =
        "A valid password is required, at least one number, at least one special character, 6-16 characters";
    }

    if (input.password !== input.confirmPassword) {
      errors.confirmPassword = "Password is different"
    }
    return errors
  }


  const handleBlur = () => {
    setErrors(validate(password))
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
            <label>Password</label>
            <input
              type='password'
              name='password'
              value={password.password}
              onChange={(e) => onChange(e)}
              onBlur={handleBlur}
            />
          </div>
          {errors.password ? <p>{errors.password}</p> : null}
          <div className={styles.item}>
            <label>Confirm Password</label>
            <input
              type='password'
              name='confirmPassword'
              value={password.confirmPassword}
              onChange={(e) => onChange(e)}
              onBlur={handleBlur}
            />
          </div>
            {errors.confirmPassword ? <p>{errors.confirmPassword}</p> : null}
          <button disabled={errors ? true : false} type='submit'>Change Password</button>
        </form>
        {success === true ? <h1 className={styles.success}>Succesfully changed password</h1> : null}
      </div>
    </div>
  );
};
