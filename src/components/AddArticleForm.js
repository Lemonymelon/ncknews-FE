import React, { Component } from 'react';
import * as api from '../api'




class AddArticleForm extends Component {
    state = {
        topics: [],
        topic: '',
        title: '',
        body: ''
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
                    <input onChange={this.handleChange} type="text" id="title" required />
                    <input type="text" id="body" required onChange={this.handleChange} />
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
        }).then(({ res }) => {
            console.log(res, 'r')
        }).catch((err) => {
            console.log(err, 'e');
        });


    }
}

export default AddArticleForm;

{/* require array of topics in */ }