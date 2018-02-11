import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Error from "../ui/Error";
import { Row, Input, Icon, Button } from "react-materialize";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasErrors: false,
      user: {
        login: "test",
        password: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate(this.state.user);
    this.setState({
      hasErrors: errors
    });

    //console.log("login:", e.target.login.value);
    //console.log("password:", e.target.password.value);

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
    if (!user.login) errors.login = "Login can't be blank!";
    if (!user.password) errors.password = "Password can't be blank!";
    return errors;
  }

  render() {
    const { hasErrors, user: { login, password } } = this.state;

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
              required="required"
              autoComplete="off"
            >
              <Icon>account_circle</Icon>
            </Input>

            {/* {hasErrors.login && <Error text={hasErrors.login} />} */}

            <Input
              id="password"
              type="password"
              defaultValue={password}
              onChange={this.handleUpdate}
              s={6}
              label="Password"
              className="validate"
              required="required"
              autoComplete="off"
            >
              <Icon>lock_outline</Icon>
            </Input>

            {/* {hasErrors.password && (
              <Error text={hasErrors.password} for="password" />
            )} */}

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
