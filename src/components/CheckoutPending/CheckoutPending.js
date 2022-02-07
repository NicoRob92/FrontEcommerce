import { useEffect } from "react";
const CheckoutPending = () => {
  useEffect(()=>{
    localStorage.removeItem('posts') 
   })
 
  return <div>La compra esta en estado pendiente</div>;
};

export default CheckoutPending;
