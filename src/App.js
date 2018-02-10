import React, { Component } from "react";
import "./App.css";
import LoginPage from "../src/components/auth/LoginPage";
import List from "../src/components/post/List";
import Logout from "../src/components/user/Logout";
import { Route, Switch, Link } from "react-router-dom";
import NotFound from "./components/NotFound";
import { Navbar, NavItem, Icon } from "react-materialize";

class App extends Component {
  render() {
    let logo = (
      <object
        id="front-page-logo"
        className="responsive-img"
        width="170px"
        type="image/svg+xml"
        data="https://demo.rocketico.io/static/media/RocketDAO.51a0a43b.svg"
      >
        Your browser does not support SVG.
      </object>
    );
    return (
      <React.Fragment>
        <Navbar brand={logo} right>
          <Link to="/logout">Logout</Link>
        </Navbar>

        <div className="container">
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/list" component={List} />
            <Route path="/logout" component={Logout} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
