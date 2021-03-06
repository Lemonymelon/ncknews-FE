import React, { Component, Fragment } from "react";
import * as api from "../api";
import Comments from "./Comments";
import Voter from "./Voter";
import { navigate } from "@reach/router";
import "../style/SingleArticle.css";
import { capitalise } from "../utils";
import Loading from "./Loading";

class SingleArticle extends Component {
  state = {
    article: {},
    revealDelete: false,
    revealDeleteConfirm: false,
    isLoading: true,
    body: "",
    newComment: ""
  };

  render() {
    const {
      isLoading,
      revealDelete,
      revealDeleteConfirm,
      article: { title, author, comment_count, created_at, votes, topic, body }
    } = this.state;
    const username = this.props.user ? this.props.user.username : null;
    return isLoading ? (
      <Loading />
    ) : (
      <div className="singleArticleContainer">
        <div className="singleArticleHead">
          <div className="sectionHeader">{title}</div>
          <div className="articleDeets">
            <div className="articleTopic">
              <span className="label">In topic:</span>
              <span> {capitalise(topic)}</span>
            </div>
            <div className="articleAuthor">
              <span className="label">Authored by: </span>
              <span>{author}</span>
            </div>
            <div className="articleDate">
              <span className="label">Authored on:</span>
              <span> {created_at}</span>
            </div>
            <div className="articleCommentCount">
              <i className="fas fa-comment" /> : {comment_count}
            </div>
          </div>{" "}
          <Voter
            votes={votes}
            article_id={this.props.article_id}
            updateAPIvotes={this.amendArticle}
            username={username}
            author={author}
          />
        </div>

        <div className="deleteButtons">
          {revealDelete
            ? username === author && (
                <button className="deleteButton" onClick={this.revealConfirm}>
                  DELETE ARTICLE
                </button>
              )
            : null}
          {revealDeleteConfirm && (
            <button
              className="deleteButton"
              onClick={() => {
                this.deleteArticle(this.props.article_id);
              }}
            >
              As long as you're sure!
            </button>
          )}
        </div>
        <div className="singleArticleBodyAndComments">
          <p className="articleBody">{body}</p>
          <br />
          {(username && (
            <Comments
              username={this.props.user.username}
              article_id={this.props.article_id}
              author={author}
              newComment={this.state.newComment}
            />
          )) || (
            <Fragment>
              <div>Please log in to see comments</div>
            </Fragment>
          )}
        </div>

        <form className="postComment" onSubmit={this.handleSubmit}>
          <input
            className="body newComment"
            placeholder="Enter a new comment here..."
            onChange={this.handleChange}
          />
          <button className="submitButton" type="submit">
            Publish comment
          </button>
        </form>
      </div>
    );
  }

  componentDidMount() {
    const { article_id } = this.props;
    api.fetchSingleArticle(article_id).then(article => {
      this.setState({
        article,
        isLoading: false,
        revealDelete: true
      });
    });
  }

  amendArticle = async (article_id, inc_votes) => {
    await api.updateArticleVotes(article_id, inc_votes);
  };

  deleteArticle = article_id => {
    api.removeArticle(article_id);
    navigate("./");
  };

  revealConfirm = () => {
    this.setState({
      revealDelete: false,
      revealDeleteConfirm: true
    });
  };

  handleChange = event => {
    const { value } = event.target;
    this.setState({
      body: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      article_id,
      user: { username }
    } = this.props;
    const { body } = this.state;

    api.addCommentToArticle(article_id, { username, body }).then(newComment => {
      this.setState({ newComment });
    });
  };
}

export default SingleArticle;
