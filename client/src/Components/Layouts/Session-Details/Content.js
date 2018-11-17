import React, { Component } from "react";
import {
  Content,
  Statistic,
  StatisticItems,
  ItemName,
  Items,
  Links,
  LinkType,
  Span1,
  Span2,
  LinkInfo,
  SurveyLink,
  SLink,
  ResultsBtn,
  Button,
} from "./styledComponents";


class SessionContent extends Component {
  render() {
    return (
      <Content>
        <Statistic>
          <StatisticItems>
            <ItemName>Date</ItemName>
            <Items>12/11/2018</Items>
          </StatisticItems>
          <StatisticItems>
            <ItemName>Type</ItemName>
            <Items>1</Items>
          </StatisticItems>
          <StatisticItems>
            <ItemName>Attendee</ItemName>
            <Items>20</Items>
          </StatisticItems>
        </Statistic>
        <Links>
          <LinkType>
            <Span1>Survey 1 Link</Span1>
            <Span2>
              <i className="fas fa-info-circle" />
              <LinkInfo>info</LinkInfo>
            </Span2>
            <Span2>
              <i className="far fa-clone" />
              <LinkInfo>copy</LinkInfo>
            </Span2>
          </LinkType>
          <SurveyLink>
            <SLink href="https://www.connect5.com/02/3">https://www.connect5.com/02/3</SLink>
          </SurveyLink>
          <ResultsBtn>
            <Button>View Servey Results</Button>
          </ResultsBtn>
        </Links>
      </Content>
    );
  }
}
export default SessionContent;
