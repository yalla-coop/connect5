import React, { Component } from "react";
import axios from "axios";
import ReactRouterPropTypes from "react-router-prop-types";

import Popup from "./Popup";
import {
  StatisticsWrapper,
  StatisticsText,
  StatisticsSpan,
  SmallTitle,
  QuestionWrapper,
  QuestionText,
  Triangle,
} from "../StyledComponents";

class OverallResults extends Component {
  static propTypes = {
    history: ReactRouterPropTypes.history,
    match: ReactRouterPropTypes.match,
  };

  static defaultProps = {
    history: null,
    match: null,
  }

  state = {
    isPopupActive: false,
    attendeesNumber: null,
    questions: [],
    reponsesNumber: null,
  }

  componentDidMount() {
    const { history, match } = this.props;
    axios.get(`/session/details/${match.params.sessionId}/${match.params.sessionType}`)
      .then(({ data }) => data.map(item => this.setState(item)))
      .catch(() => history.push("/server-error"));
  }

  handleClosePopup = () => {
    this.setState({
      isPopupActive: false,
    });
  }


  handleOpenPopup = (event) => {
    window.scrollTo(0, 0);
    event.preventDefault();
    const id = event.target.id || event.target.parentNode.id;
    this.setState({
      isPopupActive: true,
      activeQuestionIndex: id,
    });
  }

  render() {
    const {
      reponsesNumber,
      attendeesNumber,
      questions,
      isPopupActive,
      activeQuestionIndex,
    } = this.state;

    const { handleOpenPopup, handleClosePopup } = this;
    const RsponsesRatio = Math.ceil((reponsesNumber / attendeesNumber) * 100);
    const activeQuestion = questions[activeQuestionIndex];
    const { match } = this.props;
    return (
      <div>

        <StatisticsWrapper>
          <StatisticsText>
            <StatisticsSpan>
            Number of Replies:
            </StatisticsSpan>
            {reponsesNumber}
            {" "}
          (out of
            {" "}
            {attendeesNumber}
            {" "}
          )
          </StatisticsText>

          <StatisticsText>

            <StatisticsSpan>
          Completion Rate:
            </StatisticsSpan>
            {RsponsesRatio}
          %
          </StatisticsText>
        </StatisticsWrapper>

        <SmallTitle>Responses</SmallTitle>
        {
          questions && questions.map((item, index) => (
            <QuestionWrapper onClick={handleOpenPopup} id={index} key={item._id}>
              <QuestionText>
                {item.questionText}
              </QuestionText>
              <Triangle />
            </QuestionWrapper>
          ))
        }

        {isPopupActive
          ? (
            <Popup
              handleClosePopup={handleClosePopup}
              questionId={activeQuestion._id}
              inputType={activeQuestion.inputType}
              questionText={activeQuestion.questionText}
              question={activeQuestion}
              sessionId={match.params.sessionId}
            />
          )
          : null}


      </div>

    );
  }
}

export default OverallResults;
