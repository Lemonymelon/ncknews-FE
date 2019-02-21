import React, { Component } from 'react';
import * as api from '../api'




class AddArticleForm extends Component {
    state = {
        topics: []
    }
    render() {
        const {topics} = this.state;
        console.log(topics)
        return (
            <div>
                <form onSubmit={}>
                <select name="topic" id="topic">
                <option value=""  defaultValue>Please select the topic</option>
                {topics.map(topic => {
                    return (
                        <option key={topic.slug} value={topic.slug}>{topic.slug}</option>
                    )
                })}
                </select>
                <input type="text" id="title"/>
                <input type="text" id="body"/>
                <button type="submit"/>
            </form>
            </div>
        );
    }

    componentDidMount() {
        api.fetchTopics().then((topics) => {
          this.setState({ topics,
           })
        })
      }

      handleSubmit = (event) => {
        
      }
    }

export default AddArticleForm;

{/* require array of topics in */}