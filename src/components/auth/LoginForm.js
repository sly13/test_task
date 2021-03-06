import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Row, Input, Icon, Button } from "react-materialize";

class LoginForm extends Component {
  state = {
    hasErrors: false,
    user: {
      login: "test",
      password: ""
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate(this.state.user);
    this.setState({
      hasErrors: errors
    });

    if (e.target.login.value === "test" && e.target.password.value === "test") {
      localStorage.setItem("authToken", true);
      this.props.history.push("/list");
    }
  };

  handleUpdate = ({ target: { id, value } }) => {
    this.setState(state => ({
      user: {
        ...state.user,
        [id]: value
      }
    }));
  };

  validate(user) {
    const errors = {};
    if (!user.login) {
      errors.login = "Login is required.";
    } else if (!user.password) {
      errors.password = "Password is required.";
    } else {
      if (user.login !== "test" || user.password !== "test")
        errors.something = "Wrong login or password.";
    }
    return errors;
  }

  render() {
    const { user: { login, password } } = this.state;

    return (
      <React.Fragment>
        <h5 className="center-align">Authorization</h5>

        <Row>
          <form onSubmit={this.handleSubmit}>
            <Input
              s={6}
              id="login"
              defaultValue={login}
              onChange={this.handleUpdate}
              label="Login"
              validate
              autoComplete="off"
            >
              <Icon>account_circle</Icon>
            </Input>

            <Input
              id="password"
              type="password"
              defaultValue={password}
              onChange={this.handleUpdate}
              s={6}
              label="Password"
              className="validate"
              autoComplete="off"
            >
              <Icon>lock_outline</Icon>
            </Input>

            <Row>
              <div className="center-align error">
                {this.state.hasErrors.login}
                {this.state.hasErrors.password}
                {this.state.hasErrors.something}
              </div>
            </Row>

            <Row className="center-align">
              <Button type="submit" waves="light">
                Submit<Icon left>insert_emoticon</Icon>
              </Button>
            </Row>
          </form>
        </Row>
      </React.Fragment>
    );
  }
}

export default withRouter(LoginForm);
