import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// import components
import Home from "./Layouts/Home";
import Survey from "./Layouts/Survey";
import TrainersLandingPage from "./Layouts/TrainersLandingPage";
import ViewSessions from "./Layouts/view-sessions";
import CreateSession from "./Layouts/CreateSession/index";
import "./App.css";

class App extends Component {
  state = {
    sessions: [],
  }

handleSessions = (sessions) => {
  this.setState({ sessions });
}


render() {
  return (
    <BrowserRouter>
      <div className="App">

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/view-sessions" render={() => <ViewSessions handleSessions={this.handleSessions} />} exact />
          <Route path="/trainer" exact component={TrainersLandingPage} />
          <Route
            path="/survey/:id"
            exact
            render={props => <Survey {...props} />}
          />
          <Route path="/create-session" exact component={CreateSession} />
        </Switch>

      </div>
    </BrowserRouter>
  );
}
}

export default App;
