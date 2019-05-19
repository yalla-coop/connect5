import React, { Component } from 'react';
import 'antd/dist/antd.css';
// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import { Router, Route, Switch, Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../theme';
import Home from './pages/LandingPage';
import Login from './pages/auth/login';
import ParticipantLogin from './pages/auth/login-participant';
import TrainerResutls from './pages/TrainerResults';
import history from '../history';

const Wrapper = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  background-color: ${colors.offWhite};
`;

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <Wrapper>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route
              exact
              path="/participant-login"
              component={ParticipantLogin}
            />
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
