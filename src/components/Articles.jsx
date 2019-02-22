import React, { Component } from "react";
import { Link } from "@reach/router";
import AddArticleForm from './AddArticleForm'
import SortBy from './SortBy'

import * as api from '../api'

class Articles extends Component {
  state = {
    articles: [],
    sort_by: '',
    order: '',
    showAddForm: false

  };
  render() {
    const { user } = this.props
    const { articles, showAddForm } = this.state;
    return <div className="">
      <p>Articles</p>
      <SortBy handleChange={this.handleChange} />
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
    const { sort_by } = this.state;
    api.fetchArticles(sort_by).then((articles) => {
      this.setState({
        articles,
      })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort_by !== this.state.sort_by) {
      const { sort_by } = this.state;
      api.fetchArticles(sort_by).then((articles) => {
        this.setState({
          articles,
        })
      })
    }
  }

  showForm = (event) => {
    this.setState({
      showAddForm: true
    })
  }

  handleChange = (event) => {
    this.setState({
      sort_by: event.target.value
    })
  }

}

export default Articles;
