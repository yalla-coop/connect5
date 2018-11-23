import React, { Component } from "react";
import { Wrapper } from "./styledComponents";
import SessionHeader from "./Header";
import SessionContent from "./Content";
import SessionActions from "./Actions";

class SessionDetails extends Component {
  render() {
    const { sessionDetails } = this.props;
    return (
      <Wrapper>
        <SessionHeader />
        <SessionContent sessionDetails={sessionDetails} />
        <SessionActions sessionDetails={sessionDetails} />
      </Wrapper>
    );
  }
}

export default SessionDetails;
