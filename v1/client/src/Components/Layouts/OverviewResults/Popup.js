import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";

import getQuestionsIDs from "../../../Utils/get_question_ids";
import getAverageNumber from "../../../Utils/get_average_number";
import setAuthToken from "../../../Utils/setAuthToken";

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
  P,
} from "./StyledComponents";

class Popup extends Component {
  static propTypes = {
    handleClosePopup: PropTypes.func,
    history: ReactRouterPropTypes.history,
    question: PropTypes.shape({
      questionText: PropTypes.string,
    }),
  };

  static defaultProps = {
    history: null,
    handleClosePopup: null,
    question: { questionText: null },
  };

  state = {
    averages: [],
  }

  componentDidMount() {
    const { question, history } = this.props;

    const questionsIDs = getQuestionsIDs(question.questions);
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      axios({
        method: "post",
        url: "/question/overview/results",
        data: {
          questionsIDs,
        },
      })
        .then(({ data }) => {
          this.setState({ averages: getAverageNumber(data) });
        })
        .catch(() => history.push("/server-error"));
    }
  }

  render() {
    const {
      handleClosePopup,
      question,
    } = this.props;
    const { averages } = this.state;
    return (
      <PopupWrapper>
        <XButton onClick={handleClosePopup}>×</XButton>
        <PopupQuestion>
          {question._id}
        </PopupQuestion>
        {
          ["Pre-survey", "Session 1", "Session 2", "Session 3"].map((item, index) => (
            <StarsWrapper key={item}>
              <BarWrapper>
                <BarTitle>
                  {item}
                </BarTitle>
                {(averages && averages[index])
                  ? (
                    <BarContainer>
                      <Bar width={averages[index]}/>
                      <BarSpan><P> {averages[index]} </P> Of  6</BarSpan>
                    </BarContainer>
                  )
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
