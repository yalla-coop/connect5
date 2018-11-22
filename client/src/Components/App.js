import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// setup authorization
import setAuthToken from "../Utils/setAuthToken";
import jwt_decode from "jwt-decode";


// import components
import Home from "./Layouts/Home";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Dashboard from "./Layouts/TrainerDashboard/index";
import Survey from "./Layouts/Survey";
import TrainersLandingPage from "./Layouts/TrainersLandingPage";
import ViewSessions from "./Layouts/view-sessions";
import CreateSession from "./Layouts/CreateSession/index";
import SessionResult from "./Layouts/SessionResult";
import "./App.css";

class App extends Component {
  state = {
    sessions: [],
  };

  handleSessions = (sessions) => {
    this.setState({ sessions });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/trainer" exact component={TrainersLandingPage} />
            <Route path="/trainer/register" exact component={Register} />
            <Route path="/trainer/login" exact component={Login} />
            <Route path="/trainer/dashboard" exact component={Dashboard} />
            <Route
              path="/view-sessions"
              render={() => <ViewSessions handleSessions={this.handleSessions} />}
              exact
            />
            <Route path="/survey/:id" exact render={props => <Survey {...props} />} />
            <Route path="/create-session" exact component={CreateSession} />
            <Route
              path="/session/details/:sessionId/:sessionType"
              exact
              component={SessionResult}
            />
            {/* <Route path="/dashboard" exact component={Dashboard} /> */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
