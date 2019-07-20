import React, { Component } from 'react';
import swal from 'sweetalert2';
import axios from 'axios';

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
import SurveyQs from './SurveyQs';

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
    surveyParts: '',
    PIN: '',
    disagreedToResearch: false,
    PINerror: '',
    errors: {},
    formState: {},
    PINSectionCompleted: false,
    section: 'confirmSurvey',
    completionRate: 0,
  };

  componentDidMount() {
    const { location, fetchSurveyData: fetchSurveyDataAction } = this.props;
    const survey = `${location.pathname}`;
    const surveyParts = survey.split('/')[2];
    fetchSurveyDataAction(surveyParts);
    this.setState({ surveyParts });
    window.scrollTo(0, 0);
  }

  // enables user to change direction of sections
  sectionChange = direction => {
    const { section } = this.state;
    let newSection;

    if (direction === 'forward') {
      switch (section) {
        case 'confirmSurvey':
          newSection = 'enterPIN';
          break;
        case 'enterPIN':
          newSection = 'demographics';
          break;
        default:
          newSection = section;
      }
    } else {
      switch (section) {
        case 'enterPIN':
          newSection = 'confirmSurvey';
          break;
        case 'demographics':
          newSection = 'enterPIN';
          break;

        default:
          newSection = section;
      }
    }
    this.setState({ section: newSection });
  };

  // renders back and next button and calls custom actions
  renderSkipButtons = (section, disabled) => (
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
        disabled={disabled}
        onClick={() => {
          this.sectionChange('forward');
          this.customSubmit(section);
        }}
      />
    </SkipButtonsDiv>
  );

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
    return null;
  };

  // PIN FUNCTIONS
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
      this.trackAnswers();
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
    // check demographic table
  };

  // SURVEY FUNCTIONS

  // function that will check if the div for the answer has been selected and if so add that answer to the formstate
  selectCheckedItem = (value, questionId) => {
    const { formState } = this.state;
    formState[questionId] = value;
    this.setState({ formState }, () => {
      this.trackAnswers();
    });
  };

  // function to track progress on survey
  trackAnswers = () => {
    const { formState, PIN } = this.state;
    const { surveyData } = this.props;
    const { surveyData: surveyDetails } = surveyData;

    if (formState && surveyDetails) {
      // add one to total list to include the pin
      const numberOfQs = surveyDetails.questionsForSurvey.length + 1;
      const numberOfAs = Object.values(formState).length;
      const pinAnswered = PIN.length === 5 ? 1 : 0;
      const rate = Math.ceil(((numberOfAs + pinAnswered) / numberOfQs) * 100);
      this.setState({ completionRate: rate });
    } else {
      this.setState({ completionRate: 0 });
    }
  };

  // // check for any changes to the survey inputs and add them to the formstate
  handleChange = e => {
    const { group, field } = e.target.dataset;

    const question = e.target.name;
    const { formState } = this.state;
    // if any other type we assign the value to answer and put it in the state
    const answer = { answer: e.target.value, question };
    if (group === 'demographic') {
      answer.participantField = field;
    }

    this.setState({ formState: { ...formState, [question]: answer } }, () => {
      this.trackAnswers();
    });
  };

  handleAntdDatePicker = (question, value, group, field) => {
    // const question = e.target.name;
    const { formState } = this.state;
    // if any other type we assign the value to answer and put it in the state
    // const answer = e.target.value;
    const answer = { answer: value, question };
    if (group === 'demographic') {
      answer.participantField = field;
    }

    this.setState({ formState: { ...formState, [question]: answer } }, () => {
      this.trackAnswers();
    });
  };

  // handles case when user selects 'other'
  handleOther = e => {
    const question = e.target.name;
    const { formState } = this.state;
    const { group, field } = e.target.dataset;

    const answer = { answer: `Other: ${e.target.value}`, question };
    if (group === 'demographic') {
      answer.participantField = field;
    }
    this.setState({ formState: { ...formState, [question]: answer } }, () => {
      this.trackAnswers();
    });
  };

  // when participant submits form
  // this puts the required info into an object and sends to server
  handleSubmit = e => {
    e.preventDefault();
    const { history, surveyData } = this.props;
    const { surveyType } = surveyData.surveyData;
    const { sessionId } = surveyData.surveyData;

    const { formState, PIN, disagreedToResearch, PINExist } = this.state;

    const formSubmission = {
      PIN: PIN && PIN.toUpperCase(),
      sessionId,
      surveyType,
      formState,
      disagreedToResearch,
    };
    if (PINExist) {
      return swal.fire({
        title: 'This PIN has already submited the survey before',
        type: 'error',
      });
    }

    // check if PIN was entered before API call
    if (PIN) {
      return axios
        .post(`/api/survey/submit/`, formSubmission)
        .then(() =>
          swal
            .fire('Done!', 'Thanks for submitting your feedback!', 'success')
            .then(() => history.push('/thank-you'))
        )
        .catch(err => {
          this.setState({
            errors: err.response.data,
          });
          swal.fire({
            title: 'Please answer all required questions',
            type: 'error',
          });
        });
    }
    return swal.fire({
      title: 'Please enter your PIN',
      type: 'error',
    });
  };

  render() {
    const { section, PINerror, PINSection, formState, errors } = this.state;
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
                    renderSkipButtons={this.renderSkipButtons(
                      'enterPIN',
                      !PINSection
                    )}
                    PINerror={PINerror}
                  />
                )}

                {section === 'demographics' && (
                  <SurveyQs
                    questions={surveyData.surveyData.questionsForSurvey.filter(
                      question => question.group === 'demographic'
                    )}
                    onChange={this.handleChange}
                    handleOther={this.handleOther}
                    answers={formState}
                    selectCheckedItem={this.selectCheckedItem}
                    errors={errors}
                    handleAntdDatePicker={this.handleAntdDatePicker}
                    renderSkipButtons={this.renderSkipButtons()}
                  />
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
