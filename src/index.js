import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Router } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import registerServiceWorker from "./registerServiceWorker";

const history = createHistory();
const auth = localStorage.authToken;

if (
  auth &&
  (history.location.pathname !== "/" || history.location.pathname !== "/login")
) {
  history.push("/list");
} else {
  history.push("/login");
}

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root")
);

registerServiceWorker();
