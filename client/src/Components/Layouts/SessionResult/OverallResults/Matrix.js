import React from "react";
import PropTypes from "prop-types";
import { MatrixAnswer } from "../StyledComponents";

const Matrix = ({ answers }) => (
  <div>
    <ul>
      {
        answers && answers[0].answer.map(item => (
          <li key={Math.random()}>
            <MatrixAnswer>
              {item}
            </MatrixAnswer>
          </li>
        ))
      }
    </ul>
  </div>
);

export default Matrix;

Matrix.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.shape({
    answer: PropTypes.arrayOf(PropTypes.string),
  })),
};
Matrix.defaultProps = {
  answers: [{}],
};
