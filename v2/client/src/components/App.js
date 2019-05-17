import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import styled from 'styled-components';

// PAGES
import Home from './pages/LandingPage';
import TrainerResutls from './pages/TrainerResults';
import Dashboard from './pages/Dashboard';

// ROUTES
import {
  HOME_URL,
  DASHBOARD_URL,
  TRAINER_RESULTS_URL,
} from '../constants/navigationRoutes';

const Wrapper = styled.div`
  min-width: 100vw;
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
