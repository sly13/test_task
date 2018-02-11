import React, { Component } from "react";
import { getUsers, getUserPosts, getPosts } from "../actions/UserLogin";
import { Row, Input } from "react-materialize";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      filterText: "",
      selectedUserId: "all"
    };
  }

  componentWillMount() {
    getUsers()
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(error => {
        console.error("error", error);
      });
  }

  filterListByUserId = ({ target: { value } }) => {
    this.setState({ selectedUserId: value });
    const { filterText } = this.state;
    this.fetchUserPosts(value, filterText);
  };

  fetchUserPosts = (id, filterText) => {
    if (id === "all") {
      this.fetchAllPosts(filterText);
    } else {
      getUserPosts(id)
        .then(res => {
          this.props.updatePostList(
            res.data.filter(
              item =>
                item.title
                  .toString()
                  .toLowerCase()
                  .search(filterText.toLowerCase()) !== -1
            )
          );
        })
        .catch(error => {
          console.error("error", error);
        });
    }
  };

  filterListByText = event => {
    const { selectedUserId } = this.state;
    const filterText = event.target.value;

    if (filterText.length >= 3 || filterText.length === 0) {
      this.setState({
        filterText
      });

      if (selectedUserId === "all") {
        this.fetchAllPosts(filterText);
      } else {
        this.fetchUserPosts(selectedUserId, filterText);
      }
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
      });
  };

  changePerPageCount = ({ target: { value } }) => {
    this.props.updatePerPageCount(value);
  };

  render() {
    return (
      <Row>
        <Input
          s={5}
          type="select"
          icon="account_circle"
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
          s={5}
          type="text"
          placeholder="Search"
          onChange={this.filterListByText}
          autoComplete="off"
        />

        <Input s={2} type="select" onChange={this.changePerPageCount} value="10">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </Input>
      </Row>
    );
  }
}

export default Filter;
