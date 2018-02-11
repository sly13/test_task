import React, { Component } from "react";
import { getPostInfo } from "../actions/UserLogin";
import { withRouter } from "react-router-dom";

class Info extends Component {
  constructor() {
    super();
    this.state = {
      info: {}
    };
  }

  componentDidMount() {
    getPostInfo(this.props.match.params.id)
      .then(res => {
        this.setState({ info: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { title, body } = this.state.info;
    const { id } = this.props.match.params;

    return (
      <React.Fragment>
        <div>
          <h5 className="center-align">About post with id={id}</h5>
        </div>

        <div className="row ">
          <div className="col s12 m12">
            <div className="card black-text card-panel hoverable">
              <div className="card-content white ">
                <span className="card-title">{title}</span>
                <p>{body}</p>
              </div>
              <div className="card-action">
                <a href="#" onClick={this.props.history.goBack}>
                  Go back
                </a>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Info);
