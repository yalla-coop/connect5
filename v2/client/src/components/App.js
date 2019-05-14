import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Home from './pages/LandingPage';
import Survey from './pages/survey/Survey';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>App</h1>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/survey/:id" component={Survey} />
            <Route
              render={() => (
                <h1>
                  404 go home<Link to="/">home</Link>
                </h1>
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
