import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import styled from 'styled-components';

// PAGES
import Home from './pages/LandingPage';
import Login from './pages/login';
import TrainerResutls from './pages/TrainerResults';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

// ROUTES
import {
  HOME_URL,
  DASHBOARD_URL,
  TRAINER_RESULTS_URL,
} from '../constants/navigationRoutes';

const Wrapper = styled.div`
  min-height: 100vh;
`;

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <Wrapper>
        <Router>
          <Switch>
            <Route exact path={HOME_URL} component={Home} />
            <Route
              exact
              path={TRAINER_RESULTS_URL}
              component={TrainerResutls}
            />
            <Route exact path={DASHBOARD_URL} component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/trainer-results" component={TrainerResutls} />
            <Route
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
