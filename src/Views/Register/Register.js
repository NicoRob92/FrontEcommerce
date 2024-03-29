import { useState } from 'react';
import style from './Register.module.scss';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { api } from '../../credentials';
import firebase from '../../services/firebaseStorage';
import Google from '../../components/GoogleAuth/Google';
import validate from './Validation';

var profileImageEx = 'http://cdn.onlinewebfonts.com/svg/img_191958.png';
function Register(props) {
  const [data, setData] = useState({});
  const [isSend, setIsSend] = useState(false);
  const [uploadValue, setUploadValue] = useState();
  const [imageLink, setimageLink] = useState(profileImageEx);
  // errors state
  const [errors, setErrors] = useState({});

  const handleBlur = () => {
    setErrors(validate(data));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetch(api + 'register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(data),
    }).then(() => {
      setData({});
      setIsSend(true);
    });
  };

  let addOrChange = 'Añadir ';
  if (imageLink != profileImageEx) {
    addOrChange = 'Cambiar ';
  }
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  function handleUpload(e) {
    const file = e.target.files[0];
    let storageRef = firebase.storage().ref('/ecommerce/' + file.name);
    let task = storageRef.put(file);
    task.on(
      'state_changed',
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadValue(percentage);
      },
      (err) => {
        console.log(err.message);
      },
      () => {
        setUploadValue(100);

        storageRef.getDownloadURL().then((url) => {

          setData({...data,
            image:url
          })

        setimageLink(url)


        });
      }
    );
  }

  return (
    <div className={style.container}>
      <form onSubmit={(e) => onSubmit(e)} className={style.form}>
        <div className={style.photo}>
         <div className={style.charge}>
          <img height={160} src={imageLink} alt='' />
          {uploadValue === 0 || uploadValue === 99 ? (
            <progress
              className='mx-auto d-block progress'
              value={uploadValue}
              max='100'></progress>
          ) : null}
        </div>
          <div className={style.uploadPhoto}>
            <input accept="image/x-png,image/gif,image/jpeg" type='file' name='image' onChange={handleUpload} />

           </div>
        </div>
        <hr />
        <div className={style.items}>
        <div className={style.item}>
        <div className={style.input}>
        <label>Username</label> <br />
        <input
          type='text'
          name='username'
          value={data.username || ''}
          onChange={(e) => handleChange(e)}
          onBlur={handleBlur}></input>
          </div>
          <div className={style.errors}>
        {errors.username ? (
          <p className={style.errors}>{errors.username}</p>
        ) : null}
        </div>
        </div>
        <br />
        <div className={style.item}>
        <div className={style.input}>
        <label>First name</label> <br />
        <input
          type='text'
          name='first_name'
          value={data.first_name || ''}
          onChange={(e) => handleChange(e)}
          onBlur={handleBlur}></input>
          </div>
          <div className={style.errors}>
        {errors.first_name ? (
          <p className={style.errors}>{errors.first_name}</p>
        ) : null}
        </div>
        </div>
        <br />
        <div className={style.item}>
        <div className={style.input}>
        <label>Last name</label> <br />
        <input
          type='text'
          name='last_name'
          value={data.last_name || ''}
          onChange={(e) => handleChange(e)}
          onBlur={handleBlur}></input>
          </div>
          <div className={style.errors}>
        {errors.last_name ? (
          <p className={style.errors}>{errors.last_name}</p>
        ) : null}
        </div>
        </div>
        <br />
        <div className={style.item}>
            <div className={style.input}>
        <label>Email</label> <br />
        <input
          type='email'
          name='email'
          value={data.email || ''}
          onChange={(e) => handleChange(e)}
          onBlur={handleBlur}></input>
          </div>
          <div className={style.errors}>
        {errors.email ? <p className={style.errors}>{errors.email}</p> : null}
        </div>
        </div>
        <br />
        <div className={style.item}>
        <div className={style.input}>
        <label>Phone</label> <br />
        <input
          type='tel'
          name='phone'
          value={data.phone || ''}
          onChange={(e) => handleChange(e)}
          onBlur={handleBlur}></input>
          </div>
          <div className={style.errors}>
        {errors.phone ? <p className={style.errors}>{errors.phone}</p> : null}
        </div>
        </div>
        <br />
        <div className={style.item}>
            <div className={style.input}>
        <label>Dni</label> <br />
        <input
          type='tel'
          name='dni'
          value={data.dni || ''}
          onChange={(e) => handleChange(e)}
          onBlur={handleBlur}></input>
          </div>
          <div className={style.errors}>
        {errors.dni ? <p className={style.errors}>{errors.dni}</p> : null}
            </div>
       </div>
        <br />
        <div className={style.item}>
        <div className={style.input}>
        <label>Password</label> <br />
        <input
          type='password'
          name='password'
          value={data.password || ''}
          onChange={(e) => handleChange(e)}
          onBlur={handleBlur}></input>
          </div>
          <div className={style.errors}>
        {errors.password ? (
          <p >{errors.password}</p>
        ) : null}
         </div>
         </div>
        <br />
        <div className={style.item}>
            <div className={style.input}>
        <label>Country</label> <br />
        <select name='country' onChange={(e) => handleChange(e)}>
          <option default>Selecciona </option>
          {props.countries?.map((c, i) => {
            return (
              <option key={i} value={c.id}>
                {c.name}
              </option>
            );
          })}
        </select>
        </div>
        <div className={style.errors}>
        {errors.country ? (
          <p className={style.errors}>{errors.country}</p>
        ) : null}
        </div>
         </div>
        </div>
        <div className={style.button}>
          <button type='submit'>Submit</button>
        </div>
      </form>

      {isSend ? (
        <>
          <div className={style.sent}>
            <div className={style.modal}>
              <span>Tu cuenta ha sido creada con exito</span> <br />
              <NavLink to='/' className={style.backHome}>
                Ok!
              </NavLink>
            </div>
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return { countries: state.reducer.countries };
};
export default connect(mapStateToProps, null)(Register);
