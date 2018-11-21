import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Layouts/Home";
import SessionDetails from "./Layouts/Session-Details";
import Navbar from "./CommonComponents/Navbar";
import TrainersLandingPage from "./Layouts/TrainersLandingPage";
import ViewSessions from "./Layouts/view-sessions";
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
  // setTimeout(() => { console.log(this.state.currentSession); }, 7000);
}

render() {
  const { currentSession } = this.state;
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/view-sessions" render={() => <ViewSessions handleSessions={this.handleSessions} getCurrentSession={this.getCurrentSession} />} exact />
          <Route path="/session-details" render={() => <SessionDetails sessionDetails={currentSession} />} exact />
          <Route path="/trainer" exact component={TrainersLandingPage} />
        </Switch>
        <Navbar />
      </div>
    </BrowserRouter>
  );
}
}

export default App;
