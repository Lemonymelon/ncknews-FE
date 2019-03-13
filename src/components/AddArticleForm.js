import React, { Component } from 'react';
import * as api from '../api'
import { navigate } from '@reach/router'




class AddArticleForm extends Component {
    state = {
        topics: [],
        topic: '',
        title: '',
        body: '',
        newArticleID: null
    }
    render() {
        const { topics } = this.state;
        const { topic } = this.props


        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {this.props.topic ? null : <select name="topic" id="topic" required onChange={this.handleChange}>
                        <option value="" defaultValue>Please select the topic</option>
                        {topics.map(topic => {
                            return (
                                <option key={topic.slug} value={topic.slug}>{topic.slug}</option>
                            )
                        })}
                    </select>}
                    <input onChange={this.handleChange} type="text" id="title" placeholder="Title" required />
                    <input type="text" id="body" required onChange={this.handleChange} placeholder="Body" />
                    <button type="submit">POST</button>
                </form>
            </div>
        );
    }

    componentDidMount() {
        api.fetchTopics().then((topics) => {
            this.setState({
                topics,
            })
        })
    }

    componentDidUpdate() {
        const { newArticleID } = this.state
        if (newArticleID) navigate(`/articles/${newArticleID}`)
    }

    handleChange = (event, { id } = event.target) => {
        const { value } = event.target
        this.setState({
            [id]: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { title, body } = this.state;;
        let { topic } = this.state
        const { user: { username } } = this.props;
        if (this.props.topic) topic = this.props.topic;

        api.addArticle(topic, {
            title,
            body,
            username
        }).then(({ article_id }) => {
            this.setState({ newArticleID: 1 })
        }).catch((err) => {
            console.log(err, '<<-error');
        });


    }
}

export default AddArticleForm;

