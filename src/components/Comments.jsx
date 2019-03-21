import React, { Component } from "react";
import * as api from "../api";
import Voter from "./Voter";
import Loading from "./Loading";

class Comments extends Component {
  state = {
    comments: [],
    isloading: true
  };
  render() {
    const { comments, newComment, isLoading } = this.state;
    const { username, author } = this.props;
    {
    }
    return isLoading ? (
      <Loading />
    ) : (
      <div className="singleArticleComments">
        {comments.map(comment => {
          const { comment_id, username, created_at, body, votes } = comment;
          return (
            <div key={comment_id} className="listItem">
              <span>{username} @ </span>
              <span>{created_at}: </span>
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
      this.setState({
        comments,
        isLoading: false
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { comments } = this.state;

    const { article_id } = this.props;

    if (
      prevState.comments[0] &&
      prevState.comments[0].comment_id !== comments[0].comment_id
    ) {
      api.fetchCommentsByArticle(article_id).then(newComments => {
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
