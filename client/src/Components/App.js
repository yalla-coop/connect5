import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Layouts/Home";
import SessionDetails from "./Layouts/Session-Details";
import Navbar from "./CommonComponents/Navbar";


import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>

          <Fragment>

            <Route path="/" exact component={Home} />
            <Route path="/session-details" exact component={SessionDetails} />
            <Navbar />
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
