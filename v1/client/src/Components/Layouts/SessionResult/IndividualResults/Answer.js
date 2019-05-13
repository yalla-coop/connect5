import React from "react";
import PropTypes from "prop-types";

import { IndividualAnswer, QuestionSpan, MatrixAnswer } from "../StyledComponents";

class Answer extends React.Component {
  render() {
    const { answer } = this.props;
    if (answer.inputType === "checkbox") {
      return (
        <React.Fragment>
          <ul>
            {answer
              && answer.answer.map(item => (
                <li key={Math.random()}>
                  <MatrixAnswer>{item}</MatrixAnswer>
                </li>
              ))}
          </ul>
        </React.Fragment>
      );
    }
    if (answer.inputType === "matrix") {
      const answerArray = Object.entries(answer.answer);
      return (
        <React.Fragment>
          {answer
            && answerArray.map(item => (
              <div key={Math.random()}>
                <MatrixAnswer>
                  <h4>{item[0]}</h4>
                  <p>{item[1]}</p>
                </MatrixAnswer>
              </div>
            ))}
        </React.Fragment>
      );
    }
    return (
      <IndividualAnswer>
        <QuestionSpan>A.</QuestionSpan>
        {answer.answer}
        {answer.inputType === "radiostar" && <span> stars (out of 6)</span>}
      </IndividualAnswer>
    );
  }
}

// const Answer = ({ answer }) => (

// <div>
//   {
//     answer.inputType === "matrix" || answer.inputType === "checkbox"
//       ? (
//         <ul>
//           {answer && answer.answer.map(item => (
//             <li key={Math.random()}>

//               <MatrixAnswer>
//                 {item}
//               </MatrixAnswer>
//             </li>
//           ))}
//         </ul>

//       )
//       : (
//         <IndividualAnswer>
//           <QuestionSpan>
//                 A.
//           </QuestionSpan>
//           {answer.answer}
//           {
//             answer.inputType === "radiostar"
//               && (
//                 <span>
//                   {" "}
//                         stars (out of 6)
//                 </span>
//               )
//           }
//         </IndividualAnswer>
//       )
//   }
// </div>
// );

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
