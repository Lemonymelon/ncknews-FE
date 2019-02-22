import React, { Component } from "react";
import { Link } from "@reach/router";
import AddArticleForm from './AddArticleForm'


import * as api from '../api'

class Articles extends Component {
  state = {
    articles: [],
    showAddForm: false

  };
  render() {
    const { user } = this.props
    const { articles, showAddForm } = this.state;
    return <div className="">
      <p>Articles</p>
      <button id="addArticleButton" onClick={this.showForm}>Add Article</button>
      {showAddForm && <AddArticleForm user={user} />}
      <br />
      {articles.map(article => {
        return (
          <div key={article.article_id}>
            <Link to={`/articles/${article.article_id}`} ><span>{article.title} || votes: {article.votes} || comments: {article.comment_count}</span></Link>
            <br />
          </div>
        )
      })}
    </div>
  }

  componentDidMount() {
    api.fetchArticles().then((articles) => {
      this.setState({
        articles,
      })
    })
  }

  showForm = (event) => {
    this.setState({
      showAddForm: true
    })
  }


}

export default Articles;
