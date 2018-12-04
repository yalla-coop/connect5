import React, { Component } from "react";


import {
  Navlink,
} from "./styledComponents";

class ResultBtn extends Component {
  render() {
    const { id, type } = this.props;
    return (
        <Navlink to={`/session/details/${id}/${type}`}>
         Survey Results
          </Navlink>
    );
  }
}

export default ResultBtn;
