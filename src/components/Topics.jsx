import React, { Component } from "react";
import * as api from "../api";
import { Link } from "@reach/router";

class Topics extends Component {
  state = {
    topics: []
  };
  render() {
    const { topics } = this.state;
    return (
      <div className="topicPageContents">
        {topics.map(topic => {
          return (
            <div key={topic.slug} className="listItem">
              <Link to={`${topic.slug}/articles`}>
                <span>{topic.slug}</span>
              </Link>
              <br />
            </div>
          );
        })}
      </div>
    );
  }

  componentDidMount() {
    api.fetchTopics().then(topics => {
      this.setState({ topics });
    });
  }
}

export default Topics;
