import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './Layouts/Home';
import Register from './auth/Register';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Route path="/" exact component={Home} />
          <Route path="/register" exact component={Register} />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
