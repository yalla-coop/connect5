import React, { Component } from "react";
import styled from "styled-components";

const Btn = styled.button`
   background: none;
   border: none
`;

const I = styled.i`
  font-size: 30px;
  color: var(--large-button-background);
`;

const IconDiv = styled.div`
  display: flex;
`;


class Logout extends Component {
  render() {
    const { logout } = this.props;
    return (
      <IconDiv>
        <Btn type="button" onClick={logout}><I className="fas fa-sign-out-alt" /></Btn>
      </IconDiv>
    );
  }
}

export default Logout;
