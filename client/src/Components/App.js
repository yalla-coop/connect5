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
  }

handleSessions = (sessions) => {
  this.setState({ sessions });
  console.log(this.state);
}

render() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/viewSessions" render={() => <ViewSessions handleSessions={this.handleSessions} />} exact />
          <Route path="/session-details" render={() => <SessionDetails />} sessions={this.state.sessions} exact />
          <Route path="/trainer" exact component={TrainersLandingPage} />
        </Switch>
        <Navbar />
      </div>
    </BrowserRouter>
  );
}
}

export default App;
