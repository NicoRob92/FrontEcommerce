import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";

import store from "./ducks/store";

import App from "./App";

import "./index.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sass/main.scss";
import Admin from "./Views/Admin/Admin";
import { Auth0Provider } from "@auth0/auth0-react";
import { Switch, Route } from "react-router-dom";
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Auth0Provider
        domain="nicorobledo.us.auth0.com"
        clientId="QxfsX7iCeiq3dv2l50vYK7djTBhMqymm"
        redirectUri={window.location.origin}
      >
        <BrowserRouter>
        <Switch>
          <Route path="/admin">
            <Admin/>
          </Route>
          <Route path="/">
            <App />
          </Route>
        </Switch>
         
        </BrowserRouter>
      </Auth0Provider>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
