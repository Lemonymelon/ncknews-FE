import React, { Component } from "react";
import * as api from "../api";
import Comments from "./Comments";
import Voter from "./Voter";
import { navigate } from "@reach/router";
import "../style/SingleArticle.css";
import { capitalise } from "../utils";

class SingleArticle extends Component {
  state = {
    article: {},
    revealDelete: false,
    revealDeleteConfirm: false,
    isLoading: true
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
      <div>LOADING</div>
    ) : (
      <div className="singleArticleContainer">
        <div className="singleArticleHead">
          <div className="sectionHeader">{title}</div>
          <div className="articleDeets">
            <div className="articleTopic">In topic: {capitalise(topic)}</div>
            <div className="articleAuthor">Authored by: {author}</div>
            <div className="articleDate">
              <span>Authored on: {created_at}</span>
            </div>
            <div className="articleCommentCount">
              <i className="fas fa-comment" /> : {comment_count}
            </div>
          </div>{" "}
          {console.log(username, author)}
          <Voter
            votes={votes}
            article_id={this.props.article_id}
            updateAPIvotes={this.amendArticle}
            username={username}
            author={author}
          />
        </div>
        {}
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
          <p>{body}</p>

          {console.log(username, author)}
          <Comments
            username={this.props.user.username}
            article_id={this.props.article_id}
            author={author}
          />
        </div>

        <form className="postComment" onSubmit={this.HandleSubmit}>
          <input id="body" onChange={this.HandleChange} />
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
    // navigate to home w/ confirmation msg
  };

  revealConfirm = () => {
    this.setState({
      revealDelete: false,
      revealDeleteConfirm: true
    });
  };
}

export default SingleArticle;
