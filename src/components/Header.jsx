import React, { Component } from "react";
import { Link } from "@reach/router";
import "../style/Header.css";

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <Link to="/">
          <span>LM News</span>
        </Link>
      </div>
    );
  }
}

export default Header;
