import React, { Component } from "react";
import Pagination from "react-js-pagination";
import { Row, Table, Icon, Col, ProgressBar } from "react-materialize";
import { getPosts } from "../actions/UserLogin";
import Filter from "../post/Filter";
import Item from "../post/Item";

class List extends Component {
  state = {
    posts: [],
    activePage: 1,
    currentPage: 1,
    perPage: 10,
    isLoading: false
  };

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    getPosts()
      .then(res => {
        this.setState({ posts: res.data, isLoading: true });
      })
      .catch(error => {
        console.error("error", error.response.data.error);
        this.setState({ errors: error.response.data.error });
      });
  }

  updatePostList = posts => {
    this.setState({
      posts,
      currentPage: 1,
      activePage: 1
    });
  };

  updatePerPageCount = count => {
    this.setState({
      perPage: count
    });
  };

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber, currentPage: pageNumber });
  };

  render() {
    const { perPage, currentPage, activePage, posts } = this.state;
    const pages = Math.ceil(posts.length / perPage);
    const start_offset = (currentPage - 1) * perPage;
    let start_count = 0;

    return (
      <React.Fragment>
        <h5 className="center-align">Posts</h5>

        <Filter
          updatePostList={this.updatePostList}
          updatePerPageCount={this.updatePerPageCount}
        />

        {this.state.isLoading ? (
          <Row>
            {posts.length > 0 ? (
              <React.Fragment>
                <Table className="highlight">
                  <thead>
                    <tr>
                      <th data-field="id">Id</th>
                      <th data-field="name">Title</th>
                    </tr>
                  </thead>

                  <tbody>
                    {posts.map((post, index) => {
                      if (index >= start_offset && start_count < perPage) {
                        start_count++;
                        return <Item key={post.id} post={post} />;
                      }
                    })}
                  </tbody>
                </Table>

                <Pagination
                  innerClass="pagination center-align"
                  activePage={activePage}
                  itemsCountPerPage={perPage}
                  totalItemsCount={posts.length}
                  pageRangeDisplayed={pages}
                  onChange={this.handlePageChange}
                />
              </React.Fragment>
            ) : (
              <div className="center-align">
                <h5>
                  Nothing found <Icon> mood_bad </Icon>
                </h5>
              </div>
            )}
          </Row>
        ) : (
          <Row>
            <Col s={12}>
              <ProgressBar />
            </Col>
          </Row>
        )}
      </React.Fragment>
    );
  }
}

export default List;
