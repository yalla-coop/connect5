import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';

// import ReactRouterPropTypes from 'react-router-prop-types';

// import getQuestions from '../../Utils/getQuestions';

import Questions from './Questions';

import {
  SurveyQs,
  SurveyHeader,
  SessionDetails,
  Form,
  Disclaimer,
} from './Survey.style';

// formState will be the object where we store survey responses
// as the participant answers the questions
export default class Survey extends React.Component {
  // static propTypes = {
  //   history: ReactRouterPropTypes.history,
  // };

  // static defaultProps = {
  //   history: null,
  // };

  // state = {
  //   formState: {},
  //   surveyDetails: null,
  //   loading: true,
  //   sessionId: null,
  //   surveyType: null,
  //   errors: {},
  // };

  componentWillMount() {
    // grab the unique url at the end which gives us survey type and session id
    // hardcoded url for now: pre-day-1_5cdac6bf97f66747f7c86c90
    const { location } = this.props;
    const survey = `${location.pathname}`;
    const surveyParts = survey.split('/')[2];

    axios.get(`/api/survey/${surveyParts}`).then(res => {
      console.log(res.data);
    });

    // // util function that will fetch the questions and session details
    // getQuestions(survey)
    //   .then(res => {
    //     const { sessionId, surveyId } = res;
    //     this.setState({
    //       surveyDetails: res,
    //       loading: false,
    //       responseId,
    //       sessionId,
    //       surveyType: surveyId,
    //     });
    //   })
    //   .then(() => {
    //     swal({
    //       text:
    //         'Many thanks for agreeing to fill in this form. Your feedback will be kept anonymous and will only take you a couple of minutes to complete. Your feedback helps us evaluate and improve the program.',
    //       button: 'Begin',
    //     });
    //   })
    //   .catch(err => console.error(err.stack));
  }

  // function that will check if the div for the answer has been selected and if so add that answer to the formstate
  // selectCheckedItem = (value, questionId) => {
  //   const state = this.state.formState;
  //   state[questionId] = value;
  //   this.setState({ formState: state });
  //   // this.checkSelected(elementId, questionId)
  //   console.log('FORMSTATE', this.state.formState);
  // };

  // // check for any changes to the survey inputs and add them to the formstate
  // handleChange = e => {
  //   const question = e.target.name;
  //   const state = this.state.formState;
  //   let answer;

  //   // if a checkbox we need to treat differently as this will be an array of answers
  //   if (e.target.type === 'checkbox') {
  //     answer = e.target.value;
  //     if (!state[question]) {
  //       state[question] = [answer];
  //     } else if (!state[question].includes(answer)) {
  //       state[question].push(answer);
  //     } else if (state[question].includes(answer)) {
  //       const index = state[question].indexOf(answer);
  //       state[question].splice(index, 1);
  //     }
  //   } else {
  //     // if any other type we assign the value to answer and put it in the state
  //     answer = e.target.value;
  //     state[question] = answer;
  //   }

  //   this.setState(() => ({
  //     formState: state,
  //   }));

  //   console.log('FORMSTATE', this.state.formState);
  // };

  // handleOther = e => {
  //   const question = e.target.name;
  //   const state = this.state.formState;
  //   let answer;

  //   if (e.target.id === 'other-checkbox') {
  //     answer = `Other: ${e.target.value}`;
  //     if (!state[question].includes(answer)) {
  //       state[question].push(answer);
  //     } else if (state[question].includes(answer)) {
  //       const index = state[question].indexOf(answer);
  //       state[question].splice(index, 1);
  //     }
  //     if (state[question].includes('Other: ')) {
  //       const index = state[question].indexOf('Other: ');
  //       state[question].splice(index, 1);
  //     }
  //   } else {
  //     answer = `Other: ${e.target.value}`;
  //     state[question] = answer;
  //   }

  //   this.setState(() => ({
  //     formState: state,
  //   }));

  //   console.log('FORMSTATE', this.state.formState);
  // };

  // // function to deal with the matrix rating questions
  // // where there are multiple rows with sub questions and options
  // handleMatrix = (row, answer, question) => {
  //   const state = this.state.formState;

  //   if (!state[question]) {
  //     state[question] = {};
  //     state[question][row] = answer;
  //   } else {
  //     state[question][row] = answer;
  //   }

  //   this.setState(() => ({
  //     formState: state,
  //   }));

  //   console.log('FORMSTATE', this.state.formState);
  // };

  // // when participant submits form
  // // this puts the required info into an object and sends to server
  // handleSubmit = e => {
  //   e.preventDefault();
  //   const { history } = this.props;
  //   const { responseId, formState, sessionId, surveyType } = this.state;
  //   console.log('RESPONSEID', responseId);
  //   const formSubmission = { formState, sessionId, surveyType };
  //   // console.log(formSubmission);
  //   axios
  //     .post(`/submit/${responseId}`, formSubmission)
  //     .then(result => {
  //       swal('Done!', 'Thanks for submitting your feedback!', 'success').then(
  //         () => history.push('/')
  //       );
  //     })
  //     .catch(err => {
  //       console.log('ERR', err);
  //       this.setState({
  //         errors: err.response.data,
  //       });
  //       swal({
  //         icon: 'error',
  //         title: 'Please answer all required questions',
  //       });
  //     });
  // };

  render() {
    // const { loading, surveyDetails, formState, errors } = this.state;
    // if (loading) {
    //   return <h3>Loading...</h3>;
    // }

    // const { sessionDate, trainerName, surveyQs } = surveyDetails;

    return (
      <SurveyQs>
        <SurveyHeader>
          <h1>Training Survey</h1>
        </SurveyHeader>
        <main>
          <SessionDetails>
            <h3>Session Details:</h3>
            <p>
              <span>Session Date: </span>
              {/* {sessionDate} */}
            </p>
            <p>
              <span>Trainer: </span>
              {/* {trainerName} */}
            </p>
          </SessionDetails>
          <Disclaimer>
            <h3>Privacy notice</h3>
            <p>
              RSPH will use your information to evaluate the outcomes of our
              mental health promotion project Connect 5 at national and regional
              level. The quantitative results of this survey will be presented
              in an aggregated manner and all comments will be anonymous.
            </p>
            <p>
              Our legal basis for processing your information is to fulfill our
              legitimate interests as a developer of public health projects and
              manage the programs we offer. Managing development projects
              includes administering records, providing and organising
              activities; arranging training; events; webinars; conferences;
              special interest groups; awards; CPD; education; research;
              monitoring for equal opportunity purposes; advising you of our
              services; maintaining our own accounts and records.
            </p>
            <p>
              We will retain your personal information for the duration of your
              association with RSPH. When your association with us expires we
              will continue to retain some of your information in order to be
              able to prove your association if needed. We will delete the
              information which is no longer required for six years after your
              association expires. We will send you relevant information about
              the services we provide to our members.
            </p>
            <p>
              We may share some of your personal information with our
              commissioners such as Health Education England or the organisation
              that has commissioned the Connect 5 training you received. We will
              not share your personal information with any other organisation
              without your prior consent, unless we are required to do so by
              law. For further information on how your information is used, how
              we maintain the security of your information, and your rights to
              access the information we hold on you, please see our{' '}
              <a href="https://www.rsph.org.uk/privacy-policy.html">
                privacy policy
              </a>
              .
            </p>
          </Disclaimer>
          <Form>
            <h3>Survey Questions:</h3>
            {/* <Questions
              questions={surveyQs}
              onChange={this.handleChange}
              handleMatrix={this.handleMatrix}
              handleOther={this.handleOther}
              answers={formState}
              selectCheckedItem={this.selectCheckedItem}
              errors={errors}
            /> */}
            <button type="submit">Submit Feedback</button>
          </Form>
        </main>
      </SurveyQs>
    );
  }
}
