import React, { Component } from "react";
import axios from "axios";

import {
  ResultsOverviewWrapper, PageTitle, StatisicsContainer, TabsWrapper, Tab, SmallTitle, QuestionWrapper, QuestionText, Triangle,
} from "./StyledComponents";

import AttendanceResults from "./AttendanceResults";
import ResponsesResults from "./ResponsesResults";
import Popup from "./Popup";


class ResultsOverview extends Component {
  state = {
    activeTab: "attendance",
    isPopupActive: false,
    activeQuestionIndex: 0,
    attendees: [],
    responses: [],
    radiostarQuestions: [],
  }

  componentDidMount() {
    const { history, match } = this.props;

    axios.get("/trainer/overview")
      .then(({ data }) => data.map(item => this.setState(item)))
      .then(() => {
        axios.get("/question/radiostart/all")
          .then(({ data }) => {
            this.setState({ radiostarQuestions: data });
            console.log(data, "radiostarQuestions");
          });
      })
      .catch(() => history.push("/server-error"));
  }

  handleTabClick = (e) => {
    this.setState({
      activeTab: e.target.name,
    });
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
    const { activeTab, isPopupActive, activeQuestionIndex } = this.state;
    const { handleTabClick, handleOpenPopup, handleClosePopup } = this;

    return (
      <ResultsOverviewWrapper>
        <span>
          <PageTitle>Overview Results </PageTitle>
        </span>
        <StatisicsContainer>
          <TabsWrapper>
            <Tab
              name="attendance"
              active={activeTab === "attendance"}
              onClick={handleTabClick}
            >
            Attendance
            </Tab>
            <Tab
              name="responses"
              active={activeTab === "responses"}
              onClick={handleTabClick}
            >
           Responses
            </Tab>
          </TabsWrapper>
          {
            activeTab === "attendance"
              ? <AttendanceResults attendees={this.state.attendees} />
              : <ResponsesResults responses={this.state.responses} />
          }

        </StatisicsContainer>
        <SmallTitle>
            Responses
        </SmallTitle>
        {
          this.state.radiostarQuestions.map((item, index) => (
            <QuestionWrapper onClick={handleOpenPopup} id={index}>
              <QuestionText>
                {item._id}
              </QuestionText>
              <Triangle />
            </QuestionWrapper>
          ))
        }

        {isPopupActive
          ? (
            <Popup
              question={this.state.radiostarQuestions[activeQuestionIndex]}
              handleClosePopup={handleClosePopup}
            />
          )
          : null}
      </ResultsOverviewWrapper>
    );
  }
}

export default ResultsOverview;
/* <Popup
handleClosePopup={handleClosePopup}
questionId={activeQuestion._id}
inputType={activeQuestion.inputType}
questionText={activeQuestion.questionText}
question={activeQuestion}
sessionId={match.params.sessionId}
history={history}
/> */
