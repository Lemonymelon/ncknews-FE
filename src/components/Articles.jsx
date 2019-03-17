import React, { Component } from "react";
import { Link } from "@reach/router";
import AddArticleForm from "./AddArticleForm";
import SortBy from "./SortBy";
import "../style/Articles.css";

import * as api from "../api";

class Articles extends Component {
  state = {
    articles: [],
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
      <div>LOADING</div>
    ) : (
      <div className="articlePageContents">
        <p className="sectionHeader">Articles</p>
        <SortBy handleChange={this.handleChange} />
        <button id="addArticleButton" onClick={this.showForm}>
          {!showAddForm && "Add Article"}
          {showAddForm && "Hide Form"}
        </button>
        {loginAlert && (
          <div className="loginAlert">
            Whoops! You silly goose. Please log in to post an article.
          </div>
        )}
        {showAddForm && <AddArticleForm user={user} />}
        <br />
        {articles.map(article => {
          const {
            article_id,
            title,
            comment_count,
            votes,
            author,
            created_at
          } = article;
          return (
            <div key={article_id} className="articleItem">
              <div className="articleTitle">
                <Link to={`/articles/${article_id}`}>
                  <span>{title}</span>
                </Link>
              </div>
              <div className="articleDate">{created_at}</div>
              <div className="articleAuthor">{author}</div>
              <div className="articleDeets">deets</div>
              <br />
            </div>
          );
        })}
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
      api.fetchArticlesByTopic(topic).then(articles => {
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
      api.fetchArticles(sort_by).then(articles => {
        this.setState({
          articles
        });
      });
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
