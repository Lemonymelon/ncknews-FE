import React, { Component } from "react";
import { Link } from "@reach/router";
import { throttle } from "lodash";
import * as api from "../api";

class List extends Component {
  state = {
    articles: [],
    p: 1,
    hasAllArticles: false,
    sort_by: "",
    order: ""
  };
  render() {
    let { articles } = this.state;
    console.log(this.state.p, "<-- p");
    return (
      <div className="articleList">
        {articles.map(article => {
          const {
            article_id,
            title,
            comment_count,
            votes,
            author,
            created_at
          } = article;
          return (
            <Link key={article_id} to={`/articles/${article_id}`}>
              <div className="articleItem">
                <div className="articleTitle">
                  <span>{title}</span>
                </div>
                <div className="articleDate">
                  <span>Authored on: {created_at}</span>
                </div>
                <div className="articleAuthor">by {author}</div>
                <div className="articleDeets">
                  <span>
                    <i className="fas fa-comment" /> : {comment_count}
                  </span>
                  <span>
                    <i className="fas fa-smile-beam" /> : {votes}
                  </span>
                </div>
                <br />
              </div>
            </Link>
          );
        })}
      </div>
    );
  }

  componentDidMount() {
    this._isMounted = true;
    this.addScrollEventListener();

    this.handleFetchArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    const sortUpdate = prevState.sort_by !== this.state.sort_by;
    const pageUpdate = prevState.p !== this.state.p;

    if (sortUpdate) {
      this.handleFetchArticles();
    }

    if (pageUpdate) {
      this.handleFetchArticles();
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  handleFetchArticles = () => {
    const { sort_by, p } = this.state;

    if (this.props.topic) {
      const { topic } = this.props;
      api.fetchArticlesByTopic(topic, sort_by, p).then(articles => {
        this.setState({
          articles
        });
      });
    } else {
      api.fetchArticles(sort_by, p).then(articles => {
        this.setState({
          articles: [...this.state.articles, ...articles],
          isLoading: false
        });
      });
    }
  };

  addScrollEventListener = () => {
    console.log(2);

    document
      .querySelector(".articleList")
      .addEventListener("scroll", this.handleScroll);
  };

  handleScroll = throttle(event => {
    console.log(3);

    const { clientHeight, scrollTop, scrollHeight } = event.target;
    console.log(clientHeight, scrollTop, scrollHeight);
    const { p } = this.state;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      console.log(4);
      this.setState({
        p: p + 1
      });
    }
  }, 2000);
}

export default List;
