import React, { Component } from "react";
import * as api from "../api";

class Voter extends Component {
  state = {
    voteChange: 0,
    showLoginMessage: false,
    showOwnVoteMessage: false,
    username: null,
    author: null
  };
  render() {
    const { votes, username, author } = this.props;

    const { voteChange, showLoginMessage, showOwnVoteMessage } = this.state;
    return (
      <section className="voter">
        {voteChange < 1 ? (
          <button
            className="upButton"
            onClick={() => {
              this.Vote(1);
            }}
          >
            <i className="fas fa-arrow-up" />
          </button>
        ) : (
          <button className="upButton" disabled>
            <i className="fas fa-arrow-up" />
          </button>
        )}
        <span>
          {" Votes: "} {votes + voteChange} {"    "}
        </span>
        {voteChange > -1 ? (
          <button
            className="downButton"
            onClick={() => {
              this.Vote(-1);
            }}
          >
            <i className="fas fa-arrow-down" />
          </button>
        ) : (
          <button className="downButton" disabled>
            <i className="fas fa-arrow-down" />
          </button>
        )}

        {showLoginMessage && (
          <div className="loginAlert">You must log in to vote!</div>
        )}
        {showOwnVoteMessage && (
          <div className="loginAlert">You can't vote on your own content!</div>
        )}
      </section>
    );
  }
  Vote = async inc_votes => {
    const { username, author } = this.props;
    if (!username) {
      this.setState({
        showLoginMessage: true
      });
    } else if (username === author) {
      this.setState({
        showOwnVoteMessage: true
      });
    } else {
      this.props.updateAPIvotes(
        this.props.article_id,
        inc_votes,
        this.props.comment_id
      );

      this.setState(prevState => {
        return {
          voteChange: prevState.voteChange + inc_votes,
          showLoginMessage: false,
          showOwnVoteMessage: false
        };
      });
    }
  };

  componentDidMount() {
    const { showLoginMessage, showOwnVoteMessage } = this.state;
    const { username, author } = this.props;

    this.setState({
      username,
      author,
      showLoginMessage: false,
      showOwnVoteMessage: false
    });
  }

  componentDidUpdate(prevProps) {
    const { showLoginMessage, showOwnVoteMessage } = this.state;
    const { username } = this.props;
    if (!prevProps.username && username) {
      this.setState({ showLoginMessage: false, showOwnVoteMessage: false });
    }
  }
}

export default Voter;
