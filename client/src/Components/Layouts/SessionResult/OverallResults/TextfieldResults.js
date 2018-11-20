import React, { Component } from "react";
import PropTypes from "prop-types";

import { Answer } from "../StyledComponents";

class TextfieldResults extends Component {
  static propTypes = {
    answers: PropTypes.arrayOf(PropTypes.shape({
      answer: PropTypes.string,
    })),
  };

  static defaultProps = {
    answers: [],
  };

  render() {
    const { answers } = this.props;
    return (
      <div>
        {
          answers && answers.map(answer => (
            <Answer>{answer.answer}</Answer>
          ))
        }
      </div>
    );
  }
}

export default TextfieldResults;
