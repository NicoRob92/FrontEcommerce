import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Navbar from "./containers/Navbar/Navbar";
import Home from "./Views/Home/Home";
import Market from "./Views/Market/Market";
import Detail from "./Views/Detail/Detail";
import Search from "./Views/Search/Search";
import Register from "./Views/Register/Register";
import FormNewPost from "./components/FormNewPost/FormNewPost";
import Order from "./Views/Order/Order";
import Checkout from "./Views/Checkout/Checkout";
import ProfileView from "./Views/ProfileView/ProfileView";
import FormUpdatePost from "./components/EditPost/FormUpdatePost";
import Compras from "./Views/Compras/Compras.js";
import { LoginView } from './Views/Login/LoginView'

import * as actionCreators from "./ducks/actions/actionCreators";

import "./App.css";
import Footer from "./components/Footer/Footer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionCreators.setCart(JSON.parse(localStorage.getItem("posts"))));
    dispatch(actionCreators.getCategories());
    dispatch(actionCreators.getPosts());
    dispatch(actionCreators.getCountries());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <LoginView />
        </Route>
        <Route exact path="/market">
          <Market />
        </Route>
        <Route exact path="/detail/:id">
          <Detail />
        </Route>
        <Route exact path="/new-post">
          <FormNewPost />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/search/:name">
          <Search />
        </Route>
        <Route exact path="/order">
          <Order />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route exact path="/user/editpost/:id">
          <FormUpdatePost />
        </Route>
        <Route exact path="/compras">
          <Compras />
        </Route>
        <Route exact path="/user/profile/:id">
          <ProfileView />
        </Route>
      </Switch>
      <Footer />

    </>
  );
};

export default App;
