import React, { Component } from "react";
import * as api from "../api";
import Voter from "./Voter";
import Loading from "./Loading";
import { throttle } from "lodash";

class Comments extends Component {
  state = {
    comments: [],
    p: 1,
    hasAllComments: false,
    isloading: true
  };
  render() {
    let { comments } = this.state;
    const { newComment, isLoading } = this.state;
    const { author } = this.props;

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
    this._isMounted = true;
    this.handleFetchComments();
    this.addScrollEventListener();
  }

  componentDidUpdate(prevProps, prevState) {
    const { comments } = this.state;
    const { article_id, newComment } = this.props;
    const pageUpdate = prevState.p !== this.state.p;
    const commentPosted = prevProps.newComment !== newComment;

    if (pageUpdate) {
      this.handleFetchComments();
    }

    if (commentPosted) {
      api.fetchCommentsByArticle(article_id).then(newComments => {
        this.setState({
          comments: newComments
        });
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleFetchComments = () => {
    const { article_id } = this.props;
    const { p } = this.state;
    api.fetchCommentsByArticle(article_id, p).then(comments => {
      this.setState({
        comments: [...this.state.comments, ...comments],
        isLoading: false
      });
    });
  };
  addScrollEventListener = () => {
    console.log(2);

    document
      .querySelector(".singleArticleBodyAndComments")
      .addEventListener("scroll", this.handleScroll);
  };

  handleScroll = throttle(event => {
    const { clientHeight, scrollTop, scrollHeight } = event.target;
    console.log(clientHeight, scrollTop, scrollHeight);
    const { p } = this.state;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      console.log(3);
      this.setState({
        p: p + 1
      });
    }
  }, 2000);

  amendComment = async (article_id, inc_votes, comment_id) => {
    const updatedComment = await api.updateCommentVotes(
      article_id,
      inc_votes,
      comment_id
    );
  };
}

export default Comments;
