import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { checkAuth } from '../actions/authAction';

// PAGES
import Home from './pages/LandingPage';
import Login from './pages/login';
import TrainerResutls from './pages/TrainerResults';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

// COMPONENTS
import PrivateRoute from './common/PrivateRoute';
import Spin from './common/Spin';

// ROUTES
import {
  HOME_URL,
  DASHBOARD_URL,
  TRAINER_RESULTS_URL,
  LOGIN_URL,
  SIGN_UP_URL,
} from '../constants/navigationRoutes';

const Wrapper = styled.div`
  min-height: 100vh;
`;

class App extends Component {
  componentDidMount() {
    const { checkAuth: checkAuthActionCreator } = this.props;
    checkAuthActionCreator();
  }

  render() {
    const { isAuthenticated, loaded } = this.props;
    return (
      <Wrapper>
        <Router>
          <Switch>
            <Route exact path={HOME_URL} component={Home} />

            <PrivateRoute
              exact
              path={TRAINER_RESULTS_URL}
              Component={TrainerResutls}
              isAuthenticated={isAuthenticated}
              loaded={loaded}
            />

            <PrivateRoute
              exact
              path={DASHBOARD_URL}
              Component={Dashboard}
              isAuthenticated={isAuthenticated}
              loaded={loaded}
            />

            <Route
              exact
              path={LOGIN_URL}
              render={() => {
                if (loaded) {
                  return isAuthenticated ? (
                    <Redirect to={DASHBOARD_URL} />
                  ) : (
                    <Login />
                  );
                }
                return <Spin />;
              }}
            />
            <Route
              exact
              path={SIGN_UP_URL}
              render={() => {
                if (loaded) {
                  return isAuthenticated ? (
                    <Redirect to={DASHBOARD_URL} />
                  ) : (
                    <SignUp />
                  );
                }
                return <Spin />;
              }}
            />
            <Route
              render={() => (
                <h1>
                  404 go home<Link to={HOME_URL}>home</Link>
                </h1>
              )}
            />
          </Switch>
        </Router>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loaded: state.auth.loaded,
});

export default connect(
  mapStateToProps,
  { checkAuth }
)(App);
