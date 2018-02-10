import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Router } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import registerServiceWorker from "./registerServiceWorker";

const history = createHistory();

if (localStorage.authToken) {
  console.log("auth");
}

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root")
);

registerServiceWorker();
