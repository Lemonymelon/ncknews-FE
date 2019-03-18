import React, { Component } from "react";
import { Link } from "@reach/router";

class List extends Component {
  state = {
    articles: []
  };
  render() {
    const { articles } = this.state;
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
                <div className="articleDate">{created_at}</div>
                <div className="articleAuthor">{author}</div>
                <div className="articleDeets">
                  <i className="fas fa-comment" /> : {comment_count}{" "}
                  <i className="fas fa-smile-beam" /> : {votes}
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
    const { articles } = this.props;
    this.setState({
      articles
    });
  }

  componentDidUpdate(prevProps) {
    const { articles } = this.props;
    if (prevProps.articles !== articles) {
      this.setState({
        articles
      });
    }
  }
}

export default List;
