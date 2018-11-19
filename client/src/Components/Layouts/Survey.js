import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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
  };

  componentDidMount() {
    const { location } = this.props;
    console.log("path", location.pathname);
    const survey = location.pathname;
    getQuestions(survey)
      .then((res) => {
        console.log("RES", res);
        this.setState({
          surveyDetails: res,
          loading: false,
        });
      })
      .catch(err => console.error(err.stack));
  }

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
        <form>
          <h3>Survey Questions:</h3>
          <Questions questions={surveyQs} onChange={this.handleChange} answers={formState} />
          <button type="submit">Submit Feedback</button>
        </form>
      </SurveyQs>
    );
  }
}

Survey.propTypes = {
  location: PropTypes.string.isRequired,
};
