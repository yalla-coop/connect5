import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Layouts/Home";
import Survey from "./Layouts/Survey";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <React.Fragment>
            <Route path="/" exact component={Home} />
            <Route
              path="/survey/:id"
              exact
              render={props => <Survey {...props} />}
            />
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
