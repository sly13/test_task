import React, { Component } from "react";
import Pagination from "react-js-pagination";
import { Row, Table, Navbar, NavItem, Icon, Input } from "react-materialize";
import logo from "../../logo.svg";
import { getUserPosts, getPosts, getUsers } from "../actions/UserLogin";

class List extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      users: [],
      filterText: "",
      selectedUserId: "all"
    };
  }

  // componentWillMount() {
  //   localStorage.getItem("posts") &&
  //     this.setState({
  //       posts: JSON.parse(localStorage.getItem("posts"))
  //     });
  // }

  componentDidMount() {
    this.fetchData();
    //   if (!localStorage.getItem("posts")) {
    //     this.fetchData();
    //   } else {
    //     console.log("Using data from localStorage");
    //   }

    getUsers()
      .then(res => {
        console.log("res", res);
        this.setState({ users: res.data });
      })
      .catch(error => {
        console.error("error", error.response.data.error);
        this.setState({ errors: error.response.data.error });
      });
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

  filterList = event => {
    const { selectedUserId } = this.state;
    const filterText = event.target.value;

    {
      selectedUserId == "all"
        ? this.fetchAllPosts(filterText)
        : this.fetchUserPosts(selectedUserId, filterText);
    }
  };

  fetchAllPosts = filterText => {
    getPosts()
      .then(res => {
        this.setState({
          posts: res.data.filter(function(item) {
            return (
              item.title
                .toString()
                .toLowerCase()
                .search(filterText.toLowerCase()) !== -1
            );
          })
        });
      })
      .catch(error => {
        console.error("error", error);
        this.setState({ errors: error.response.data.error });
      });
  };

  fetchUserPosts = (id, filterText) => {
    getUserPosts(id)
      .then(res => {
        this.setState({
          posts: res.data.filter(function(item) {
            return (
              item.title
                .toString()
                .toLowerCase()
                .search(filterText.toLowerCase()) !== -1
            );
          })
        });
      })
      .catch(error => {
        console.error("error", error.response.data.error);
        this.setState({ errors: error.response.data.error });
      });
  };

  filterListByUserId = ({ target: { value } }) => {
    this.setState({ selectedUserId: value });
    const { filterText } = this.state;
    this.fetchUserPosts(value, filterText);
  };

  render() {
    return (
      <React.Fragment>
        <h5>Posts</h5>

        <Row>
          <Input
            s={6}
            type="select"
            icon="account_circle"
            defaultValue="2"
            onChange={this.filterListByUserId}
          >
            <option value="all">All user's posts</option>
            {this.state.users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Input>

          <Input
            s={6}
            type="text"
            placeholder="Search"
            onChange={this.filterList}
          />
        </Row>
        <Row>
          <Table className="highlight">
            <thead>
              <tr>
                <th data-field="id">Id</th>
                <th data-field="name">Title</th>
              </tr>
            </thead>

            <tbody>
              {this.state.posts.map(post => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                </tr>
              ))}
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
