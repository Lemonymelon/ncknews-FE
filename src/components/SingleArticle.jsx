import React, { Component } from 'react';
import * as api from '../api'

class SingleArticle extends Component {
    state = {
        article: {},
        comments: []
    }

    render() {
        const {article: {title, author, comment_count, created_at, votes, topic, body}} = this.state;
        const {comments} = this.state;
        return (
            <div>
                <span>{topic}</span>
                <span>{title}</span>
                <span>{author}</span>
                <span>{created_at}</span>
                <p>{body}</p>
                <h2>{votes}</h2> 
                <span>{comment_count}</span>
                {comments.map(comment =>{  
                    return (
                        <div key={comment.comment_id} className="listItem">
                        <span>{comment.author}</span>
                        <span>{comment.created_at}</span>
                        <span>{comment.body}</span>
                        <h3>{comment.votes}</h3>
                      


                        </div>
                    )
                })}
            </div>
        );
    }

    componentDidMount() {
        const {article_id} = this.props;
        api.fetchSingleArticle(article_id).then(article => {
           this.setState({
            article
        })   
        }).then(api.fetchCommentsByArticle(article_id).then(comments => {
            this.setState({
                comments
            })
        }))
      
    }
}

export default SingleArticle;