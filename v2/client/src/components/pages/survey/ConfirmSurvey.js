import React, { Component } from 'react';
import { connect } from 'react-redux';
// Styles
import { Spin, Alert } from 'antd';
import Header from '../../common/Header';
import { Container } from './Survey.style';
import Button from '../../common/Button';
import {
  SectionHeadline,
  SectionSubHeadline,
  PromptHeadline,
  Paragraph,
  SessionDetails,
  DetailsDiv,
  ButtonDiv,
  SpinWrapper,
} from './ConfirmSurvey.style';

// Action
import { fetchSurveyData } from '../../../actions/surveyAction';

class ConfirmSurvey extends Component {
  componentDidMount() {
    // grab the unique url at the end which gives us survey type and session id
    // syntax of url: surveyType&sessionId
    const { location, fetchSurveyData: fetchSurveyDataAction } = this.props;
    const survey = `${location.pathname}`;
    const surveyParts = survey.split('/')[2];
    window.scrollTo(0, 0);

    fetchSurveyDataAction(surveyParts);
  }

  // function to create a list of names from an array...
  renderTrainerNames = array =>
    array.map((e, i) =>
      array.length > 1 && array.length - 1 === i
        ? `and ${e.toUpperCase()}`
        : `${e.toUpperCase()} `
    );

  render() {
    const { surveyData } = this.props;

    const loadingError = Object.keys(surveyData.msg).length > 0;

    const { surveyData: surveyDetails } = surveyData;

    return (
      <div>
        {!surveyData.loaded ? (
          <SpinWrapper>
            <Spin size="large" />
          </SpinWrapper>
        ) : (
          <Container>
            <Header type="home" />
            <SectionHeadline>Connect 5 Evaluation</SectionHeadline>
            {loadingError && (
              <Alert message={surveyData.msg} type="warning" showIcon />
            )}
            {surveyDetails && surveyDetails !== null && (
              <div>
                <SessionDetails>
                  <SectionSubHeadline>Survey Details</SectionSubHeadline>
                  <DetailsDiv>
                    <Paragraph strong>Date of Session: </Paragraph>
                    <Paragraph>{surveyData.surveyData.sessionDate}</Paragraph>
                  </DetailsDiv>
                  <DetailsDiv>
                    <Paragraph strong>Trainers: </Paragraph>
                    <Paragraph>
                      {this.renderTrainerNames(
                        surveyData.surveyData.trainerNames
                      )}
                    </Paragraph>
                  </DetailsDiv>
                  <DetailsDiv>
                    <Paragraph strong>Survey Type:</Paragraph>
                    <Paragraph>{surveyData.surveyData.surveyType}</Paragraph>
                  </DetailsDiv>
                </SessionDetails>
                <PromptHeadline>Are these details correct?</PromptHeadline>
                <ButtonDiv>
                  <Button
                    label="Yes"
                    width="100px"
                    height="50px"
                    type="primary"
                  />
                  <Button
                    label="No"
                    width="100px"
                    height="50px"
                    type="primary"
                  />
                </ButtonDiv>
              </div>
            )}
          </Container>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    surveyData: state.survey,
  };
};

export default connect(
  mapStateToProps,
  { fetchSurveyData }
)(ConfirmSurvey);
