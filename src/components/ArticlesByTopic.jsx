import React, { Component } from 'react';
import { Link } from "@reach/router";
import AddArticleForm from './AddArticleForm'

import * as api from '../api'

class ArticlesByTopic extends Component {
    state = {
        articles: [],
        showAddForm: true,
        isLoading: true
    }

    render() {
        const { user, topic } = this.props
        const { articles, showAddForm, isLoading } = this.state;
        console.log(topic)

        return (
            isLoading ? <div>LOADING</div> :
                <div>
                    <button id="addArticleButton" onClick={this.showForm}>Add Article to {topic}</button>
                    {showAddForm && <AddArticleForm user={user} topic={topic} />}
                    <br />
                    {articles.map(article => {
                        return (
                            <div key={article.article_id}>
                                <Link to={`/articles/${article.article_id}`} ><span>{article.title} || votes: {article.votes} || comments: {article.comment_count}</span></Link>
                                <br />
                            </div>
                        )
                    })}

                </div>)

    }

    componentDidMount() {
        const { topic } = this.props;
        api.fetchArticlesByTopic(topic).then((articles) => {

            this.setState({
                articles,
                isLoading: false
            })
        })
    }
}

export default ArticlesByTopic;