import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Layouts/Home";
import TrainersLandingPage from "./Layouts/TrainersLandingPage";
import ViewSessions from "./Layouts/view-sessions";
import SessionResult from "./Layouts/SessionResult";
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
          <Route path="/view-sessions" render={() => <ViewSessions handleSessions={this.handleSessions} />} exact />
          <Route path="/trainer" exact component={TrainersLandingPage} />
          <Route path="/session/details/:sessionId/:sessionType" exact component={SessionResult} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
}

export default App;
