import React, { Component, Fragment } from "react";
import axios from "axios";
import ReactRouterPropTypes from "react-router-prop-types";

import Answer from "./Answer";

import {
  IndividualWrapper,
  NavigationWrapper,
  Arrow,
  ResponseCounter,
  QuestionSpan,
  IndividualQuestion,
  Error,
} from "../StyledComponents";

import getResponsesArray from "./get_responses_array";
import joinQuestionsWithAnwsers from "./join_question_answer";

class IndividualResults extends Component {
  static propTypes = {
    history: ReactRouterPropTypes.history,
    match: ReactRouterPropTypes.match,
  };

  static defaultProps = {
    history: null,
    match: null,
  }

  state ={
    joinedAnswers: [],
    answers: [],
  }

  componentDidMount() {
    const { history, match } = this.props;
    // get session responses from backend
    axios.get(`/session/responses/${match.params.sessionId}/${match.params.sessionType}`)

      // save the data comes from backend into the state
      .then(({ data }) => data.map(item => this.setState(item)))
      .then(() => {
        const { answers, questions } = this.state;
        // get an array of responses IDs and store it in the state
        const responses = getResponsesArray(answers);
        this.setState(() => ({ responses, activeIndex: 0 }), () => {
          // join the answer objects with question objects
          const joinedAnswers = joinQuestionsWithAnwsers(questions, answers);

          if (joinedAnswers.length < 1) {
            this.setState({ noResults: true });
          } else {
            this.setState({ joinedAnswers });
          }
        });
      })
      .catch(() => history.push("/server-error"));
  }

  // controll the navigation through the sessions
  handleNextPrev = (e) => {
    const { activeIndex, responses } = this.state;
    const inc = Number(e.target.id);
    let newIndex = 0;
    if (activeIndex + inc >= responses.length) {
      newIndex = 0;
    } else if (activeIndex + inc < 0) {
      newIndex = responses.length - 1;
    } else {
      newIndex = activeIndex + inc;
    }
    this.setState({ activeIndex: newIndex });
  }


  render() {
    const {
      activeIndex, responses, joinedAnswers, noResults,
    } = this.state;
    const responseNumber = activeIndex + 1;
    const activeresonseid = responses && responses[activeIndex];

    return (
      <IndividualWrapper>

        {
          noResults
            ? <Error>This session has no responses yet :(</Error>
            : (
              <div>
                <NavigationWrapper>
                  <Arrow direction="right" id="-1" onClick={this.handleNextPrev} />

                  <ResponseCounter>
                    {responseNumber}
                    {" "}
              OF
                    {" "}
                    {responses && responses.length}
                  </ResponseCounter>

                  <Arrow direction="left" id="+1" onClick={this.handleNextPrev} />
                </NavigationWrapper>

                {joinedAnswers.map(answer => (answer.response === activeresonseid && (
                  <Fragment key={answer._id}>

                    <IndividualQuestion>
                      <QuestionSpan>
                  Q.
                      </QuestionSpan>
                      {answer.questionText}
                      <Answer answer={answer} />
                    </IndividualQuestion>

                  </Fragment>
                )
                ))}
              </div>
            )
        }


      </IndividualWrapper>
    );
  }
}

export default IndividualResults;
