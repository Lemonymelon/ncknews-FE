import { Link } from "@reach/router";
import React, { Component } from "react";
import * as api from '../api'

class Nav extends Component {
  state = {
    usernameValue: '',
    users: []
  }
  render() {
    const { user, setUser } = this.props;
    return (
      <div className="Nav">
        <section className="navLinks">
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
        </section>
        {user ? <div>
          <span>logged in as: {user.username}</span><br /><img src={user.avatar_url} /><button onClick={() => { setUser(null) }}>log out</button>
        </div> :
          <section className="login">
            <form onSubmit={this.handleSubmit}>
              <input onChange={this.handleChange} placeholder="Enter username" name="username" id="username" />
              <button type="submit">log in</button>
            </form>
          </section>}
      </div>
    );
  }

  componentDidMount() {
    api.fetchUsers().then(users => {
      this.setState({
        users
      })
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { setUser } = this.props;
    const { usernameValue, users } = this.state;
    const [user] = users.filter(user => user.username === usernameValue);
    if (user) setUser(user)

  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ usernameValue: value })
  }
}

export default Nav;
