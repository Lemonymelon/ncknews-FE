import React, { Component, Fragment } from "react";
import * as api from "../api";
import { Link } from "@reach/router";
import "../style/Topics.css";
import { capitalise } from "../utils";
import Loading from "./Loading";

class Topics extends Component {
  state = {
    topics: [],
    isLoading: true
  };
  render() {
    const { topics, isLoading } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <div className="topicPageContents">
        {topics.map(topic => {
          const { slug } = topic;
          return (
            <Fragment key={slug}>
              <Link to={`${slug}/articles`}>
                <div className="topicListItem">
                  <div>{capitalise(slug)}</div>
                </div>
              </Link>
            </Fragment>
          );
        })}
      </div>
    );
  }

  componentDidMount() {
    api.fetchTopics().then(topics => {
      this.setState({ topics, isLoading: false });
    });
  }
}

export default Topics;
