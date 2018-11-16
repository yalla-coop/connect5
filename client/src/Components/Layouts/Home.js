import React, { Component } from "react";

import Navbar from "../CommonComponents/Navbar/index";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="home">Home</div>
        <Navbar />
      </React.Fragment>
    );
  }
}

export default Home;
