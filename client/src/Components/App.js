import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Layouts/Home";
import TrainersLandingPage from "./Layouts/TrainersLandingPage";
import ViewSessions from "./Layouts/view-sessions";
import "./App.css";

class App extends Component {
  state = {
    sessions: [],
  }

handleSessions = (sessions) => {
  this.setState({ sessions });
}


render() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/viewSessions" render={() => <ViewSessions handleSessions={this.handleSessions} />} exact />
          <Route path="/trainer" exact component={TrainersLandingPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
}

export default App;
