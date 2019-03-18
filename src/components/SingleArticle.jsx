import React, { Component } from "react";
import * as api from "../api";
import Comments from "./Comments";
import Voter from "./Voter";
import { navigate } from "@reach/router";

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
    console.log(username);
    return isLoading ? (
      <div>LOADING</div>
    ) : (
      <div className="singleArticleContainer">
        <div className="singleArticleHead">
          <p className="sectionHeader">{title}</p>
          <span>In topic: {topic}</span>
          <span>{author}</span>
          <span>{created_at}</span>
          <span>comment count: {comment_count}</span>
          {
            <Voter
              votes={votes}
              article_id={this.props.article_id}
              updateAPIvotes={this.amendArticle}
              username={username}
              author={author}
            />
          }
          <div className="deleteButtons">
            {revealDelete
              ? username === author && (
                  <button onClick={this.revealConfirm}>DELETE ARTICLE</button>
                )
              : null}
            {revealDeleteConfirm && (
              <button
                onClick={() => {
                  this.deleteArticle(this.props.article_id);
                }}
              >
                As long as you're sure!
              </button>
            )}
          </div>
          <div className="singleArticleBody">
            <p>{body}</p>
          </div>
        </div>
        <Comments user={this.props.user} article_id={this.props.article_id} />
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
