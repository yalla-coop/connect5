import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./CommonComponents/Navbar";

import Home from "./Layouts/Home";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/" exact component={Navbar} />
        </Router>
      </div>
    );
  }
}

export default App;
