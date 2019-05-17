import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import styled from 'styled-components';
import Home from './pages/LandingPage';
import TrainerResults from './pages/TrainerResults';
import LocalLeadResults from './pages/LocalLeadResults';
import AdminResults from './pages/AdminResults';
import UserResults from './pages/UserResults';

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
            <Route exact path="/" component={Home} />
            <Route exact path="/trainer-results" component={TrainerResults} />
            <Route exact path="/local-lead" component={LocalLeadResults} />
            <Route exact path="/admin" component={AdminResults} />
            <Route exact path="/users/:id/results" component={UserResults} />
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
