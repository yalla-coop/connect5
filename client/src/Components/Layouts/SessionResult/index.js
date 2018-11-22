import React, { Component } from "react";
import ReactRouterPropTypes from "react-router-prop-types";

import OverallResults from "./OverallResults/index";
import IndividualResults from "./IndividualResults";

import {
  SessionResultWrapper,
  PageTitle,
  TabsWrapper,
  Tab,
  Inline,
} from "./StyledComponents";

class SessionResult extends Component {
  static propTypes = {
    history: ReactRouterPropTypes.history,
    match: ReactRouterPropTypes.match,
  };

  static defaultProps = {
    history: null,
    match: null,
  }


  state = {
    activeTab: "overall",
  }

  handleTabClick = (e) => {
    this.setState({
      activeTab: e.target.name,
    });
  }

  render() {
    const { activeTab } = this.state;
    const { handleTabClick } = this;
    const { history, match } = this.props;

    return (
      <SessionResultWrapper>
        <Inline>
          <PageTitle>Session Details</PageTitle>
        </Inline>

        <TabsWrapper>
          <Tab
            name="overall"
            active={activeTab === "overall"}
            onClick={handleTabClick}
          >
            Overall Results
          </Tab>
          <Tab
            name="individual"
            active={activeTab === "individual"}
            onClick={handleTabClick}
          >
           Individual Responses
          </Tab>
        </TabsWrapper>

        {
          activeTab === "overall"
            ? <OverallResults match={match} history={history} />
            : <IndividualResults />
        }
      </SessionResultWrapper>
    );
  }
}

export default SessionResult;
