import React from "react";
import PropTypes from "prop-types";

import { IndividualAnswer, QuestionSpan, MatrixAnswer } from "../StyledComponents";

const Answer = ({ answer }) => (
  <div>
    {
      answer.inputType === "matrix" || answer.inputType === "checkbox"
        ? (
          <ul>
            {answer && answer.answer.map(item => (
              <li key={Math.random()}>

                <MatrixAnswer>
                  {item}
                </MatrixAnswer>
              </li>
            ))}
          </ul>

        )
        : (
          <IndividualAnswer>
            <QuestionSpan>
                  A.
            </QuestionSpan>
            {answer.answer}
            {
              answer.inputType === "radiostar"
                && (
                  <span>
                    {" "}
                          stars (out of 6)
                  </span>
                )
            }
          </IndividualAnswer>
        )
    }
  </div>
);

export default Answer;

Answer.propTypes = {
  answer: PropTypes.shape({
    answer: PropTypes.any.isRequired,
    inputType: PropTypes.string.isRequired,
  }),
};

Answer.defaultProps = {
  answer: {},
};
