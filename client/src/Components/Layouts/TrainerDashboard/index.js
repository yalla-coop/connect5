import React, { Component } from "react";
import axios from "axios";

class Dashboard extends Component {
  componentDidMount() {
    axios
      .get("/dashboard")
      .then((res) => {
        console.log("RES", res);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <React.Fragment>
        <div className="dashboard">Dashboard</div>
        <p>Hello, this is the dashboard</p>
      </React.Fragment>
    );
  }
}

export default Dashboard;
