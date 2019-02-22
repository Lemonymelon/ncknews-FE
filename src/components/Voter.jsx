import React, { Component } from 'react';
import * as api from '../api'

class Voter extends Component {
    state = {
        voteChange: 0,
    }
    render() {
        const { votes } = this.props;
        const { voteChange } = this.state;
        console.log(voteChange, votes)
        return (

            < section >
                {voteChange < 1 ? <button onClick={() => { this.Vote(1) }}> UP</button > : <button disabled>UP</button>}
                <p>votes: {votes + voteChange}</p>
                {voteChange > -1 ? <button onClick={() => { this.Vote(-1) }}>DOWN</button> : <button disabled>DOWN</button>}
            </section >
        );
    }
    Vote = async (inc_votes) => {
        console.log(inc_votes, 'voter')
        // make call -> ignore returned votes
        this.props.updateAPIvotes(this.props.article_id, inc_votes);

        this.setState((prevState) => {
            return { voteChange: prevState.voteChange + inc_votes }
        })
        // this.props.updateAPIvotes(this.props.article_id, { inc_votes })
    }

}

export default Voter;