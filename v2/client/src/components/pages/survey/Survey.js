import React from 'react';

import { Progress } from 'antd';
import Header from '../../common/Header';

import Questions from './Questions';

import { colors } from '../../../theme';

import {
  Container,
  SurveyQs,
  SessionDetails,
  Form,
  ProgressWrapper,
} from './Survey.style';

import ConfirmSurvey from './ConfirmSurvey';

// formState will be the object where we store survey responses
// as the participant answers the questions
class Survey extends React.Component {
  state = {
    formState: {},
    disagreedToResearch: false,
    surveyDetails: null,
    loading: true,
    sessionId: null,
    PIN: null,
    errors: {},
    completionRate: 0,
    surveyParts: '',
    section: 'confirmSurvey',
  };

  componentWillMount() {
    // grab the unique url at the end which gives us survey type and session id
    // syntax of url: surveyType&sessionId
    const { location } = this.props;
    const survey = `${location.pathname}`;
    const surveyParts = survey.split('/')[2];
    window.scrollTo(0, 0);

    axios
      .get(`/api/survey/${surveyParts}`)
      .then(res => {
        const { sessionId, surveyType } = res.data;

        this.setState({
          surveyDetails: res.data,
          loading: false,
          sessionId,
          surveyType,
          surveyParts,
        });
      })
      // .then(() => {
      //   swal
      //     .fire({
      //       title: 'Research Cooperation <br>(University of Manchester)',
      //       type: 'info',
      //       text:
      //         'Many thanks for agreeing to fill in this form. Your responses will be collated by University of Manchester to evaluate Connect5. University of Manchester will use anonymised data collected for research purposes. Individuals will never been identified by their responses. If you do not consent for your data to be used for research purposes, please tick.',
      //       input: 'checkbox',
      //       inputPlaceholder: '<strong>I do not agree</strong>',
      //     })
      //     .then(result => {
      //       if (result.value) {
      //         swal
      //           .fire({
      //             type: 'error',
      //             text:
      //               'Thank you, your data will not be used for research purposes',
      //           })
      //           .then(() => this.setState({ disagreedToResearch: true }));
      //         // do something here
      //       } else if (result.value === 0) {
      //         swal.fire({ type: 'success', text: 'Thank you!' });
      //       } else {
      //         console.log(`modal was dismissed by ${result.dismiss}`);
      //       }
      //     });
      // })
      .catch(err => console.error(err.stack));
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
  };

  // function that will check if the div for the answer has been selected and if so add that answer to the formstate
  selectCheckedItem = (value, questionId) => {
    const { formState } = this.state;
    formState[questionId] = value;
    this.setState({ formState }, () => {
      this.trackAnswers();
    });
  };

  checkPINResponsesOnSurvey = event => {
    const PIN = event.target.value;
    const { surveyParts, errors } = this.state;

    if (PIN.length === 5) {
      axios.get(`/api/survey/${surveyParts}/${PIN}`).then(({ data }) => {
        const { exist } = data;
        if (exist) {
          this.setState({
            PINExist: true,
            errors: {
              ...errors,
              PIN: "The PIN you've entered has already submitted this survey",
            },
          });
        } else {
          this.setState({
            PINExist: false,
            errors: { ...errors, PIN: '' },
          });
          this.trackAnswers();
        }
      });
    }
  };

  // function to track progress on survey
  trackAnswers = () => {
    const { surveyDetails, formState, PIN } = this.state;

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

  // handles user input for PIN field
  handlePIN = e => {
    const PIN = e.target.value;

    this.setState({ PIN }, () => {
      if (PIN.length === 5) {
        this.trackAnswers();
      }
    });
  };

  // // when participant submits form
  // // this puts the required info into an object and sends to server
  handleSubmit = e => {
    e.preventDefault();
    const { history } = this.props;
    const {
      formState,
      sessionId,
      surveyType,
      PIN,
      disagreedToResearch,
      PINExist,
    } = this.state;

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
    const {
      loading,
      surveyDetails,
      formState,
      errors,
      completionRate,
      section,
    } = this.state;

    if (loading) {
      return <h3>Loading...</h3>;
    }

    const { sessionDate, trainerNames, questionsForSurvey } = surveyDetails;
    return (
      <div>
        {section === 'confirmSurvey' && (
          <ConfirmSurvey surveyDetails={surveyDetails} />
        )}
        {/* <SurveyQs>
          <Header type="home" />
          <SessionDetails>
            <h3>Connect 5 Evaluation</h3>
            <ul>
              <li>
                <strong>Session Date: </strong>
                {sessionDate}
              </li>
              <li>
                <strong>Trainers: </strong>
                {this.renderTrainerNames(trainerNames)}
              </li>
            </ul>
          </SessionDetails>
          <main>
            <Form onSubmit={this.handleSubmit}>
              <Questions
                questions={questionsForSurvey}
                onChange={this.handleChange}
                handleOther={this.handleOther}
                handlePIN={this.handlePIN}
                answers={formState}
                selectCheckedItem={this.selectCheckedItem}
                errors={errors}
                handleAntdDatePicker={this.handleAntdDatePicker}
                onPINBlur={this.checkPINResponsesOnSurvey}
              />
              <button type="submit">Submit Feedback</button>
            </Form>
          </main>
        </SurveyQs>
        <ProgressWrapper>
          <Progress
            type="circle"
            percent={completionRate}
            width={80}
            strokeColor={`${colors.green}`}
          />
        </ProgressWrapper> */}
      </div>
    );
  }
}

export default Survey;
