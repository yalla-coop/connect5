import React, { Component } from "react";
import { Wrapper } from "./styledComponents";
import SessionHeader from "./Header";
import SessionContent from "./Content";
import SessionActions from "./Actions";

class SessionDetails extends Component {
  // gg
  render() {
    const { sessionDetails, getCurrentSession } = this.props;
    return (
      <Wrapper>
        <SessionHeader />
        <SessionContent sessionDetails={sessionDetails} />
        <SessionActions sessionDetails={sessionDetails} getCurrentSession={getCurrentSession} />
      </Wrapper>
    );
  }
}

export default SessionDetails;
