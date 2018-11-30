import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// setup authorization
import jwt_decode from "jwt-decode";
import setAuthToken from "../Utils/setAuthToken";

// import components
import LandingPage from "./Layouts/LandingPage";

import SessionDetails from "./Layouts/Session-Details";
import EditSession from "./Layouts/EditSession/index";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Dashboard from "./Layouts/TrainerDashboard/index";
import Survey from "./Layouts/Survey";
import TrainersLandingPage from "./Layouts/TrainersLandingPage";
import ViewSessions from "./Layouts/view-sessions";
import CreateSession from "./Layouts/CreateSession/index";
import SessionResult from "./Layouts/SessionResult";
import "./App.css";
import PrivateRoute from "./CommonComponents/PrivateRoute/PrivateRoute";
import ExportData from "./Export.js";

class App extends Component {
  state = {
    sessions: [],
    currentSession: [],
    isAuthenticated: false,
    loaded: false,
    trainerId: null,
  };

  handleSessions = (sessions) => {
    this.setState({ sessions });
  };

  getCurrentSession = (session) => {
    this.setState({
      currentSession: session,
    });
    // update localStorage
    localStorage.setItem("currentSession", JSON.stringify(session));
  };

  componentDidMount() {
    this.hydrateState();
    // check to see if valid jwt token in local storage
    if (localStorage.jwtToken) {
      // if so we set it to auth header so we can access it
      setAuthToken(localStorage.jwtToken);
      // decode the jwt so we can put the unique trainer id in the state
      const decoded = jwt_decode(localStorage.jwtToken);

      const currentTime = Date.now() / 1000;
      // log out user if toke expired
      if (decoded.exp < currentTime) {
        localStorage.removeItem("jwtToken");
        // setTimeout(() => { console.log(this.state.currentSession); }, 7000);
        setAuthToken(false);
        this.setState({
          isAuthenticated: false,
          trainerId: null,
          loaded: true,
        });
      } else {
        this.setState({
          isAuthenticated: true,
          trainerId: decoded.id,
          loaded: true,
        });
      }
    } else {
      this.setState({
        isAuthenticated: false,
        loaded: true,
      });
    }
  }

  hydrateState() {
    if (this.state.currentSession.length === 0 && localStorage.hasOwnProperty("currentSession")) {
      let value = localStorage.getItem("currentSession");

      try {
        value = JSON.parse(value);
        this.setState({ currentSession: value, loaded: true });
      } catch (err) {
        this.setState({ currentSession: value, loaded: true });
      }
    } else {
      this.setState({ loaded: true });
    }
  }

  render() {
    const { currentSession, isAuthenticated, loaded } = this.state;
    // make sure that component has mounted before loading
    if (!loaded) return null;
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/export-data" exact component={ExportData} />
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
              getCurrentSession={this.getCurrentSession}
            />
            <PrivateRoute
              path="/create-session"
              exact
              component={CreateSession}
              isAuthenticated={isAuthenticated}
              trainerId={this.state.trainerId}
            />
            <PrivateRoute
              path="/edit-session"
              exact
              component={EditSession}
              isAuthenticated={isAuthenticated}
              trainerId={this.state.trainerId}
              sessionDetails={currentSession}
            />
            <PrivateRoute
              path="/session/details/:sessionId/:sessionType"
              exact
              component={SessionResult}
              isAuthenticated={isAuthenticated}
              trainerId={this.state.trainerId}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
