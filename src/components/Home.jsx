import React, { Component } from "react";
import { Link } from "@reach/router";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Link to="articles">
          <div className="articlesButton">
            <h3>
              BROWSE <br />
              ALL
              <br />
              ARTICLES
            </h3>
          </div>
        </Link>

        <Link to="topics">
          <div className="topicsButton">
            <h3>
              BROWSE
              <br />
              BY
              <br />
              TOPIC
            </h3>
          </div>
        </Link>
      </div>
    );
  }
}

export default Home;

// overflow y the menu (hidden for menu, scroll for list)
// align x axis!

// MAIN DIV - menu/list children of
// reassign all divs to relevant html tag
