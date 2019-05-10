import React, { Component } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import LinkDiv from "./Link";
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


  redirect = (_id, type) => {
    const { router } = this.context;
    router.history.push(`/session/details/${_id}/${type}`);
  };

  render() {
    const { sessionDetails } = this.props;
    const {
      date, type, attendees, _id,
    } = sessionDetails;

    const surveyURL = `${window.location.host}/survey/${type}${_id}`;

    const preSurveyUrl = `${window.location.host}/survey/0${_id}`;

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
                  <LinkDiv
                    type="Pre-Survey"
                    saveInState={() => {}}
                    value={preSurveyUrl}
                  />
                  <SLink href={preSurveyUrl}>{preSurveyUrl}</SLink>
                  <ResultBtn id={_id} type={type} />
                </Container>
                <Container>
                  <LinkDiv
                    type={`Survey ${type}`}
                    saveInState={() => {}}
                    value={surveyURL}
                  />
                  <SLink href={surveyURL}>{surveyURL}</SLink>
                  <ResultBtn id={_id} type={type} />
                </Container>
              </SurveyLink1>
            ) : (
              <SurveyLink1>
                <Container>
                  <LinkDiv
                    type={`Survey ${type}`}
                    saveInState={() => {}}
                    value={surveyURL}
                    to="#"
                  />
                  <SLink href={surveyURL}>{surveyURL}</SLink>
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
