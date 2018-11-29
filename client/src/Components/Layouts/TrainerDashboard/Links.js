import React, { Component } from "react";
import axios from "axios";
import setAuthToken from "../../../Utils/setAuthToken";
import {
  Statistics, Links,
  LinkWrapper, IconDiv, Navlink, Icon,
} from "./StyledComponents";


class DashboardLinks extends Component {
  <Links>
    <LinkWrapper>
      <Navlink to="/view-sessions">
        <IconDiv>
          <Icon className="fas fa-list-alt" />
        </IconDiv>
        <div>
          <Span>Sessions</Span>
        </div>
      </Navlink>
    </LinkWrapper>

    <LinkWrapper>
      <Navlink to="">
        <IconDiv>
          <Icon className="fas fa-poll-h" />
        </IconDiv>
        <div>
          <Span>Results</Span>
        </div>
      </Navlink>
    </LinkWrapper>

    <LinkWrapper>
      <Navlink to="/create-session">
        <IconDiv>
          <Icon className="fas fa-plus-circle" />
        </IconDiv>
        <div>
          <Span>New Session</Span>
        </div>
      </Navlink>
    </LinkWrapper>
  </Links>
}

export default DashboardLinks;
