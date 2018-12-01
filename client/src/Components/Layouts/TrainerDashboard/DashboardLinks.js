import React, { Component } from "react";
import {
  Links,
  LinkWrapper,
  IconDiv,
  Navlink,
  Img,
  Span,
} from "./Dashboard_StyledComponents";

class DashboardLinks extends Component {
  render() {
    return (
      <Links>
        <LinkWrapper>
          <Navlink to="/view-sessions">
            <IconDiv>
              <Img src="../Imgs/sessions.jpg" alt="" />
            </IconDiv>
            <div>
              <Span>Sessions</Span>
            </div>
          </Navlink>
        </LinkWrapper>

        <LinkWrapper>
          <Navlink to="/overview-results">
            <IconDiv>
              <Img src="./../../Imgs/results.jpg" alt="" />
            </IconDiv>
            <div>
              <Span>Results</Span>
            </div>
          </Navlink>
        </LinkWrapper>

        <LinkWrapper>
          <Navlink to="/create-session">
            <IconDiv>
              <Img src="../Imgs/add.jpg" alt="" />
            </IconDiv>
            <div>
              <Span>New Session</Span>
            </div>
          </Navlink>
        </LinkWrapper>
      </Links>
    );
  }
}

export default DashboardLinks;
