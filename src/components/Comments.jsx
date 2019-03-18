import React, { Component } from "react";
import * as api from "../api";
import Voter from "./Voter";

class Comments extends Component {
  state = {
    body: "",
    comments: []
  };
  render() {
    const { comments } = this.state;
    return (
      <div className="singleArticleComments">
        {this.props.user && (
          <form onSubmit={this.HandleSubmit}>
            <input id="body" onChange={this.HandleChange} />
            <button type="submit">PUBLISH COMMENT</button>
          </form>
        )}
        {comments.map(comment => {
          const { comment_id, author, created_at, body, votes } = comment;
          return (
            <div key={comment_id} className="listItem">
              <span>{author}</span>
              <span>{created_at}</span>
              <span>{body}</span>

              <Voter
                votes={votes}
                article_id={this.props.article_id}
                comment_id={comment_id}
                updateAPIvotes={this.amendComment}
              />
            </div>
          );
        })}
      </div>
    );
  }

  componentDidMount() {
    const { article_id } = this.props;
    api.fetchCommentsByArticle(article_id).then(comments => {
      this.setState({
        comments
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.comments !== this.state.comments) {
      // ASK
    }
  }

  amendComment = async (article_id, inc_votes, comment_id) => {
    const updatedComment = await api.updateCommentVotes(
      article_id,
      inc_votes,
      comment_id
    );
    console.log(updatedComment);
  };

  HandleChange = event => {
    const { value } = event.target;
    this.setState({
      body: value
    });
  };

  HandleSubmit = event => {
    event.preventDefault();
    const {
      article_id,
      user: { username }
    } = this.props;
    const { body } = this.state;
    api.addCommentToArticle(article_id, { username, body });
  };
}

export default Comments;
