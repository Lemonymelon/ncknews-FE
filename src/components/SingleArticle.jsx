import React, { Component } from 'react';
import * as api from '../api'
import Comments from './Comments'
import Voter from './Voter'
import { navigate } from '@reach/router'



class SingleArticle extends Component {
    state = {
        article: {},
        revealDeleteConfirm: false,
        isLoading: true
    }

    render() {
        const { isLoading, revealDeleteConfirm, article: { title, author, comment_count, created_at, votes, topic, body } } = this.state;
        const username = this.props.user ? this.props.user.username : null;

        return isLoading ? <div>LOADING</div> : <div>

            {username ? username === author && <button onClick={this.revealConfirm}>DELETE ARTICLE</button> : null}

            {revealDeleteConfirm && <button onClick={() => { this.deleteArticle(this.props.article_id) }}>Delete for realzies</button>}

            <span>{topic}</span>
            <span>{title}</span>
            <span>{author}</span>
            <span>{created_at}</span>
            <p>{body}</p>
            <Voter votes={votes} article_id={this.props.article_id} updateAPIvotes={this.amendArticle} />
            <span>comment count: {comment_count}</span>
            <Comments user={this.props.user} article_id={this.props.article_id} />
        </div>

    }

    componentDidMount() {
        const { article_id } = this.props;
        api.fetchSingleArticle(article_id).then(article => {
            this.setState({
                article,
                isLoading: false
            })
        })
    }

    amendArticle = async (article_id, inc_votes) => {
        await api.updateArticleVotes(article_id, inc_votes);
    }

    deleteArticle = (article_id) => {
        api.removeArticle(article_id)
        navigate('./')
        // navigate to home w/ confirmation msg
    }

    revealConfirm = () => {
        this.setState({
            revealDeleteConfirm: true
        })
    }
}

export default SingleArticle;