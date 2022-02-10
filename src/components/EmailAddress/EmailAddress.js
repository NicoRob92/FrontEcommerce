import { style } from '@mui/system';
import { useState } from 'react';
import styles from './_EmailAddress.module.scss';

const EmailAddress = ({ logginStatus, payLinkGenerator, payLink, logged }) => {
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const getAddress = (e) => {
    setAddress((prevState) => (prevState = e.target.value));
  };

  const getEmail = (e) => {
    /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(e.target.value)
      ? setEmail((prevState) => (prevState = e.target.value))
      : setError('Ingrese un mail valido');
    /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(
      e.target.value
    ) && setError(null);
  };

  return (
    <div className={styles.container}>
      <input type='text' placeholder='Correo' onChange={getEmail} />

      <input
        type='text'
        placeholder='Direccion de envio'
        onChange={getAddress}
      />

      <div className={styles.text}>
        {email && address && !error && !payLink? (
          <input
            type='button'
            value='generar link de pago'
            onClick={(e) => payLinkGenerator(e, email, address)}
          />
        ) : payLink && <div className={styles.a}><a href={payLink}>pagar</a></div>}
        {logged === 'true' && !error && !email && !address ? (
          <a href={payLink}>Rellene el formulario</a>
        ) : (
          error && <p>{error}</p>
        )}
        {logged !== 'true' && <p>Debes iniciar secion para continuar</p>}
      </div>
    </div>
  );
};

export default EmailAddress;
