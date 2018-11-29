import React, { Component } from "react";
import {
  Statistics, Container, ItemCount, StatisticItems, ItemName,
} from "./styledComponents";


class Statistic extends Component {
  render() {
    const { sessionCount, surveysCount, responsesCount } = this.props;
    return (
      <Statistics>
        <Container>
          <StatisticItems>
            <ItemName>sessions</ItemName>
            <ItemCount>{sessionCount}</ItemCount>
          </StatisticItems>
          <StatisticItems>
            <ItemName>surveys</ItemName>
            <ItemCount>{surveysCount}</ItemCount>
          </StatisticItems>
          <StatisticItems>
            <ItemName>responses</ItemName>
            <ItemCount>{responsesCount}</ItemCount>
          </StatisticItems>
        </Container>
      </Statistics>
    );
  }
}

export default Statistic;
