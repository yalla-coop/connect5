import React, { Component } from "react";
import { Wrapper } from "./styledComponents";
import SessionHeader from "./Header";
import SessionContent from "./Content";
import SessionActions from "./Actions";

class SessionDetails extends Component {
  state = {
    sessions: [],
  }

  render() {
    console.log(this.props);
    return (
      <Wrapper>
        <SessionHeader />
        <SessionContent />
        <SessionActions />
      </Wrapper>
    );
  }
}

export default SessionDetails;
