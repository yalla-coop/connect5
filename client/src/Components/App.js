import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Layouts/Home";
import SessionDetails from "./Layouts/Session-Details";


import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/" exact component={SessionDetails} />
        </Router>
      </div>
    );
  }
}

export default App;
