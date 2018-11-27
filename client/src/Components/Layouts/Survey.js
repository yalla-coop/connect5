import React from "react";
import styled from "styled-components";
import axios from "axios";
import swal from "sweetalert";

import ReactRouterPropTypes from "react-router-prop-types";

import getQuestions from "../../Utils/getQuestions";

import Questions from "../Questions";

const SurveyQs = styled.div`
  padding: 16px;
`;

// formState will be the object where we store survey responses
// as the participant answers the questions
export default class Survey extends React.Component {
  static propTypes = {
    history: ReactRouterPropTypes.history,
  };

  static defaultProps = {
    history: null,
  };

  state = {
    formState: {},
    surveyDetails: null,
    loading: true,
    sessionId: null,
    surveyType: null,
    errors: {},
  };

  componentDidMount() {
    // grab the unique url at the end which gives us survey type and session id
    const { location } = this.props;
    const survey = location.pathname;
    const responseId = survey.split("/")[2];

    // util function that will fetch the questions and session details
    getQuestions(survey)
      .then((res) => {
        const { sessionId, surveyId } = res;
        this.setState({
          surveyDetails: res,
          loading: false,
          responseId,
          sessionId,
          surveyType: surveyId,
        });
      })
      .catch(err => console.error(err.stack));
  }

  // function that will check if the div for the answer has been selected and if so add that answer to the formstate
  selectCheckedItem = (value, questionId) => {
    const state = this.state.formState;
    state[questionId] = value;
    this.setState({ formState: state });
    // this.checkSelected(elementId, questionId)
    console.log("FORMSTATE", this.state.formState);
  };

  // check for any changes to the survey inputs and add them to the formstate
  handleChange = (e) => {
    const question = e.target.name;
    const state = this.state.formState;
    let answer;

    // if a checkbox we need to treat differently as this will be an array of answers
    if (e.target.type === "checkbox") {
      answer = e.target.value;
      if (!state[question]) {
        state[question] = [answer];
      } else if (!state[question].includes(answer)) {
        state[question].push(answer);
      } else if (state[question].includes(answer)) {
        const index = state[question].indexOf(answer);
        state[question].splice(index, 1);
      }
    } else {
      // if any other type we assign the value to answer and put it in the state
      answer = e.target.value;
      state[question] = answer;
    }

    this.setState(() => ({
      formState: state,
    }));

    console.log("FORMSTATE", this.state.formState);
  };

  // function to deal with the matrix rating questions
  // where there are multiple rows with sub questions and options
  handleMatrix = (row, answer, question) => {
    const state = this.state.formState;

    if (!state[question]) {
      state[question] = {};
      state[question][row] = answer;
    } else {
      state[question][row] = answer;
    }

    this.setState(() => ({
      formState: state,
    }));

    console.log("FORMSTATE", this.state.formState);
  };

  // when participant submits form
  // this puts the required info into an object and sends to server
  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    const {
      responseId, formState, sessionId, surveyType,
    } = this.state;
    console.log("RESPONSEID", responseId);
    const formSubmission = { formState, sessionId, surveyType };
    // console.log(formSubmission);
    axios
      .post(`/submit/${responseId}`, formSubmission)
      .then(
        swal("Done!", "Thanks for submitting your feedback!", "success").then(() => history.push("/home")),
      )
      .catch((err) => {
        console.log("ERR", err);
        this.setState({
          errors: err.response.data,
        });
        swal({
          icon: "error",
          title: "Please answer all required questions",
        });
      });
  };

  render() {
    const { loading, surveyDetails, formState } = this.state;
    if (loading) {
      return <h3>Loading...</h3>;
    }

    const { sessionDate, trainerName, surveyQs } = surveyDetails;

    return (
      <SurveyQs>
        <div>
          <h3>Session Details:</h3>
          <p>
            Session Date:
            {sessionDate}
          </p>
          <p>
            Trainer:
            {trainerName}
          </p>
        </div>
        <form onSubmit={this.handleSubmit}>
          <h3>Survey Questions:</h3>
          <Questions
            questions={surveyQs}
            onChange={this.handleChange}
            handleMatrix={this.handleMatrix}
            answers={formState}
            selectCheckedItem={this.selectCheckedItem}
          />
          <button type="submit">Submit Feedback</button>
        </form>
      </SurveyQs>
    );
  }
}
