import React, { Component } from 'react';
import { connect } from 'react-redux';
// Styles
import { Spin, Alert } from 'antd';
import Header from '../../common/Header';
import {
  Container,
  SpinWrapper,
  SurveyWrapper,
  SkipButtonsDiv,
} from './Survey.style';
import Button from '../../common/Button';

// Action
import { fetchSurveyData } from '../../../actions/surveyAction';

import ConfirmSurvey from './ConfirmSurvey';
import EnterPIN from './EnterPIN';
import Demographics from './Demographics';

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
        case 'enterPIN':
          newSection = 'surveyStart';
          break;
        default:
          newSection = section;
      }
    } else {
      switch (section) {
        case 'surveyStart':
          newSection = 'enterPIN';
          break;
        default:
          newSection = section;
      }
    }
    this.setState({ section: newSection });
  };

  renderSkipButtons = () => (
    <SkipButtonsDiv>
      <Button
        label="Back"
        width="100px"
        height="50px"
        type="primary"
        onClick={() => this.sectionChange('back')}
      />
      <Button
        label="Next"
        width="100px"
        height="50px"
        type="primary"
        onClick={() => this.sectionChange('forward')}
      />
    </SkipButtonsDiv>
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
              <SurveyWrapper>
                {section === 'confirmSurvey' && (
                  <ConfirmSurvey
                    sessionDate={surveyData.surveyData.sessionDate}
                    trainerNames={surveyData.surveyData.trainerNames}
                    surveyType={surveyData.surveyData.surveyType}
                    sectionChange={this.sectionChange}
                  />
                )}
                {section === 'enterPIN' && (
                  <EnterPIN renderSkipButtons={this.renderSkipButtons()} />
                )}
                {section === 'surveyStart' && (
                  <Demographics renderSkipButtons={this.renderSkipButtons()} />
                )}
              </SurveyWrapper>
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
