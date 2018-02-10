import React, { Component } from "react";
import Pagination from "react-js-pagination";
import { Row, Table, Navbar, NavItem, Icon, Input } from "react-materialize";
import logo from "../../logo.svg";

class List extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      activePage: 1
    };
  }

  handlePageChange = pageNumber => {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  };

  componentDidMount() {
    const users = [];
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(json => this.setState({ posts: json }))
      .catch(err => {
        console.log(err);
      });
  }

  filterList = event => {
    var postList = this.state.posts;
    postList = postList.filter(function(item) {
      return (
        item.title
          .toString()
          .toLowerCase()
          .search(event.target.value.toLowerCase()) !== -1
      );
    });
    this.setState({ posts: postList });
  };

  filterListByUserId = event => {
    var postList = this.state.posts;
    postList = postList.filter(function(item) {
      return (
        item.userId
          .toString()
          .toLowerCase()
          .search(event.target.value.toLowerCase()) !== -1
      );
    });
    this.setState({ posts: postList });
  };

  render() {
    let usersId = [...new Set(this.state.posts.map(item => item.userId))];

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
            {usersId.map(userId => (
              <option key={userId} value={userId}>
                UserId {userId}
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

        <ul class="pagination">
          <li class="disabled">
            <a href="#!">
              <i class="material-icons">chevron_left</i>
            </a>
          </li>
          <li class="active">
            <a href="#!">1</a>
          </li>
          <li class="waves-effect">
            <a href="#!">2</a>
          </li>
          <li class="waves-effect">
            <a href="#!">3</a>
          </li>
          <li class="waves-effect">
            <a href="#!">4</a>
          </li>
          <li class="waves-effect">
            <a href="#!">5</a>
          </li>
          <li class="waves-effect">
            <a href="#!">
              <i class="material-icons">chevron_right</i>
            </a>
          </li>
        </ul>

        {/* <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        /> */}
      </React.Fragment>
    );
  }
}

export default List;
