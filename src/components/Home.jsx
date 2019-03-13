import React, { Component } from 'react';
import { Link } from "@reach/router";



class Home extends Component {
    render() {


        return (
            <div className="Home">
                HOME
               <Link to="articles"><h1>BROWSE ALL ARTICLES</h1></Link>
                <Link to="topics"><h1>BROWSE BY TOPIC</h1></Link>
            </div>
        );
    }
}

export default Home;

// overflow y the menu (hidden for menu, scroll for list)
// align x axis!

// MAIN DIV - menu/list children of
// reassign all divs to relevant html tag