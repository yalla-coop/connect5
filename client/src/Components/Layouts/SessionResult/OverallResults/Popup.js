import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";

import Stars from "./Stars";
import Radio from "./RadioResults";
import TextfieldResults from "./TextfieldResults";
import Matrix from "./Matrix";
import Checkbox from "./CheckboxResults";

import {
  PopupWrapper,
  XButton,
  PopupQuestion,
} from "../StyledComponents";

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
    const { questionId, sessionId, history } = this.props;
    axios.get(`/question/result/${questionId}/${sessionId}`)
      .then(({ data }) => this.setState({ answers: data }))
      .catch(() => history.push("/server-error"));
  }

  render() {
    const {
      handleClosePopup,
      questionText,
      inputType,
      question,
    } = this.props;
    const { answers } = this.state;
    return (
      <PopupWrapper>
        <XButton onClick={handleClosePopup}>×</XButton>
        <PopupQuestion>
          {questionText}
        </PopupQuestion>
        {inputType === "matrix" && <Matrix answers={answers} options={question.options} />}
        {inputType === "radiostar" && <Stars answers={answers} options={question.options} />}
        {inputType === "checkbox" && <Checkbox answers={answers} options={question.options} />}
        {inputType === "radio" && <Radio answers={answers} options={question.options} />}
        { inputType === "textarea" && <TextfieldResults answers={answers} />}
      </PopupWrapper>
    );
  }
}

export default Popup;
