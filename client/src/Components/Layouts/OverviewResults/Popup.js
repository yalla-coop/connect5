import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import getQuestionsIDs from "../../../Utils/get_question_ids";
import getAverageNumber from "../../../Utils/get_average_number";

import {
  PopupWrapper,
  XButton,
  PopupQuestion,
  StarsWrapper,
  BarWrapper,
  BarTitle,
  BarContainer,
  Bar,
  BarSpan,
  StarsRow,
  StarIconsWrapper,
  StarIcon,
  Responses,
  P,
} from "./StyledComponents";

class Popup extends Component {
  static propTypes = {
    questionId: PropTypes.string,
    sessionId: PropTypes.string,
    history: ReactRouterPropTypes.history,
    handleClosePopup: PropTypes.func,
    questionText: PropTypes.string,
    inputType: PropTypes.string,
    question: PropTypes.shape({
      questionText: PropTypes.string,
    }),
  };

  static defaultProps = {
    questionId: null,
    sessionId: null,
    history: null,
    handleClosePopup: null,
    questionText: null,
    inputType: null,
    question: { questionText: null },
  };

  state = {
    answers: null,
  }


  componentDidMount() {
    const questionsIDs = getQuestionsIDs(this.props.question.questions);
    axios({
      method: "post",
      url: "/question/overview/results",
      data: {
        questionsIDs,
      },
    })
      .then(({data}) => {
        console.log(getAverageNumber(data));
        this.setState({averages:getAverageNumber(data) })
      });
    // .catch(() => history.push("/server-error"));
  }

  render() {
    const {
      handleClosePopup,
      questionText,
      inputType,
      question,
    } = this.props;
    const { answers } = this.state;
    // console.log(this.props.question, "question");

    return (
      <PopupWrapper>
        <XButton onClick={handleClosePopup}>×</XButton>
        <PopupQuestion>
          {this.props.question._id}
        </PopupQuestion>
        {
          ["Pre-survey", "Session 1", "Session 2", "Session3"].map((item,index)=>(
        <StarsWrapper>
          <BarWrapper>
            <BarTitle>
            {item}
            </BarTitle>
            {(this.state.averages && this.state.averages[index])?
            <BarContainer>
             <Bar width={this.state.averages[index]}><P>{this.state.averages[index]}</P></Bar>
              <BarSpan>out of 6</BarSpan>
            </BarContainer>
            : <p>No Responses</p>
            }
          </BarWrapper>
        </StarsWrapper>

          ))
        }

      </PopupWrapper>
    );
  }
}

export default Popup;
