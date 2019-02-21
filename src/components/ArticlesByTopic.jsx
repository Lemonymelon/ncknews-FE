import React, { Component } from 'react';
import { Link } from "@reach/router";
import * as api from '../api'

class ArticlesByTopic extends Component {
    state = {
        articles: []
    }

    render() {
        
        const {articles} = this.state;
        return <div>
                
                {articles.map(article => {
                   return (
                   <div key={article.article_id}>
            <Link to={`/articles/${article.article_id}`} ><span>{article.title} || votes: {article.votes} || comments: {article.comment_count}</span></Link>
                    <br/>
                    </div>
                   )
                })}
                
            </div>
        
    }

    componentDidMount() {
        const {topic} = this.props;
        api.fetchArticlesByTopic(topic).then((articles) => {

          this.setState({ articles,
           })
        })
      }
}

export default ArticlesByTopic;