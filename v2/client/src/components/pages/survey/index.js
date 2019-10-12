import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import { Alert, Modal, Progress, message } from 'antd';

import Spin from '../../common/Spin';
import { surveysTypes } from '../../../constants';

// Styles
import Header from '../../common/Header';
import Button from '../../common/Button';
import {
  Container,
  SpinWrapper,
  SkipButtonsDiv,
  Form,
  FooterDiv,
  SubmitBtn,
  StepProgress,
  ProgressWrapper,
  StepTitle,
} from './Survey.style';

import { colors } from '../../../theme';

// Actions
import {
  fetchSurveyData,
  checkPINResponses,
  submitSurvey,
  getParticipantByPIN,
} from '../../../actions/surveyAction';

// Components
import ConfirmSurvey from './ConfirmSurvey';
import EnterPIN from './EnterPIN';
import SurveyQs from './SurveyQs';

// Helpers
import { validPIN } from '../../../helpers/surveyValidation';

class Survey extends Component {
  state = {
    surveyParts: '',
    disagreedToResearch: false,
    formState: {},
    PIN: '',
    PINerror: '',
    PINvalid: false,
    section: 'confirmSurvey',
    completionRate: 0,
    currentStep: 1,
    maxNum: null,
    minNum: 0,
  };

  componentDidMount() {
    const { location, fetchSurveyData: fetchSurveyDataAction } = this.props;
    const survey = `${location.pathname}`;
    const surveyParts = survey.split('/')[2];
    // gets survey data and set state
    fetchSurveyDataAction(surveyParts);
    this.setState({ surveyParts });
    // info pop up
    Modal.info({
      title: 'Important Information',
      content:
        'Welcome to the Connect 5 evaluation. Before starting the survey process please make sure all the details related to your session are correct.',
    });
  }

  // enables user to change direction of sections (used by back and next buttons)
  sectionChange = (direction, uniqueGroups) => {
    let newSection;
    const { section } = this.state;

    if (direction === 'forward') {
      const foundIndex =
        uniqueGroups && uniqueGroups.findIndex(e => e === section);

      switch (section) {
        case 'confirmSurvey':
          newSection = 'enterPIN';
          break;
        case 'enterPIN':
          [newSection] = uniqueGroups;
          break;
        default:
          newSection = uniqueGroups[foundIndex + 1];
      }
      // backward direction
    } else {
      switch (section) {
        case 'Behavioural Insights':
          if (uniqueGroups[0] === 'Behavioural Insights') {
            newSection = 'enterPIN';
          } else {
            newSection = 'demographic';
          }
          break;
        case 'about your trainer':
          newSection = 'Behavioural Insights';
          break;
        case 'about your usual way of teaching':
          if (uniqueGroups[0] === 'demographic') {
            newSection = 'demographic';
          } else {
            newSection = 'enterPIN';
          }
          break;
        default:
          newSection = section;
      }
    }
    this.setState({ section: newSection });
  };

  // renders back and next button and calls section change and submit actions
  renderSkipButtons = (section, disabled, uniqueGroups) => {
    const { PIN, surveyParts, currentStep, completionRate } = this.state;
    const readyForSubmission =
      completionRate === 100 &&
      section === uniqueGroups[uniqueGroups.length - 1];
    return (
      <SkipButtonsDiv>
        <Button
          label="Back"
          width="100px"
          height="50px"
          type="primary"
          onClick={() => {
            window.scrollTo(0, 0);
            this.sectionChange('back', uniqueGroups);
            this.setState({
              currentStep: currentStep === 1 ? 1 : currentStep - 1,
            });
          }}
        />

        {!readyForSubmission && (
          <Button
            label="Next"
            width="100px"
            height="50px"
            type="primary"
            disabled={
              section === uniqueGroups[uniqueGroups.length - 1] || disabled
            }
            onClick={() => {
              window.scrollTo(0, 0);
              this.sectionChange('forward', uniqueGroups);
              this.setState({
                currentStep:
                  currentStep === uniqueGroups.length + 1
                    ? uniqueGroups.length + 1
                    : currentStep + 1,
              });
              if (section === 'enterPIN') {
                this.submitPIN(PIN, surveyParts);
              }
            }}
          />
        )}
      </SkipButtonsDiv>
    );
  };

  // renders research confirmation popup at beginning of enterPIN section
  researchConfirm = () =>
    swal
      .fire({
        title: 'Research Cooperation <br>(University of Manchester)',
        type: 'info',
        text:
          'Many thanks for agreeing to fill in this form. Your responses will be collated by University of Manchester to evaluate Connect5. University of Manchester will use anonymised data collected for research purposes. Individuals will never been identified by their responses. If you do not consent for your data to be used for research purposes, please tick.',
        input: 'checkbox',
        inputPlaceholder: '<strong>I do not agree</strong>',
      })
      .then(result => {
        if (result.value) {
          swal
            .fire({
              type: 'error',
              text:
                'Thank you, your data will not be used for research purposes',
            })
            .then(() => this.setState({ disagreedToResearch: true }));
          // do something here
        } else if (result.value === 0) {
          swal.fire({ type: 'success', text: 'Thank you!' });
        } else {
          console.log(`modal was dismissed by ${result.dismiss}`);
        }
      });

  // VALIDATION
  // handles user input for PIN field
  handlePIN = e => {
    const { value } = e.target;
    this.setState({ PIN: value }, () => {
      if (value.length === 5) {
        this.checkPINonBlur();
      }
    });
  };

  // validates PIN input on blur/focus
  checkPINonBlur = () => {
    const {
      checkPINResponses: checkPINResponsesAction,
      getParticipantByPIN: getParticipantByPINAction,
      surveyData,
    } = this.props;
    const { sessionId } = surveyData.surveyData;

    const { surveyParts, PIN } = this.state;
    // error handling
    if (PIN.length < 5) {
      this.setState({
        PINerror: 'PIN must contain 5 characters',
        PINvalid: false,
      });
    }
    if (PIN.length === 5) {
      // check if PIN is in right format
      if (!validPIN(PIN)) {
        this.setState({
          PINerror: 'PIN must be in the right format (e.g. ABC01)',
          PINvalid: false,
        });
        // reset error state
      } else {
        this.setState({ PINerror: '', PINvalid: true });
      }
      // check if PIN alrady submitted this exact survey -> throw error in submit PIN
      checkPINResponsesAction(surveyParts, PIN);

      // check if participant has already filled out demographic section in previous surveys -> skip that part when submitting
      getParticipantByPINAction(PIN, sessionId);
    }
  };

  // submits and validates PIN request
  submitPIN = () => {
    const { PINExist, surveyData, history } = this.props;
    const { preSurveyResponses, surveyData: surveyInfo } = surveyData;
    const { sessionType, surveyType } = surveyInfo;

    // post surveys relevant to be checked if someone filled out pre-survey
    // sessions that have -pre- survey
    const sessionsHavePreSurvey = Object.entries(surveysTypes)
      .filter(([_sessionType, surveysArray]) => {
        let hasPreSurvey = false;

        surveysArray.forEach(survey => {
          if (survey.includes('pre')) {
            hasPreSurvey = true;
          }
        });

        return hasPreSurvey === true;

        // if (hasPreSurvey) {
        //   return _sessionType;
        // }
      })
      .map(([_sessionType, surveysArray]) => _sessionType);

    // set up pre-survey link for re-direction if pre-survey needs to get filled out
    const linkArr = history.location.pathname.split('/');
    // surveyType
    const preSurveyTitle = surveysTypes[sessionType][0];
    const shortId = linkArr[2].split('&')[1];

    // check if current survey is pre
    const isPreSurvey = surveyType.includes('pre');

    // check if PIN alrady submitted survey
    if (PINExist) {
      Modal.error({
        title: 'Error!',
        content: "The PIN you've entered has already submitted this survey.",
        onOk: this.sectionChange('back'),
      });
    }
    // if relevant session check if PIN has already filled out pre survey and if this is a pre or post survey
    if (sessionsHavePreSurvey.includes(sessionType)) {
      if (!PINExist && !preSurveyResponses.preResponseExists && !isPreSurvey) {
        Modal.error({
          title: 'Please fill out the pre-survey for this session!',
          content:
            'Before filling out this Post Session Survey please submit the Pre Session Survey. Clicking OK will bring you to the right survey.',
          onOk: () => {
            history.push(`/survey/${preSurveyTitle}&${shortId}`);
            window.location.reload();
          },
        });
      }
    }
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
    const { formState } = this.state;
    const { surveyData } = this.props;
    const { surveyData: surveyDetails, uniqueGroups } = surveyData;

    if (formState && surveyDetails) {
      const questions = surveyDetails.questionsForSurvey.filter(question => {
        return uniqueGroups.includes(question.group.text);
      });
      const numberOfQs = questions.length;
      const numberOfAs = Object.values(formState).length;
      const rate = Math.ceil((numberOfAs / numberOfQs) * 100);

      this.setState({ completionRate: rate });
    } else {
      this.setState({ completionRate: 0 });
    }
  };

  // set maxNumber for beahviouralInsights1
  setMaxNumber = (code, number) => {
    if (code === 'People') {
      this.setState({ maxNum: number });
    }
  };

  // set minNumber the maxNumber can be
  setMinNumber = number => {
    const { minNum } = this.state;
    if (number > minNum) {
      this.setState({ minNum: number });
    }
  };

  // use maxNumber for beahviouralInsights1
  testNumber = (code, number) => {
    const { maxNum } = this.state;
    if (['B1', 'B2', 'B3'].includes(code)) {
      if (maxNum < number) {
        message.error(
          'Number cannot be greater than the total number of people you have seen in the last week'
        );
        return maxNum;
      }
      return number;
    }
    return number;
  };

  // check for any changes to the survey inputs and add them to the formstate
  handleChange = e => {
    const { group, field, code, type } = e.target.dataset;
    const question = e.target.name;
    const { formState } = this.state;
    // if any other type we assign the value to answer and put it in the state
    const answer = { answer: e.target.value, question };

    if (type === 'numberPositive') {
      answer.answer = this.testNumber(code, answer.answer);
      if (answer.answer === '' || answer.answer === null) {
        answer.answer = 0;
      }
    }
    if (group === 'demographic') {
      answer.participantField = field;
    }
    this.setState({ formState: { ...formState, [question]: answer } }, () => {
      this.trackAnswers();
    });
  };

  handleStarChange = (answer, question, participantField) => {
    const { formState } = this.state;
    // remove 1 from the answer so it's 0 to 5 not 1 to 6
    const fixedAnswer = {
      answer: answer - 1,
      question,
      participantField,
    };
    this.setState(
      { formState: { ...formState, [question]: fixedAnswer } },
      () => {
        this.trackAnswers();
      }
    );
  };

  handleDropdown = (answer, question, participantField) => {
    const { formState } = this.state;
    const answerObj = { answer, question, participantField };
    this.setState(
      { formState: { ...formState, [question]: answerObj } },
      () => {
        this.trackAnswers();
      }
    );
  };

  handleAntdDatePicker = (question, value, group, field) => {
    // const question = e.target.name;
    const { formState } = this.state;
    // if any other type we assign the value to answer and put it in the state
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
    const {
      surveyData,
      submitSurvey: submitSurveyAction,
      isAuthenticated,
      role,
    } = this.props;
    const { uniqueGroups } = surveyData;
    const { surveyType, sessionId, questionsForSurvey } = surveyData.surveyData;
    // these are the base of validation in the backend (checked against formstate to see if everything was getting answered correctly)
    const questionsForParticipant = questionsForSurvey.filter(question => {
      return uniqueGroups.includes(question.group.text);
    });

    // // set the current question to focus on
    // setCurrentQuestion = questionId => {
    //   this.setState({ currentQuestion: questionId })
    // }

    const { formState, PIN, disagreedToResearch, completionRate } = this.state;

    const formSubmission = {
      PIN: PIN && PIN.toUpperCase(),
      sessionId,
      surveyType,
      formState,
      disagreedToResearch,
      questionsForParticipant,
    };
    if (PIN && completionRate === 100) {
      submitSurveyAction({ formSubmission, isAuthenticated, sessionId, role });
    }
  };

  render() {
    const {
      formState,
      section,
      PINerror,
      PINvalid,
      completionRate,
      PIN,
      currentStep,
      // currentQuestion
    } = this.state;

    const { surveyData, errors } = this.props;
    const { uniqueGroups } = surveyData;

    const loadingError = Object.keys(surveyData.msg).length > 0;

    const readyForSubmission =
      completionRate === 100 &&
      section === uniqueGroups[uniqueGroups.length - 1];

    const { surveyData: surveyDetails } = surveyData;
    const answers = Object.keys(formState);

    const surveyGroups = [
      'demographic',
      'Behavioural Insights',
      'about your trainer',
      'about your usual way of teaching',
    ];

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
                <Form onSubmit={this.handleSubmit}>
                  {section === 'confirmSurvey' && (
                    <ConfirmSurvey
                      sessionDate={surveyData.surveyData.sessionDate}
                      trainerNames={surveyData.surveyData.trainerNames}
                      surveyType={surveyData.surveyData.surveyType}
                      sessionType={surveyData.surveyData.sessionType}
                      sectionChange={this.sectionChange}
                      researchConfirm={this.researchConfirm}
                    />
                  )}
                  {section === 'enterPIN' && (
                    <EnterPIN
                      key={section}
                      PIN={PIN}
                      PINvalid={PINvalid}
                      handlePIN={this.handlePIN}
                      onPINBlur={() => this.checkPINonBlur}
                      renderSkipButtons={this.renderSkipButtons(
                        'enterPIN',
                        !PINvalid,
                        uniqueGroups
                      )}
                      PINerror={PINerror}
                      completionRate={completionRate}
                    />
                  )}
                  {/* survey questions start */}
                  {surveyGroups.includes(section) &&
                    uniqueGroups.map(group => {
                      const questions =
                        surveyDetails &&
                        surveyDetails.questionsForSurvey.filter(
                          question => question.group.text === group
                        );
                      if (section === group) {
                        const unanswered = questions
                          .map(q => q._id)
                          .filter(q => !answers.includes(q));

                        return (
                          <SurveyQs
                            key={group}
                            questions={questions}
                            onChange={this.handleChange}
                            handleStarChange={this.handleStarChange}
                            handleDropdown={this.handleDropdown}
                            handleOther={this.handleOther}
                            answers={formState}
                            selectCheckedItem={this.selectCheckedItem}
                            errors={errors}
                            handleAntdDatePicker={this.handleAntdDatePicker}
                            renderSkipButtons={this.renderSkipButtons(
                              group,
                              section === 'demographic' &&
                                unanswered.length > 0,
                              uniqueGroups,
                              completionRate
                            )}
                            completionRate={completionRate}
                            setMaxNumber={this.setMaxNumber}
                            testNumber={this.testNumber}
                            // currentQuestion={currentQuestion}
                            // setCurrentQuestion={this.setCurrentQuestion}
                          />
                        );
                      }
                      return null;
                    })}
                  {readyForSubmission && (
                    <SubmitBtn type="submit">Submit Feedback</SubmitBtn>
                  )}
                </Form>
                {/* footer rendering */}
                {section !== 'confirmSurvey' && (
                  <FooterDiv colorChange={readyForSubmission}>
                    <ProgressWrapper>
                      <span>Your progress</span>
                      <Progress
                        percent={completionRate}
                        strokeColor={`${colors.green}`}
                        style={{ color: 'white !important' }}
                      />
                    </ProgressWrapper>
                    <StepProgress>
                      <StepTitle>Step</StepTitle>
                      {section === 'enterPIN' ? 1 : currentStep}/
                      {uniqueGroups.length + 1}
                    </StepProgress>
                  </FooterDiv>
                )}
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
    PINExist: state.survey.PINExist,
    skipDemo: state.survey.skipDemo,
    errors: state.survey.errors,
    role: state.auth.role,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(
  mapStateToProps,
  { fetchSurveyData, checkPINResponses, submitSurvey, getParticipantByPIN }
)(Survey);
