import React, { Component } from "react";
import {
  BrowserRouter, Route, Switch, Redirect,
} from "react-router-dom";

// setup authorization
import jwt_decode from "jwt-decode";
import setAuthToken from "../Utils/setAuthToken";

// import components
import Home from "./Layouts/Home";

import SessionDetails from "./Layouts/Session-Details";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Dashboard from "./Layouts/TrainerDashboard/index";
import Survey from "./Layouts/Survey";
import TrainersLandingPage from "./Layouts/TrainersLandingPage";
import ViewSessions from "./Layouts/view-sessions";
import CreateSession from "./Layouts/CreateSession/index";
import SessionResult from "./Layouts/SessionResult";
import "./App.css";
import PrivateRoute from "./CommonComponents/PrivateRoute/PrivateRoute"

class App extends Component {
  state = {
    sessions: [],
    isAuthenticated: false,
    loaded: false,
    trainerId: null,
  };

  componentDidMount() {
    // check to see if valid jwt token in local storage
    if (localStorage.jwtToken) {
      // if so we set it to auth header so we can access it
      setAuthToken(localStorage.jwtToken);
      // decode the jwt so we can put the unique trainer id in the state
      const decoded = jwt_decode(localStorage.jwtToken);

        this.setState({
          isAuthenticated: true,
          trainerId: decoded.id,
          loaded: true
        });

    } else {
      this.setState ({
        isAuthenticated: false,
        loaded: true
      })
    }
  }

  handleSessions = (sessions) => {
    this.setState({ sessions });
  };

  getCurrentSession = (session) => {
    this.setState({
      currentSession: session,
    });
    // setTimeout(() => { console.log(this.state.currentSession); }, 7000);
  }

  render() {
    const { currentSession, isAuthenticated, loaded } = this.state;
    // make sure that component has mounted before loading
    if (!loaded) return null;
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/trainer" exact component={TrainersLandingPage} />
            <Route path="/trainer/register" exact component={Register} />
            <Route path="/trainer/login" exact component={Login} />
            <Route path="/survey/:id" exact render={props => <Survey {...props} />} />
            {/* private routes: use the common component PrivateRoute and check if authenticated is true. If not send back to login page */}
            <PrivateRoute
              path="/trainer/dashboard"
              exact
              component={Dashboard}
              isAuthenticated={isAuthenticated}
              trainerId={this.state.trainerId}
            />
            <PrivateRoute
              path="/view-sessions"
              exact
              component={ViewSessions}
              isAuthenticated={isAuthenticated}
              handleSessions={this.handleSessions}
              getCurrentSession={this.getCurrentSession}
              trainerId={this.state.trainerId}
            />
            <PrivateRoute
              path="/session-details"
              exact
              component={SessionDetails}
              isAuthenticated={isAuthenticated}
              sessionDetails={currentSession}
              trainerId={this.state.trainerId}
            />
            <PrivateRoute
              path="/create-session"
              exact
              component={CreateSession}
              isAuthenticated={isAuthenticated}
              trainerId={this.state.trainerId} />
            <PrivateRoute
              path="/session/details/:sessionId/:sessionType"
              exact
              component={SessionResult}
              isAuthenticated={this.Authenticated}
              trainerId={this.state.trainerId}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }




}

export default App;
