import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  SubQuestionWrapper,
  OptionValue, MatrixRow,
} from "../StyledComponents";

import getSubQuestionResult from "./get_sub_question_results";

class Matrix extends Component {
  static propTypes = {
    answers: PropTypes.arrayOf(PropTypes.shape({
      answer: PropTypes.arrayOf(PropTypes.string),
    })),
    options: PropTypes.shape({
      columns: PropTypes.arrayOf(PropTypes.string),
      rows: PropTypes.arrayOf(PropTypes.string),
    }),
  };

  static defaultProps = {
    answers: [],
    options: {},
  };

  state = {
    matrixCumm: {},
  }

  componentDidUpdate(prevProps) {
    const { answers, options: rawOptions } = this.props;
    // get the cummulative number for each option
    const matrixCumm = getSubQuestionResult(rawOptions.columns, rawOptions.rows, answers);
    if (prevProps.answers !== answers) {
      this.setState({
        matrixCumm,
      });
    }
  }

  render() {
    const { matrixCumm } = this.state;
    return (

      <React.Fragment>
        {
          Object.keys(matrixCumm).map(question => (
            <SubQuestionWrapper>
              <h4>{question}</h4>
              { Object.keys(matrixCumm[question]).map(answer => (
                <MatrixRow key={Math.random()}>
                  <p>{answer}</p>
                  <div>
                    <OptionValue>{matrixCumm[question][answer]}</OptionValue>
                    {"  "}
                    <span>Vote(s)</span>
                  </div>
                </MatrixRow>
              ))}
            </SubQuestionWrapper>
          ))

        }
      </React.Fragment>
    );
  }
}

export default Matrix;
