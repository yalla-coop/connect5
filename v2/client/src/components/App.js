import React, { Component } from 'react';
import 'antd/dist/antd.css';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Router, Route, Switch, Link } from 'react-router-dom';
import styled from 'styled-components';

// PAGES
import Login from './pages/auth/login';
import ParticipantLogin from './pages/auth/login-participant';
import UserDashboard from './pages/userDashboard';
import Dashboard from './pages/Dashboard';
import Home from './pages/LandingPage';
import UserResults from './pages/UserResults';
import Survey from './pages/survey/Survey';

// ROUTES
import { HOME_URL, DASHBOARD_URL } from '../constants/navigationRoutes';
import history from '../history';

const Wrapper = styled.div`
  min-height: 100vh;
`;

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <Wrapper>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/users/:id/results" component={UserResults} />
            <Route exact path={HOME_URL} component={Home} />
            <Route exact path={DASHBOARD_URL} component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/survey/:id" component={Survey} />

            <Route
              exact
              path="/participant-login"
              component={ParticipantLogin}
            />
            <Route
              exact
              path="/participant-dashboard"
              component={UserDashboard}
            />
            <Route
              path="/404err"
              render={() => (
                <h1>
                  404 go home<Link to="/">home</Link>
                </h1>
              )}
            />
          </Switch>
        </Router>
      </Wrapper>
    );
  }
}

export default App;
