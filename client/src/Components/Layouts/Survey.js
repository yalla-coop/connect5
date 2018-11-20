import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import axios from "axios";

import getQuestions from "../../Utils/getQuestions";

import Questions from "../Questions";

const SurveyQs = styled.div`
  padding: 16px;
`;

export default class Survey extends React.Component {
  state = {
    formState: {},
    surveyDetails: null,
    loading: true,
    surveyUrl: null,
  };

  componentDidMount() {
    const { location } = this.props;
    console.log("path", location.pathname);

    // grab the unique url at the end which gives us survey type and session id
    const survey = location.pathname;
    const responseId = survey.split('/')[2];
    console.log("URL", responseId)

    getQuestions(survey)
      .then((res) => {
        console.log("RES", res);
        this.setState({
          surveyDetails: res,
          loading: false,
          responseId: responseId,
        });
      })
      .catch(err => console.error(err.stack));
  }

  selectCheckedItem = (value, questionId) => {
    console.log("SELECTED", value);
    console.log("QUESTION", questionId);
    const state = this.state.formState;
    state[questionId] = value;
    this.setState({ formState: state });
    // this.checkSelected(elementId, questionId)
    console.log("FORMSTATE", this.state.formState);
  };

  // checkSelected = (value, questionId) => {
  //   // const state = this.state.formState;
  //   // console.log(value, questionId)

  //   // if (state[questionId] === value) {
  //   //   return true
  //   // } else return false
  //   console.log("hello")
  //   return true
  // }

  handleChange = (e) => {
    const question = e.target.name;
    const state = this.state.formState;
    let answer;

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
      answer = e.target.value;
      state[question] = answer;
    }

    this.setState(() => ({
      formState: state,
    }));

    console.log("FORMSTATE", this.state.formState);
  };

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

  handleSubmit = (e) => {
    e.preventDefault();
    const { responseId, formState } = this.state;
    axios
      .post(`/submit/${responseId}`, formState)
      .then(res => console.log(res))
      .catch(err => console.log(err));

    // fetch(`/submit/${this.state.surveyUrl}`, {
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   method: "POST",
    //   body: JSON.stringify(this.state.formState),
    // })
    // .catch(err => console.log(err))
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

Survey.propTypes = {
  location: PropTypes.string.isRequired,
};
