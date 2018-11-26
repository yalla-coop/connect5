import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// import components
import Home from "./Layouts/Home";

import SessionDetails from "./Layouts/Session-Details";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Survey from "./Layouts/Survey";
import TrainersLandingPage from "./Layouts/TrainersLandingPage";
import ViewSessions from "./Layouts/view-sessions";
import CreateSession from "./Layouts/CreateSession/index";
import SessionResult from "./Layouts/SessionResult";
import ResultsOverview from "./Layouts/ResultsOverview";

import "./App.css";

class App extends Component {
  state = {
    sessions: [],
    currentSession: [],
  }

handleSessions = (sessions) => {
  this.setState({ sessions });
}

getCurrentSession = (session) => {
  this.setState({
    currentSession: session,
  });
}


render() {
  const { currentSession } = this.state;
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/trainer" exact component={TrainersLandingPage} />
          <Route path="/trainer/register" exact component={Register} />
          <Route path="/trainer/login" exact component={Login} />
          <Route path="/view-sessions" render={() => <ViewSessions handleSessions={this.handleSessions} getCurrentSession={this.getCurrentSession} />} exact />
          <Route path="/session-details" render={() => <SessionDetails sessionDetails={currentSession} />} exact />
          <Route path="/survey/:id" exact render={props => <Survey {...props} />} />
          <Route path="/create-session" exact component={CreateSession} />
          <Route path="/results-overview" exact component={ResultsOverview} />
          <Route
            path="/session/details/:sessionId/:sessionType"
            exact
            component={SessionResult}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
}

export default App;
