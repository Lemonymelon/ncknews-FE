import { Link } from "@reach/router";
import React, { Component } from "react";
  
class Nav extends Component {
  render() {
    return (
      <div className="Nav">
        <Link to="/">
          <span>HOME</span>
        </Link>
        {" | "}
        <Link to="/articles">
          <span>ARTICLES</span>
        </Link>
        {" | "}
        <Link to="/topics">
          <span>TOPICS</span>
        </Link>
        {" | "}
        <Link to="/user">
          <span>USER</span>
        </Link>
      </div>
    );
  }
}

export default Nav;
