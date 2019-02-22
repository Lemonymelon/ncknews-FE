import React, { Component } from 'react';
import * as api from '../api'

class Comments extends Component {
    state = {
        body: '',
        comments: []
    }
    render() {
        const { comments } = this.state;
        return (
            <div>
                {this.props.user && <form onSubmit={this.HandleSubmit}>
                    <input id="body" onChange={this.HandleChange} />
                    <button type="submit">PUBLISH COMMENT</button>
                </form>}
                {comments.map(comment => {
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
        const { article_id } = this.props;
        (api.fetchCommentsByArticle(article_id).then(comments => {
            this.setState({
                comments
            })
        }))
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.comments !== this.state.comments) {
            // ASK
        }
    }

    HandleChange = (event) => {
        const { value } = event.target;
        console.log(value)
        this.setState({
            body: value

        })
    }

    HandleSubmit = (event) => {
        event.preventDefault();
        const { article_id, user: { username } } = this.props;
        const { body } = this.state;
        api.addCommentToArticle(article_id, { username, body })
    }


}

export default Comments;