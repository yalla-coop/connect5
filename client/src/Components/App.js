import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Layouts/Home";
import TrainersLandingPage from "./Layouts/TrainersLandingPage";
import ViewSessions from "./Layouts/viewSessions";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/viewSessions" exact component={ViewSessions} />
            <Route path="/trainer" exact component={TrainersLandingPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
