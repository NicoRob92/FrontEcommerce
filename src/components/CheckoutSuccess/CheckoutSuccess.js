import { useEffect } from "react";

const CheckoutSuccess = () => {
  useEffect(()=>{
   localStorage.removeItem('posts') 
  })

  return <div>La compra se ha realizado de manera exitosa</div>;
};

export default CheckoutSuccess;
