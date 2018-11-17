import React from "react";
import getQuestions from "../../Utils/getQuestions";

export default class Survey extends React.Component {
  state = {
    response: null,
    loading: true,
  };

  componentDidMount() {
    console.log("path", this.props.location.pathname);
    const survey = this.props.location.pathname;
    getQuestions(survey)
      .then(res => {
        console.log("RES", res);
        this.setState({
          response: res,
          loading: false,
        });
      })
      .catch(err => console.error(err.stack));
  }

  render() {
    if (this.state.loading) {
      return <h3>Loading...</h3>;
    }

    const { sessionDate, trainerName, surveyQs } = this.state.response;

    return (
      <React.Fragment>
        <div>
          <h3>Session Details:</h3>
          <p>Session Date: {sessionDate}</p>
          <p>Trainer: {trainerName}</p>
        </div>
        <div>
          <h3>Survey Questions:</h3>
          <p>{surveyQs[0].questionText}</p>
        </div>
      </React.Fragment>
    );
  }
}
