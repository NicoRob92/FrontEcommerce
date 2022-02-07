import { useState } from "react";
import styles from "./_EmailAddress.module.scss"

const EmailAddress = ({ logginStatus, payLinkGenerator, payLink }) => {
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")


  const getAddress = (e) => {
    setAddress((prevState) => (prevState = e.target.value));
  };

  const getEmail = (e) => {
    setEmail((prevState) => (prevState = e.target.value));
  };

  

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Correo"
          onChange={getEmail}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Direccion de envio"
          onChange={getAddress}
        />
      </div>
      <div>
        {email && address ? (
          <input type="button" value="generar link de pago" onClick={(e) => payLinkGenerator(e, email, address)}/>
        ) : null}
        {logginStatus ? (
          <div>
            <a href={payLink}>Proceder al pago</a>
          </div>
        ) : null}
        {!logginStatus ? (<p>Debes iniciar secion para continuar</p>) : null}
      </div>
    </div>
  );
};

export default EmailAddress;
