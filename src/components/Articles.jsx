import React, { Component, Fragment } from "react";
import { Link } from "@reach/router";
import AddArticleForm from "./AddArticleForm";
import List from "./List";
import SortBy from "./SortBy";
import "../style/Articles.css";
import Loading from "./Loading";

import * as api from "../api";

class Articles extends Component {
  state = {
    articles: [],
    page: 1,
    sort_by: "",
    order: "",
    showAddForm: false,
    isLoading: true,
    loginAlert: false
  };
  render() {
    const { user } = this.props;
    const { articles, showAddForm, isLoading, loginAlert } = this.state;
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
          {showAddForm && <AddArticleForm user={user} />}
          <br />
        </div>
        <List articles={articles} />
      </div>
    );
  }

  componentDidMount() {
    const { sort_by } = this.state;
    if (this.props.user)
      this.setState({
        loginAlert: false
      });
    if (this.props.topic) {
      const { topic } = this.props;
      api.fetchArticlesByTopic(topic, sort_by).then(articles => {
        this.setState({
          articles,
          isLoading: false
        });
      });
    } else {
      api.fetchArticles(sort_by).then(articles => {
        this.setState({
          articles,
          isLoading: false
        });
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort_by !== this.state.sort_by) {
      const { sort_by } = this.state;
      if (this.props.topic) {
        const { topic } = this.props;
        api.fetchArticlesByTopic(topic, sort_by).then(articles => {
          this.setState({
            articles,
            isLoading: false
          });
        });
      } else {
        api.fetchArticles(sort_by).then(articles => {
          this.setState({
            articles
          });
        });
      }
    }

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
