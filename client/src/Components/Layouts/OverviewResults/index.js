import React, { Component } from "react";

import {
  ResultsOverviewWrapper, PageTitle, StatisicsContainer, TabsWrapper, Tab,
} from "./StyledComponents";

class ResultsOverview extends Component {
state = {
  activeTab: "attendance",
}

  handleTabClick = (e) => {
    this.setState({
      activeTab: e.target.name,
    });
  }

  render() {
    const { activeTab } = this.state;
    const { handleTabClick } = this;

    return (
      <ResultsOverviewWrapper>
        <span>
          <PageTitle>Overview Results </PageTitle>
        </span>
        <StatisicsContainer>
          <TabsWrapper>
            <Tab
              name="attendance"
              active={activeTab === "attendance"}
              onClick={handleTabClick}
            >
            Attendance
            </Tab>
            <Tab
              name="responses"
              active={activeTab === "responses"}
              onClick={handleTabClick}
            >
           Responses
            </Tab>
          </TabsWrapper>
          {
            activeTab === "overall"
              ? <AttendanceResults />
              : <ResponsesResults />
          }

        </StatisicsContainer>

      </ResultsOverviewWrapper>
    );
  }
}

export default ResultsOverview;
