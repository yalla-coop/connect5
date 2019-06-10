import React from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import Header from '../../common/Header';

import Questions from './Questions';

import { Container, SurveyQs, SessionDetails, Form } from './Survey.style';

// formState will be the object where we store survey responses
// as the participant answers the questions
class Survey extends React.Component {
  state = {
    formState: {},
    surveyDetails: null,
    loading: true,
    sessionId: null,
    PIN: null,
    errors: {},
  };

  componentWillMount() {
    // grab the unique url at the end which gives us survey type and session id
    // syntax of url: surveyType&sessionId
    const { location } = this.props;
    const survey = `${location.pathname}`;
    const surveyParts = survey.split('/')[2];

    axios
      .get(`/api/survey/${surveyParts}`)
      .then(res => {
        const { sessionId, surveyType } = res.data;

        this.setState({
          surveyDetails: res.data,
          loading: false,
          sessionId,
          surveyType,
        });
      })
      .then(() => {
        swal
          .fire({
            title: 'Research Cooperation <br>(University of Manchester)',
            text:
              'Many thanks for agreeing to fill in this form. Your responses will be collated by University of Manchester to evaluate Connect5. University of Manchester will use anonymised data collected for research purposes. Individuals will never been identified by their responses. If you do not consent for your data to be used for research purposes, please tick.',
            input: 'checkbox',
            inputPlaceholder: '<strong>I don not agree</strong>',
          })
          .then(result => {
            if (result.value) {
              swal.fire({
                type: 'error',
                text:
                  'Thank you, your data will not be used for research purposes',
              });
              // do something here
            } else if (result.value === 0) {
              swal.fire({ type: 'success', text: 'Thank you!' });
            } else {
              console.log(`modal was dismissed by ${result.dismiss}`);
            }
          });
      })
      .catch(err => console.error(err.stack));
  }

  // function that will check if the div for the answer has been selected and if so add that answer to the formstate
  selectCheckedItem = (value, questionId) => {
    const { formState } = this.state;
    formState[questionId] = value;
    this.setState({ formState });
  };

  // // check for any changes to the survey inputs and add them to the formstate
  handleChange = e => {
    const question = e.target.name;
    const { formState } = this.state;
    // if any other type we assign the value to answer and put it in the state
    const answer = e.target.value;
    formState[question] = answer;
    this.setState(() => ({
      formState,
    }));
  };

  // handles case when user selects 'other'
  handleOther = e => {
    const question = e.target.name;
    const { formState } = this.state;
    const answer = `Other: ${e.target.value}`;
    formState[question] = answer;
    this.setState(() => ({
      formState,
    }));
  };

  // handles user input for PIN field
  handlePIN = e => this.setState({ PIN: e.target.value });

  // // when participant submits form
  // // this puts the required info into an object and sends to server
  handleSubmit = e => {
    e.preventDefault();
    const { history } = this.props;
    const { formState, sessionId, surveyType, PIN } = this.state;

    const formSubmission = { PIN, sessionId, surveyType, formState };
    // check if PIN was entered before API call
    if (PIN) {
      return axios
        .post(`/api/survey/submit/`, formSubmission)
        .then(() =>
          swal
            .fire('Done!', 'Thanks for submitting your feedback!', 'success')
            .then(() => history.push('/'))
        )
        .catch(err => {
          this.setState({
            errors: err.response.data,
          });
          swal.fire('Please answer all required questions');
        });
    }
    return swal.fire('Please enter your PIN');
  };

  // function to create a list of names from an array...
  renderTrainerNames = array =>
    array.map((e, i) =>
      array.length > 1 && array.length - 1 === i ? `and ${e}` : `${e} `
    );

  render() {
    const { loading, surveyDetails, formState, errors } = this.state;

    if (loading) {
      return <h3>Loading...</h3>;
    }

    const {
      sessionDate,
      trainerNames,
      questionsForSurvey,
      surveyType,
    } = surveyDetails;

    return (
      <Container>
        <SurveyQs>
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
              <li>
                <strong>Session Type: </strong>
                {surveyType}
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
              />
              <button type="submit">Submit Feedback</button>
            </Form>
          </main>
        </SurveyQs>
      </Container>
    );
  }
}

export default Survey;
