import React, { Component } from "react";
import { getUsers, getUserPosts, getPosts } from "../actions/UserLogin";
import { Row, Table, Navbar, NavItem, Icon, Input } from "react-materialize";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      filterText: "",
      selectedUserId: "all"
    };
  }

  componentDidMount() {
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

  filterListByUserId = ({ target: { value } }) => {
    this.setState({ selectedUserId: value });
    const { filterText } = this.state;
    this.fetchUserPosts(value, filterText);
  };

  fetchUserPosts = (id, filterText) => {
    console.log(id, filterText);
    getUserPosts(id)
      .then(res => {
        this.props.updatePostList(
          res.data.filter(function(item) {
            return (
              item.title
                .toString()
                .toLowerCase()
                .search(filterText.toLowerCase()) !== -1
            );
          })
        );
      })
      .catch(error => {
        console.error("error", error);
        this.setState({ errors: error.response.data.error });
      });
  };

  filterListByText = event => {
    const { selectedUserId } = this.state;
    const filterText = event.target.value;
    this.setState({
      filterText
    });

    {
      selectedUserId == "all"
        ? this.fetchAllPosts(filterText)
        : this.fetchUserPosts(selectedUserId, filterText);
    }
  };

  fetchAllPosts = filterText => {
    getPosts()
      .then(res => {
        this.props.updatePostList(
          res.data.filter(function(item) {
            return (
              item.title
                .toString()
                .toLowerCase()
                .search(filterText.toLowerCase()) !== -1
            );
          })
        );
      })
      .catch(error => {
        console.error("error", error);
        this.setState({ errors: error.response.data.error });
      });
  };

  render() {
    return (
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
          onChange={this.filterListByText}
          autoComplete="off"
        />
      </Row>
    );
  }
}

export default Filter;
