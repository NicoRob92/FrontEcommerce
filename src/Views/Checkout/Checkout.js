import React, { useEffect, useState } from "react";

import CheckoutSuccess from "../../components/CheckoutSuccess/CheckoutSuccess";
import CheckoutFailure from "../../components/CheckoutFailure/CheckoutFailure";
import CheckoutPending from "../../components/CheckoutPending/CheckoutPending";

import styles from "./_Checkout.module.scss";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";


const Checkout = () => {
  const [timer,setTimer] = useState(5)



  let {url} = useRouteMatch()
  useEffect(()=>{
  if(timer >= 1 ) {
    setInterval(()=>{
    setTimer(prevState => prevState = prevState - 1)
  },1000)
}},[timer])
  

  return (
    <Switch>
      <Route exact path={`${url}/success`}>
        <CheckoutSuccess time={timer}/>
        {timer === 1 && <Redirect to="/"/>}
      </Route>
      <Route exact path={`${url}/failure`}>
        <CheckoutFailure time={timer}/>
        {timer === 1 && <Redirect to={`/`}/>}
      </Route>
      <Route exact path={`${url}/pending`}>
        <CheckoutPending time={timer}/>
        {timer === 1 && <Redirect to="/"/>}
      </Route>
    </Switch>
  );
};

export default Checkout;
