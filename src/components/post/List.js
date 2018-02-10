import React, { Component } from "react";
import Pagination from "react-js-pagination";
import { Row, Table, Navbar, NavItem, Icon, Input } from "react-materialize";
import logo from "../../logo.svg";
import { getUserPosts, getPosts, getUsers } from "../actions/UserLogin";
import Filter from "../post/Filter";
import Item from "../post/Item";

class List extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    getPosts()
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(error => {
        console.error("error", error.response.data.error);
        this.setState({ errors: error.response.data.error });
      });
  }

  updatePostList = posts => {
    this.setState({
      posts
    });
  };

  render() {
    return (
      <React.Fragment>
        <h5>Posts</h5>

        <Filter updatePostList={this.updatePostList} />

        <Row>
          <Table className="highlight">
            <thead>
              <tr>
                <th data-field="id">Id</th>
                <th data-field="name">Title</th>
              </tr>
            </thead>

            <tbody>
              {this.state.posts.map(post => <Item key={post.id} post={post} />)}
            </tbody>
          </Table>
        </Row>

        <ul className="pagination center-align">
          <li className="disabled">
            <a href="#!">
              <i className="material-icons">chevron_left</i>
            </a>
          </li>
          <li className="active">
            <a href="#!">1</a>
          </li>
          <li className="waves-effect">
            <a href="#!">2</a>
          </li>
          <li className="waves-effect">
            <a href="#!">3</a>
          </li>
          <li className="waves-effect">
            <a href="#!">4</a>
          </li>
          <li className="waves-effect">
            <a href="#!">5</a>
          </li>
          <li className="waves-effect">
            <a href="#!">
              <i className="material-icons">chevron_right</i>
            </a>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default List;
