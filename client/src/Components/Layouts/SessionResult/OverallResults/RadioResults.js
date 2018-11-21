import React, { Component } from "react";
import PropTypes from "prop-types";

import getOptions from "./get_options";
import { RadioRow, Paragraph, Answer } from "./../StyledComponents";

class RadioResults extends Component {
  static propTypes = {
    answers: PropTypes.arrayOf(PropTypes.shape({
      answer: PropTypes.string,
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
  }

  componentDidUpdate(prevProps) {
    const { answers, options: rawOptions } = this.props;
    if (prevProps.answers !== answers) {
      const { options, newAnswers } = getOptions(answers, rawOptions, false);
      this.setState({
        options,
        newAnswers,
      });
    }
  }

  render() {
    const { options, newAnswers } = this.state;
    return (
      <div>
        {options.map(option => (
          <RadioRow>
            <Paragraph>{option.value}</Paragraph>
            <Paragraph counter>
              {option.cummulative}
              {" "}
              vote(s)
            </Paragraph>
          </RadioRow>
        ))}

        {
          newAnswers.map(newAnswer => (
            <Answer>{newAnswer.answer}</Answer>
          ))
        }
      </div>
    );
  }
}

export default RadioResults;
