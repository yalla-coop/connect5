import React, { Component } from "react";
import axios from "axios";
import setAuthToken from "../../../Utils/setAuthToken";

class Dashboard extends Component {
  componentDidMount() {
    // if (localStorage.jwtToken) {
    //   setAuthToken(localStorage.jwtToken);
    axios
      .get("/dashboard")
      .then((res) => {
        console.log("RES", res);
      })
      .catch(err => console.log(err));
    // }
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
