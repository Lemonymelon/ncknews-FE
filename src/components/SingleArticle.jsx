import React, { Component } from 'react';
import * as api from '../api'
import Comments from './Comments'
import Voter from './Voter'

class SingleArticle extends Component {
    state = {
        article: {},
        revealDeleteConfirm: false
    }

    render() {
        const { revealDeleteConfirm, article: { title, author, comment_count, created_at, votes, topic, body } } = this.state;
        const username = this.props.user ? this.props.user.username : null;
        //  const { author: { title, author, comment_count, created_at, votes, topic, body } } = username ? this.state : null;

        return (
            <div>
                {username ? username === author && <button onClick={this.RevealConfirm}>DELETE ARTICLE</button> : null}

                {revealDeleteConfirm && <button onClick={() => { this.DeleteArticle(this.props.article_id) }}>Properly, actually delete article for realzies</button>}

                <span>{topic}</span>
                <span>{title}</span>
                <span>{author}</span>
                <span>{created_at}</span>
                <p>{body}</p>
                <Voter votes={votes} article_id={this.props.article_id} updateAPIvotes={this.AmendArticle} />
                <span>comment count: {comment_count}</span>
                <Comments user={this.props.user} article_id={this.props.article_id} />
            </div>
        );
    }

    componentDidMount() {
        const { article_id } = this.props;
        api.fetchSingleArticle(article_id).then(article => {
            this.setState({
                article
            })
        })
    }

    AmendArticle = async (article_id, inc_votes) => {
        const [updatedArticle] = await api.updateArticleVotes(article_id, inc_votes);
        console.log(updatedArticle)
        this.setState({
            article: updatedArticle
        })
    }

    DeleteArticle = (article_id) => {
        api.removeArticle(article_id)
        // navigate to home w/ confirmation msg
    }

    RevealConfirm = () => {
        this.setState({
            revealDeleteConfirm: true
        })
    }
}

export default SingleArticle;