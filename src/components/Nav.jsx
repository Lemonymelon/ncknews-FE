import { Link } from "@reach/router";
import React, { Component } from "react";
import * as api from "../api";
import "../style/Nav.css";
import house from "../house.png";

class Nav extends Component {
  state = {
    usernameValue: "",
    users: []
  };
  render() {
    const { user, setUser } = this.props;
    const { users } = this.state;
    return (
      <div className="Nav">
        <div className="transbox">
          <Link to="/">
            <img className="house" src={house} alt="home icon" />
          </Link>

          <section className="navLinks">
            <Link to="/articles">
              <span>ARTICLES</span>
            </Link>
            <div className="divvyLine">
              <span>{" | "}</span>
            </div>
            <Link to="/topics">
              <span>TOPICS</span>
            </Link>
          </section>
          {user ? (
            <div>
              <span>logged in as: {user.username}</span>
              <br />
              <button
                className="logOutButton"
                onClick={() => {
                  setUser(null);
                }}
              >
                Log out
              </button>
            </div>
          ) : (
            <section className="login">
              <form onSubmit={this.handleSubmit}>
                <select
                  onChange={this.handleChange}
                  placeholder="Enter username"
                  name="username"
                  id="username"
                >
                  <option defaultValue>Select user</option>
                  {users.map(user => {
                    return (
                      <option key={user.username} value={user.username}>
                        {user.username}
                      </option>
                    );
                  })}
                </select>
                <br />
                <button type="submit">Log in</button>
              </form>
            </section>
          )}
        </div>
      </div>
    );
  }

  componentDidMount() {
    api.fetchUsers().then(users => {
      this.setState({
        users
      });
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { setUser } = this.props;
    const { usernameValue, users } = this.state;
    const [user] = users.filter(user => user.username === usernameValue);
    if (user) setUser(user);
  };

  handleChange = event => {
    const { value } = event.target;
    this.setState({ usernameValue: value });
  };
}

export default Nav;
