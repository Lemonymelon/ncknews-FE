import React, { Component } from "react";
import { Router } from "@reach/router";
import Articles from "./components/Articles";
import Topics from "./components/Topics";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SingleArticle from "./components/SingleArticle";
import "./App.css";

class App extends Component {
  state = {
    user: null
  };
  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <Nav user={user} setUser={this.setUser} />
        <Header />
        <Router className="routerWrapper">
          <Home path="/" />
          <Articles user={user} path="/articles" />
          <SingleArticle user={user} path="/articles/:article_id" />
          <Topics path="/topics" />
          <Articles user={user} path="/topics/:topic/articles" />
        </Router>
        <Footer />
      </div>
    );
  }

  componentDidMount() {
    const savedUser = JSON.parse(sessionStorage.getItem("user"));
    savedUser
      ? this.setState({
          user: savedUser
        })
      : this.setState({
          user: null
        });
  }

  setUser = user => {
    sessionStorage.setItem("user", JSON.stringify(user));
    this.setState({ user });
  };
}

export default App;
