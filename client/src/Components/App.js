import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// setup authorization
import jwtDecode from "jwt-decode";
import setAuthToken from "../Utils/setAuthToken";

// import components
import LandingPage from "./Layouts/LandingPage";
import SessionDetails from "./Layouts/SessionDetails";
import EditSession from "./Layouts/EditSession/index";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Dashboard from "./Layouts/TrainerDashboard/index";
import Survey from "./Layouts/Survey";
import TrainersLandingPage from "./Layouts/TrainersLandingPage/index";
import ViewSessions from "./Layouts/view-sessions";
import CreateSession from "./Layouts/CreateSession/index";
import SessionResult from "./Layouts/SessionResult";
import OverviewResults from "./Layouts/OverviewResults";
import PageNotFound from "./Layouts/404Page";
import ServerError from "./Layouts/500Page";
import PublicRoutes from "./CommonComponents/PublicRoutes";
import AboutUs from "./Layouts/About";
import "./App.css";
import PrivateRoute from "./CommonComponents/PrivateRoute/PrivateRoute";

class App extends Component {
  state = {
    currentSession: [],
    isAuthenticated: false,
    loaded: false,
    trainerId: null,
  };


  componentDidMount() {
    this.hydrateState();
    // check to see if valid jwt token in local storage
    if (localStorage.jwtToken) {
      // if so we set it to auth header so we can access it
      setAuthToken(localStorage.jwtToken);
      // decode the jwt so we can put the unique trainer id in the state
      const decoded = jwtDecode(localStorage.jwtToken);

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

  getCurrentSession = (session) => {
    this.setState({
      currentSession: session,
    });
    // update localStorage
    localStorage.setItem("currentSession", JSON.stringify(session));
  };

  hydrateState() {
    const { currentSession } = this.state;
    // need to be refactored and we shouldnt use local storage {todo}
    // eslint-disable-next-line no-prototype-builtins
    if (currentSession.length === 0 && localStorage.hasOwnProperty("currentSession")) {
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
    const {
      currentSession, isAuthenticated, loaded, trainerId,
    } = this.state;
    // make sure that component has mounted before loading
    if (!loaded) return null;
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <PublicRoutes path="/" exact component={LandingPage} />
            <PublicRoutes path="/trainer" exact component={TrainersLandingPage} header />
            <PublicRoutes path="/trainer/register" exact component={Register} header />
            <PublicRoutes path="/trainer/login" exact component={Login} header />
            <PublicRoutes path="/survey/:id" exact component={Survey} header />
            <Route path="/about-us" exact component={AboutUs} />

            {/*
              private routes: use the common component PrivateRoute
              and check if authenticated is true.
              If not send back to login page
            */}
            <PrivateRoute
              path="/trainer/dashboard"
              exact
              component={Dashboard}
              isAuthenticated={isAuthenticated}
              trainerId={trainerId}
              navbar={false}
            />
            <PrivateRoute
              path="/view-sessions"
              exact
              component={ViewSessions}
              isAuthenticated={isAuthenticated}
              getCurrentSession={this.getCurrentSession}
              trainerId={trainerId}
              navbar
            />
            <PrivateRoute
              path="/session-details"
              exact
              component={SessionDetails}
              isAuthenticated={isAuthenticated}
              sessionDetails={currentSession}
              trainerId={trainerId}
              getCurrentSession={this.getCurrentSession}
              navbar
            />
            <PrivateRoute
              path="/create-session"
              exact
              component={CreateSession}
              isAuthenticated={isAuthenticated}
              trainerId={trainerId}
              navbar
            />
            <PrivateRoute
              path="/edit-session"
              exact
              component={EditSession}
              isAuthenticated={isAuthenticated}
              trainerId={trainerId}
              sessionDetails={currentSession}
              navbar
            />
            <PrivateRoute
              path="/session/details/:sessionId/:sessionType"
              exact
              component={SessionResult}
              isAuthenticated={isAuthenticated}
              trainerId={trainerId}
              navbar
            />
            <PrivateRoute
              path="/overview-results"
              exact
              component={OverviewResults}
              isAuthenticated={isAuthenticated}
              trainerId={trainerId}
              navbar
            />

            <Route path="/server-error" component={ServerError} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
