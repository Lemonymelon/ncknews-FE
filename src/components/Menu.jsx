import React, { Component } from 'react';
import menuWheel from '../menuWheel.png'
import  "./Menu.css"; 

class Menu extends Component {
    render() {
        return (
            <img src={menuWheel} className="MenuWheel" alt="menu wheel"/>
        );
    }
}

export default Menu;