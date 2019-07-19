import React, { Component } from 'react';

import { connect } from 'react-redux';
// Styles
import { Spin, Alert, Modal } from 'antd';
import Header from '../../common/Header';
import {
  Container,
  SpinWrapper,
  SurveyWrapper,
  SkipButtonsDiv,
} from './Survey.style';

import Button from '../../common/Button';

// Action
import {
  fetchSurveyData,
  checkPINResponses,
} from '../../../actions/surveyAction';

import ConfirmSurvey from './ConfirmSurvey';
import EnterPIN from './EnterPIN';
import Demographics from './Demographics';

// PIN validation
const validLetters = string => {
  const regex = /[a-z]{1,3}/gim;
  return regex.test(string);
};

const validNumbers = string => {
  const regex = /^[0-9]{1,2}$/gim;
  return regex.test(string);
};

class Survey extends Component {
  state = {
    section: 'confirmSurvey',
    PIN: '',
    surveyParts: '',
    PINerror: '',
    PINSection: false,
  };

  componentDidMount() {
    // grab the unique url at the end which gives us survey type and session id
    // syntax of url: surveyType&sessionId
    const { location, fetchSurveyData: fetchSurveyDataAction } = this.props;
    // const { surveyParts } = this.state;
    const survey = `${location.pathname}`;
    const surveyParts = survey.split('/')[2];

    fetchSurveyDataAction(surveyParts);
    window.scrollTo(0, 0);
    this.setState({ surveyParts });
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

  renderSkipButtons = section => {
    const { PINSection } = this.state;
    return (
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
          disabled={!PINSection}
          onClick={() => {
            this.sectionChange('forward');
            this.customSubmit(section);
          }}
        />
      </SkipButtonsDiv>
    );
  };

  // PIN
  // handles user input for PIN field
  handlePIN = e => {
    const PIN = e.target.value;
    this.setState({ PIN });
    // this.setState({ PIN }, () => {
    //   if (PIN.length === 5) {
    //     this.trackAnswers();
    //   }
    // });
  };

  checkPINonBlur = () => {
    const { checkPINResponses: checkPINResponsesAction } = this.props;
    const { surveyParts, PIN } = this.state;

    if (PIN.length < 5) {
      this.setState({
        PINerror: 'PIN must contain 5 characters',
        PINSection: false,
      });
    }
    if (PIN.length === 5) {
      // check if PIN is in right format
      if (
        !(
          validLetters(PIN.substring(0, 3)) && validNumbers(PIN.substring(3, 5))
        )
      ) {
        this.setState({
          PINerror: 'PIN must be in the right format',
          PINSection: false,
        });
      } else {
        this.setState({ PINerror: '', PINSection: true });
      }

      // check if PIN alrady submitted this exact survey
      checkPINResponsesAction(surveyParts, PIN);
    }
  };

  submitPIN = () => {
    const { PINExist } = this.props;
    if (PINExist) {
      // check if PIN alrady submitted survey
      Modal.error({
        title: 'Error!',
        content: "The PIN you've entered has already submitted this survey.",
        onOk: this.sectionChange('back'),
      });
    }
  };

  // takes section as an input and referes to submitType
  customSubmit = section => {
    const { PIN, surveyParts } = this.state;
    switch (section) {
      case 'enterPIN':
        this.submitPIN(PIN, surveyParts);
        break;
      default:
        return null;
    }
  };

  render() {
    const { section, PINerror } = this.state;
    const { surveyData } = this.props;

    const loadingError = Object.keys(surveyData.msg).length > 0;

    const { surveyData: surveyDetails } = surveyData;
    // console.log('section', section);
    // console.log('PIN', PIN);

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
                  <EnterPIN
                    handlePIN={this.handlePIN}
                    onPINBlur={this.checkPINonBlur}
                    renderSkipButtons={this.renderSkipButtons('enterPIN')}
                    PINerror={PINerror}
                  />
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
    PINExist: state.survey.PINExist,
  };
};

export default connect(
  mapStateToProps,
  { fetchSurveyData, checkPINResponses }
)(Survey);
