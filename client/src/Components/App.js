import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// import components
import LandingPage from "./Layouts/LandingPage";

import SessionDetails from "./Layouts/Session-Details";
import EditSession from "./Layouts/EditSession/index";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Survey from "./Layouts/Survey";
import TrainersLandingPage from "./Layouts/TrainersLandingPage";
import ViewSessions from "./Layouts/view-sessions";
import CreateSession from "./Layouts/CreateSession/index";
import SessionResult from "./Layouts/SessionResult";
import "./App.css";

class App extends Component {
  state = {
    sessions: [],
    currentSession: [],
    loaded: false,
  }


handleSessions = (sessions) => {
  this.setState({ sessions });
}

getCurrentSession = (session) => {
  this.setState({
    currentSession: session,
  });
  // setTimeout(() => { console.log(this.state.currentSession); }, 7000);

  // update localStorage
  localStorage.setItem("currentSession", JSON.stringify(session))
}

hydrateState() {
  if (this.state.currentSession.length === 0 && localStorage.hasOwnProperty("currentSession")) {
    
    let value = localStorage.getItem("currentSession");

    try {
      value = JSON.parse(value);
      this.setState({ currentSession: value, loaded: true});
    } catch (err) {
      this.setState( { currentSession: value, loaded: true});
    }
  }
}

componentDidMount() {
  this.hydrateState();
}


render() {
  
  const { currentSession, loaded } = this.state;
  if(!loaded) {
    return <h1>Loading...</h1>
  }
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/trainer" exact component={TrainersLandingPage} />
          <Route path="/trainer/register" exact component={Register} />
          <Route path="/trainer/login" exact component={Login} />
          <Route path="/view-sessions" render={() => <ViewSessions handleSessions={this.handleSessions} getCurrentSession={this.getCurrentSession} />} exact />
          <Route path="/session-details" render={() => <SessionDetails sessionDetails={currentSession} getCurrentSession={this.getCurrentSession} />} exact />
          <Route path="/edit-session" render={() => <EditSession sessionDetails={currentSession} />} exact />
          <Route path="/survey/:id" exact render={props => <Survey {...props} />} />
          <Route path="/create-session" exact component={CreateSession} />
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
