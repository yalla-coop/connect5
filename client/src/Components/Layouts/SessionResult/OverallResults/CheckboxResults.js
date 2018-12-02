import React, { Component } from "react";
import PropTypes from "prop-types";

import getCheckboxResults from "./getCheckboxResults";
import { RadioRow, Paragraph } from "../StyledComponents";

class CheckboxResults extends Component {
  static propTypes = {
    answers: PropTypes.arrayOf(PropTypes.shape({
      answer: PropTypes.arrayOf(PropTypes.string),
    })),
    options: PropTypes.arrayOf(PropTypes.number),
  };

  static defaultProps = {
    answers: [],
    options: [],
  };

  state = {
    options: [],
    newAnswers: [],
    newOptions: [],
  }

  componentDidUpdate(prevProps) {
    const { answers, options: rawOptions } = this.props;
    const totalAnswers = [];
    answers.map((answer) => (
      answer.answer.map((subAnswer) => {
        return totalAnswers.push(subAnswer)
      })
    ))
    console.log("TOTAL", totalAnswers)
    if (prevProps.answers !== answers) {
      const { newOptions, newAnswers } = getCheckboxResults(totalAnswers, rawOptions);
      this.setState({
        newOptions,
        newAnswers,
      });
    }
  }

  render() {
    const { newOptions } = this.state;
    console.log("CHECKBOX", this.props)
    console.log("TOTAL ANSWERS", this.state)
    return (
      <div>
        {newOptions.map(option => (
          <RadioRow>
            <Paragraph>{option.value}</Paragraph>
            <Paragraph counter>
              {option.cummulative}
              {" "}
              vote(s)
            </Paragraph>
          </RadioRow>
        ))}
      </div>
    );
  }
}

export default CheckboxResults;
