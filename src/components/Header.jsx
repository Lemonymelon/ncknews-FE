import React, { Component } from 'react';
import { Link } from "@reach/router";
import '../style/Header.css'

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <Link to="/"><span>NC Knews</span></Link>
      </div>
    );
  }
}

export default Header;