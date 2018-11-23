import React, { Component } from "react";
import moment from "moment";
import Link from "./Link";
import {
  Content,
  Statistic,
  StatisticItems,
  ItemName,
  Items,
  SurveyLink,
  SLink,
  Links,
  ResultsBtn,
  Button,
  SurveyLink1,
} from "./styledComponents";


class SessionContent extends Component {
  state ={
    value: " ",
    copied: false,
  }

  onCopy = () => {
    this.setState({ copied: true });
  };

  saveInState = (surveyURL1) => {
    this.setState({ value: surveyURL1, copied: false });
  };

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
            <ItemName>Attendees</ItemName>
            <Items>{attendees}</Items>
          </StatisticItems>
        </Statistic>
        <Links>
          <SurveyLink>
            {type === 1
              ? (<SurveyLink1>
                <Link
                  type={type}
                  onCopy={this.onCopy}
                  saveInState={() => this.saveInState(surveyURL1)}
                  value={this.state.value}
                />
                <SLink href={surveyURL1}>{surveyURL1}</SLink>
                <Link
                  type={type}
                  onCopy={this.onCopy}
                  saveInState={() => this.saveInState(surveyURL2)}
                  value={this.state.value}
                />
                <SLink href={surveyURL2}>{surveyURL2}</SLink>
                 </SurveyLink1>
              ) : (<SurveyLink1>
                <Link
                  type={type}
                  onCopy={this.onCopy}
                  saveInState={() => this.saveInState(surveyURL1)}
                  value={this.state.value}
                />
                <SLink href={surveyURL1}>{surveyURL1}</SLink>
              </SurveyLink1>
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
