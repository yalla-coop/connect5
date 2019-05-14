import React, { Component } from "react";
import axios from "axios";
import ReactRouterPropTypes from "react-router-prop-types";
import ExportData from "../../Export";

import {
  ResultsOverviewWrapper,
  PageTitle,
  StatisicsContainer,
  TabsWrapper,
  Tab,
  SmallTitle,
  QuestionWrapper,
  QuestionText,
  Triangle,
} from "./StyledComponents";
import Popup from "./Popup";
import AttendanceResults from "./AttendanceResults";
import ResponsesResults from "./ResponsesResults";

import setAuthToken from "../../../Utils/setAuthToken";

class ResultsOverview extends Component {
  static propTypes = {
    history: ReactRouterPropTypes.history,
  };

  static defaultProps = {
    history: null,
  };

  state = {
    activeTab: "attendance",
    isPopupActive: false,
    activeQuestionIndex: 0,
    attendees: [],
    responses: [],
    radiostarQuestions: [],
  };

  componentDidMount() {
    const { history } = this.props;
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      axios
        .get("/trainer/overview")
        .then(({ data }) => data.map(item => this.setState(item)))
        .then(() => {
          // get all questions with radiostar type
          axios.get("/question/radiostart/all").then(({ data }) => {
            this.setState({ radiostarQuestions: data });
          });
        })
        .catch(() => history.push("/server-error"));
    }
  }

  handleTabClick = (e) => {
    this.setState({
      activeTab: e.target.name,
    });
  };

  handleClosePopup = () => {
    this.setState({
      isPopupActive: false,
    });
  };

  handleOpenPopup = (event) => {
    window.scrollTo(0, 0);
    event.preventDefault();
    const id = event.target.id || event.target.parentNode.id;
    this.setState({
      isPopupActive: true,
      activeQuestionIndex: id,
    });
  };

  render() {
    const {
      activeTab,
      isPopupActive,
      activeQuestionIndex,
      attendees,
      responses,
      radiostarQuestions,
    } = this.state;
    const { handleTabClick, handleOpenPopup, handleClosePopup } = this;
    const { history } = this.props;
    return (
      <ResultsOverviewWrapper>
        <span>
          <PageTitle>Overview Results </PageTitle>
        </span>
        <StatisicsContainer>
          <TabsWrapper>
            <Tab name="attendance" active={activeTab === "attendance"} onClick={handleTabClick}>
              Attendance
            </Tab>
            <Tab name="responses" active={activeTab === "responses"} onClick={handleTabClick}>
              Responses
            </Tab>
          </TabsWrapper>
          {activeTab === "attendance" ? (
            <AttendanceResults attendees={attendees} />
          ) : (
            <ResponsesResults responses={responses} />
          )}
        </StatisicsContainer>
        <ExportData />
        <SmallTitle>Responses:</SmallTitle>
        {radiostarQuestions.map((item, index) => (
          <QuestionWrapper onClick={handleOpenPopup} id={index} key={item._id}>
            <QuestionText>{item._id}</QuestionText>
            <Triangle />
          </QuestionWrapper>
        ))}

        {isPopupActive ? (
          <Popup
            question={radiostarQuestions[activeQuestionIndex]}
            handleClosePopup={handleClosePopup}
            history={history}
          />
        ) : null}
      </ResultsOverviewWrapper>
    );
  }
}

export default ResultsOverview ;
