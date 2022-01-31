import React, { useEffect, useState } from "react";

import CheckoutSuccess from "../../components/CheckoutSuccess/CheckoutSuccess";
import CheckoutFailure from "../../components/CheckoutFailure/CheckoutFailure";
import CheckoutPending from "../../components/CheckoutPending/CheckoutPending";

import styles from "./_Checkout.module.scss";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";


const Checkout = () => {
  const [timer,setTimer] = useState(1)


  let {url} = useRouteMatch()
  useEffect(()=>{
  if(timer <= 4 ) {
    setInterval(()=>{
    setTimer(prevState => prevState = prevState + 1)
  },1000)
}},[timer])
  

  return (
    <Switch>
      <Route exact path={`${url}/success`}>
        <CheckoutSuccess timer={timer}/>
        {timer === 4 && <Redirect to="/"/>}
      </Route>
      <Route exact path={`${url}/failure`}>
        <CheckoutFailure />
        {timer === 4 && <Redirect to="/"/>}
      </Route>
      <Route exact path={`${url}/Pending`}>
        <CheckoutPending />
        {timer === 4 && <Redirect to="/"/>}
      </Route>
    </Switch>
  );
};

export default Checkout;
