import React, { Component } from 'react';
import { connect } from 'react-redux';
import SurveyContent from './SurveyContent';
import {
  SessionSurveysWrapper,
  SessionSurveyContainer,
  Buttons,
  AttendeeBtn,
  ResultBtn,
} from './SessionSurveys.Style';

class SessionSurveys extends Component {
  render() {
    const { sessionDetails } = this.props;
    const { type, _id } = sessionDetails;
    return (
      <SessionSurveysWrapper>
        <SessionSurveyContainer>
          <SurveyContent />
        </SessionSurveyContainer>
        <Buttons>
          <AttendeeBtn to="/" id={_id} type={type}>
            View Attendees
          </AttendeeBtn>
          <ResultBtn to="/" id={_id} type={type}>
            View Results
          </ResultBtn>
        </Buttons>
      </SessionSurveysWrapper>
    );
  }
}

export default connect(null)(SessionSurveys);
