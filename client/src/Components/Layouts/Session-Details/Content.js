import React, { Component } from "react";
import moment from "moment";
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
  SurveyLink1,
} from "./styledComponents";


class SessionContent extends Component {
  render() {
    const { sessionDetails } = this.props;
    const {
      date, type, attendees, surveyURL1, surveyURL2,
    } = sessionDetails;
    return (
      <Content>
        <Statistic>
          <StatisticItems>
            <ItemName>Date</ItemName>
            <Items>{moment(date).format("DD/MM/YYYY")}</Items>
          </StatisticItems>
          <StatisticItems>
            <ItemName>Type</ItemName>
            <Items>{type}</Items>
          </StatisticItems>
          <StatisticItems>
            <ItemName>Attendee</ItemName>
            <Items>{attendees}</Items>
          </StatisticItems>
        </Statistic>
        <Links>
          <LinkType>
            <Span1>
Survey
              {type}
Link
            </Span1>
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
            {type === 1
              ? (<SurveyLink1>
                <SLink href="sessionDetails.surveyURL1">{surveyURL1}</SLink>
                <SLink href="sessionDetails.surveyURL2">{surveyURL2}</SLink>
              </SurveyLink1>
              ) : (<SLink href="sessionDetails.surveyURL1">{surveyURL1}</SLink>
              )
            }
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
