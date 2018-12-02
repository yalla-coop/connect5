import React, { Component } from "react";
import PropTypes from "prop-types";
import { StarsRow } from "../StyledComponents";

import getOptions from "./get_options"
import findRate from "./find_rate"

class Matrix extends Component {

  static propTypes = {
    answers: PropTypes.arrayOf(PropTypes.shape({
      answer: PropTypes.arrayOf(PropTypes.string),
    })),
  };

  static defaultProps = {
    answers: [],
    options: [],
  };

  state = {
    options: [],
  }
  
  componentDidUpdate(prevProps) {
    const { answers, options: rawOptions } = this.props;
    if (prevProps.answers !== answers) {
      const { options } = getOptions(answers, rawOptions.columns, true);
      this.setState({
        options,
      });
    }
  }

  
  // const questionArray = Object.keys(answers[0].answer);
  // console.log("Questions", questionArray)
  
  render() {

    const { answers, options: rawOptions } = this.props;
    const subQuestions = rawOptions.rows;
    const { options } = this.state;

    const rate = answers && findRate(answers);
    console.log("MATRIX", this.props)
    console.log("STATE OPTS", this.state.options)
    console.log("RATE", rate)
    
    
    return (
    
    <React.Fragment>
      {rawOptions && subQuestions.map(question => (
        <div key={Math.random()}>
          <h4>{question}</h4>
          {options && options.map(option => (
            <StarsRow key={Math.random()}>
              <p>{option.value}</p>
            </StarsRow>
          ))}
        </div>
      ))}
      
    </React.Fragment>
  )};
  }

export default Matrix;

