import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import Loading from "./screens/Loading";
import Router from "./screens/Router";
import { Provider } from "react-redux";
import { store } from "./redux/stores";

import "./base/styles/styles.scss";
import "./base/styles/globals.scss";
import "./base/styles/responsive.scss";
import "./base/styles/fonts.scss";
import "./base/styles/element.scss";
import "./base/styles/animation.scss";
import "./base/styles/overwrite.scss";
import "antd/dist/antd.css";

ReactDOM.render(
  <Provider store={store}>
    <Router />
    <Loading />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
