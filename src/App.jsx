import React, { Component } from "react";
import {  Router } from "@reach/router";
import Articles from "./components/Articles";
import Topics from "./components/Topics";
import User from "./components/User";
import Home from "./components/Home"
import Nav from "./components/Nav";
import { Header } from "./components/Header";
import SideBar from './components/SideBar';
import Footer from './components/Footer';
import SideBarTab from './components/SideBarTab';
import ArticlesByTopic from './components/ArticlesByTopic'
import SingleArticle from './components/SingleArticle'




import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Header/>
        <Router className="routerWrapper">
          <Home path="/" />
          <Articles path="/articles" />
          <SingleArticle path="/articles/:article_id"/>
          <Topics path="/topics" />
          <ArticlesByTopic path="/topics/:topic/articles"/>
        </Router>
        <SideBarTab/>
        <Footer/>
      </div>
    );
  }
}

export default App;
