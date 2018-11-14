import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './Layouts/Home';
import TrainersLandingPage from './Layouts/TrainersLandingPage';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>

          <Fragment>
            <Route path="/" exact component={Home} />
            <Route path="/trainers-landing-page" exact component={TrainersLandingPage} />
          </Fragment>

        </Router>
      </div>
    );
  }
}

export default App;
