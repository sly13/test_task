import React, { Component } from "react";
import "./App.css";
import LoginForm from "../src/components/auth/LoginForm";
import List from "../src/components/post/List";
import Logout from "../src/components/user/Logout";
import { Route, Switch, Link } from "react-router-dom";
import NotFound from "./components/NotFound";
import { Navbar } from "react-materialize";
import Info from "./components/post/Info";
import logo from "./logo.png";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar
          brand={<img id="front-page-logo" src={logo} alt="logo" />}
          right
        >
          {localStorage.authToken ? <Link to="/logout">Logout</Link> : ""}
        </Navbar>

        <div className="container">
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/list" component={List} />
            <Route exact path="/list/:id" component={Info} />
            <Route path="/logout" component={Logout} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
