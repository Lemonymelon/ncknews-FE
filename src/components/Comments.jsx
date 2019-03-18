import React, { Component } from "react";
import * as api from "../api";
import Voter from "./Voter";

class Comments extends Component {
  state = {
    comments: []
  };
  render() {
    const { comments, newComment } = this.state;
    const { username, author } = this.props;

    return (
      <div className="singleArticleComments">
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
                username={username}
                author={author}
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
      console.log("CDM: ", comments);
      this.setState({
        comments
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { comments } = this.state;
    console.log("CDU PRV: ", prevState.comments);
    console.log("CDU NEW: ", comments);

    const { article_id } = this.props;

    if (
      prevState.comments[0] &&
      prevState.comments[0].comment_id !== comments[0].comment_id
    ) {
      api.fetchCommentsByArticle(article_id).then(newComments => {
        console.log("NEW COMMENTS", newComments);
        this.setState({
          comments: newComments
        });
      });
    }
  }

  amendComment = async (article_id, inc_votes, comment_id) => {
    const updatedComment = await api.updateCommentVotes(
      article_id,
      inc_votes,
      comment_id
    );
  };
}

export default Comments;
