import React, { Component } from 'react';

class Voter extends Component {
    state = {
        voteChange: 0
    }
    render() {
        return (
            <section>
                <button>UP</button>
                <p>{votes + voteChange}</p>
                <button>UP</button>
            </section>
        );
    }
}

export default Voter;