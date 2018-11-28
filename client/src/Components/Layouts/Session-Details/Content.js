import React, { Component } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { log } from "util";
import Link from "./Link";
import ResultBtn from "./ResultBtn";
import {
  Content,
  Statistic,
  StatisticItems,
  ItemName,
  Items,
  SurveyLink,
  SLink,
  Links,
  SurveyLink1,
  Container,
} from "./styledComponents";

class SessionContent extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  state = {
    value: " ",
    copied: false,
  };

  onCopy = () => {
    this.setState({ copied: true });
  };

  saveInState = (surveyURL1) => {
    this.setState({ value: surveyURL1, copied: false });
  };

  redirect = (_id, type) => {
    this.context.router.history.push(`/session/details/${_id}/${type}`);
  };

  render() {
    const { sessionDetails } = this.props;
    const {
      date, type, attendees, _id,
    } = sessionDetails;

    const surveyURL = `${window.location.host}/survey/${type}${_id}`;

    const preSurveyUrl = `${window.location.host}/survey/0${_id}`;

    const surveyURLDisp = `/survey/${type}${_id}`;

    const preSurveyUrlDisp = `/survey/0${_id}`;

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
            {type === 1 ? (
              <SurveyLink1>
                <Container>
                  <Link
                    type="Pre-Survey"
                    onCopy={this.onCopy}
                    saveInState={() => this.saveInState(preSurveyUrl)}
                    value={preSurveyUrl}
                  />
                  <SLink href={preSurveyUrl}>{preSurveyUrlDisp}</SLink>
                  <ResultBtn id={_id} type={type} />
                </Container>
                <Container>
                  <Link
                    type={`Survey ${type}`}
                    onCopy={this.onCopy}
                    saveInState={() => this.saveInState(surveyURL)}
                    value={surveyURL}
                  />
                  <SLink href={surveyURL}>{surveyURLDisp}</SLink>
                  <ResultBtn id={_id} type={type} />
                </Container>
              </SurveyLink1>
            ) : (
              <SurveyLink1>
                <Container>
                  <Link
                    type={`Survey ${type}`}
                    onCopy={this.onCopy}
                    saveInState={() => this.saveInState(surveyURL)}
                    value={surveyURL}
                  />
                  <SLink href={surveyURL}>{surveyURLDisp}</SLink>
                  <ResultBtn id={_id} type={type} />
                </Container>
              </SurveyLink1>
            )}
          </SurveyLink>
        </Links>
      </Content>
    );
  }
}
export default SessionContent;
