import React from "react";
import PropTypes from "prop-types";

import getQuestions from "../../Utils/getQuestions";

import Questions from "../Questions";

export default class Survey extends React.Component {
  state = {
    response: null,
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
          response: res,
          loading: false,
        });
      })
      .catch(err => console.error(err.stack));
  }

  render() {
    const { loading, response } = this.state;
    if (loading) {
      return <h3>Loading...</h3>;
    }

    const { sessionDate, trainerName, surveyQs } = response;

    return (
      <React.Fragment>
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
          <Questions questions={surveyQs} />
          <button type="submit">Submit Feedback</button>
        </form>
      </React.Fragment>
    );
  }
}

Survey.propTypes = {
  location: PropTypes.string.isRequired,
};
