import React from "react";

import PropTypes from "prop-types";
import { logout } from "../actions/UserLogin";
import { withRouter } from "react-router-dom";

class Logout extends React.Component {
  componentWillMount() {
    logout();
    this.props.history.push("/login");
  }

  render() {
    return <div />;
  }
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired
};

export default withRouter(Logout);
