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
  ButtonLink,
} from './ConfirmSurvey.style';

// Action
import { fetchSurveyData } from '../../../actions/surveyAction';

import ConfirmSurvey from './ConfirmSurvey';
import EnterPIN from './EnterPIN';

class Survey extends Component {
  state = {
    section: 'confirmSurvey',
  };

  componentDidMount() {
    // grab the unique url at the end which gives us survey type and session id
    // syntax of url: surveyType&sessionId
    const { location, fetchSurveyData: fetchSurveyDataAction } = this.props;
    const survey = `${location.pathname}`;
    const surveyParts = survey.split('/')[2];
    window.scrollTo(0, 0);

    fetchSurveyDataAction(surveyParts);
  }

  sectionChange = direction => {
    const { section } = this.state;
    let newSection;

    if (direction === 'forward') {
      switch (section) {
        case 'confirmSurvey':
          newSection = 'enterPIN';
          break;
        default:
          newSection = section;
      }
    }
    this.setState({ section: newSection });
  };

  // function to create a list of names from an array...
  renderTrainerNames = array =>
    array.map((e, i) =>
      array.length > 1 && array.length - 1 === i
        ? `and ${e.toUpperCase()}`
        : `${e.toUpperCase()} `
    );

  render() {
    const { section } = this.state;
    const { surveyData } = this.props;

    const loadingError = Object.keys(surveyData.msg).length > 0;

    const { surveyData: surveyDetails } = surveyData;
    console.log(section);
    return (
      <div>
        {!surveyData.loaded ? (
          <SpinWrapper>
            <Spin size="large" />
          </SpinWrapper>
        ) : (
          <Container>
            <Header type="home" />
            {loadingError && (
              <Alert message={surveyData.msg} type="warning" showIcon />
            )}
            {surveyDetails && surveyDetails !== null && (
              <div>
                {section === 'confirmSurvey' && (
                  <ConfirmSurvey
                    sessionDate={surveyData.surveyData.sessionDate}
                    trainerNames={surveyData.surveyData.trainerNames}
                    surveyType={surveyData.surveyData.surveyType}
                    sectionChange={this.sectionChange}
                  />
                )}
                {section === 'enterPIN' && <EnterPIN />}
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
)(Survey);
