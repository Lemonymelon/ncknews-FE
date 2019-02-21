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
        console.log(this.state)

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <select name="topic" id="topic" required onChange={this.handleChange}>
                        <option value="" defaultValue>Please select the topic</option>
                        {topics.map(topic => {
                            return (
                                <option key={topic.slug} value={topic.slug}>{topic.slug}</option>
                            )
                        })}
                    </select>
                    <input onChange={this.handleChange} type="text" id="title" required />
                    <input type="text" id="body" required onChange={this.handleChange} />
                    <button type="submit" />
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
        // console.log(articleObject)

    }
}

export default AddArticleForm;

{/* require array of topics in */ }