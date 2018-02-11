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
      posts: [],
      activePage: 1,
      page: 1
    };
  }

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber, page: pageNumber });
  };

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
      posts,
      page: 1
    });
  };

  render() {
    const per_page = 10;
    const pages = Math.ceil(this.state.posts.length / per_page);
    const current_page = this.state.page;
    const start_offset = (current_page - 1) * per_page;
    let start_count = 0;

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
              {this.state.posts.map((post, index) => {
                if (index >= start_offset && start_count < per_page) {
                  start_count++;
                  return <Item key={post.id} post={post} />;
                }
              })}
            </tbody>
          </Table>
          <Pagination
            innerClass="pagination center-align"
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={this.state.posts.length}
            pageRangeDisplayed={10}
            onChange={this.handlePageChange}
          />
        </Row>
      </React.Fragment>
    );
  }
}

export default List;
