import React, { Component } from "react";
import * as api from "../api";

class Voter extends Component {
  state = {
    voteChange: 0,
    showLoginMessage: false,
    showOwnVoteMessage: false
  };
  render() {
    const { votes } = this.props;
    const { voteChange, showLoginMessage, showOwnVoteMessage } = this.state;
    return (
      <section>
        {voteChange < 1 ? (
          <button
            className="upButton"
            onClick={() => {
              this.Vote(1);
            }}
          >
            {" "}
            UP
          </button>
        ) : (
          <button disabled>UP</button>
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
            DOWN
          </button>
        ) : (
          <button disabled>DOWN</button>
        )}

        {showLoginMessage && <div>You must log in to vote!</div>}
        {showOwnVoteMessage && <div>You can't vote on your own content!</div>}
      </section>
    );
  }
  Vote = async inc_votes => {
    console.log(inc_votes, "voter");
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

  componentDidUpdate(prevProps) {
    const { showLoginMessage, showOwnVoteMessage } = this.state;
    const { username } = this.props;
    if (!prevProps.username && username) {
      this.setState({ showLoginMessage: false, showOwnVoteMessage: false });
    }
  }
}

export default Voter;
