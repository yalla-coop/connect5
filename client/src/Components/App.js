import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Layouts/Home";
import Register from "./auth/Register";
import Login from "./auth/Login";
import TrainersLandingPage from "./Layouts/TrainersLandingPage";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Fragment>
            <Route path="/" exact component={Home} />
            <Route path="/trainer" exact component={TrainersLandingPage} />
            <Route path="/trainer/register" exact component={Register} />
            <Route path="/trainer/login" exact component={Login} />
          </Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
