import React, { Component } from "react";
import AddArticleForm from "./AddArticleForm";
import List from "./List";
import SortBy from "./SortBy";
import "../style/Articles.css";
import Loading from "./Loading";

class Articles extends Component {
  state = {
    showAddForm: false,
    isLoading: true,
    loginAlert: false,
    sort_by: ""
  };
  render() {
    const { user, topic } = this.props;
    const { showAddForm, isLoading, loginAlert, sort_by } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <div className="articlePageContents">
        <div className="articleHead">
          <div className="sectionHeader">Articles</div>
          <SortBy handleChange={this.handleChange} />
          <button className="addArticleButton" onClick={this.showForm}>
            {!showAddForm && "Add Article"}
            {showAddForm && "Hide Form"}
          </button>
          {loginAlert && (
            <div className="loginAlert">
              Whoops! You silly goose. Please log in to post an article.
              <br />
              <button class="addArticleButton" onClick={this.disarmAlert}>
                Never mind, just browsing!
              </button>
            </div>
          )}
          {showAddForm && <AddArticleForm user={user} topic={topic} />}
          <br />
        </div>
        <List sort_by={sort_by} topic={topic} />
      </div>
    );
  }

  componentDidMount() {
    this.setState({ isLoading: false });
    if (this.props.user)
      this.setState({
        loginAlert: false
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.user && this.props.user) {
      this.setState({
        loginAlert: false
      });
    }

    if (!this.props.user && prevProps.user) {
      this.setState({
        showAddForm: false
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  disarmAlert = event => {
    this.setState({
      loginAlert: false
    });
  };

  showForm = event => {
    if (!this.props.user) {
      this.setState({
        loginAlert: true
      });
    } else {
      this.setState({
        showAddForm: !this.state.showAddForm
      });
    }
  };

  handleChange = event => {
    this.setState({
      sort_by: event.target.value
    });
  };
}

export default Articles;
