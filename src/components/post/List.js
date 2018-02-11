import React, { Component } from "react";
import Pagination from "react-js-pagination";
import { Row, Table } from "react-materialize";
import logo from "../../logo.svg";
import { getPosts } from "../actions/UserLogin";
import Filter from "../post/Filter";
import Item from "../post/Item";

class List extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      activePage: 1,
      currentPage: 1,
      perPage: 5
    };
  }

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber, currentPage: pageNumber });
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
      currentPage: 1
    });
  };

  updatePerPageCount = count => {
    this.setState({
      perPage: count
    });
  };

  render() {
    const { perPage, currentPage } = this.state;
    const pages = Math.ceil(this.state.posts.length / perPage);
    const start_offset = (currentPage - 1) * perPage;
    let start_count = 0;

    return (
      <React.Fragment>
        <h5>Posts</h5>

        <Filter
          updatePostList={this.updatePostList}
          updatePerPageCount={this.updatePerPageCount}
        />

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
                if (index >= start_offset && start_count < perPage) {
                  start_count++;
                  return <Item key={post.id} post={post} />;
                }
              })}
            </tbody>
          </Table>
          <Pagination
            innerClass="pagination center-align"
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.perPage}
            totalItemsCount={this.state.posts.length}
            pageRangeDisplayed={pages}
            onChange={this.handlePageChange}
          />
        </Row>
      </React.Fragment>
    );
  }
}

export default List;
