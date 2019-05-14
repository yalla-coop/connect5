// this is where we map through all the questions
// and populate the Survey component

import React from 'react';

import {
  RadioField,
  TextField,
  RadioStarField,
  MatrixField,
  CheckboxField,
} from './Questions.style';

export default class Questions extends React.Component {
  render() {
    const {
      // onChange,
      questions,
      // handleMatrix,
      // handleOther,
      // selectCheckedItem,
      // answers,
      errors,
    } = this.props;
    // const errorArray = Object.keys(errors);
    // const answerArray = Object.keys(answers);
    console.log(questions);
    return (
      <React.Fragment>
        {questions.map((el, index) => {
          // map through all the questions
          // el is one question

          const {
            _id: questionId,
            text: questionText,
            helperText,
            options,
          } = el;
          const inputType = el.questionType.desc;
          console.log(inputType);
          // format each question depending on the inputType
          if (inputType === 'text') {
            return (
              <TextField

              // unanswered={
              //   errorArray.includes(questionId) &&
              //   isRequired &&
              //   !answers[questionId]
              // }
              >
                <header>
                  <h4 id={index}>{questionText}</h4>
                  <p className="helpertext">{helperText}</p>
                </header>
                <input
                  id={index}
                  name={questionId}
                  type="text"
                  // onChange={onChange}
                />
              </TextField>
            );
          }
          if (inputType === 'date') {
            return (
              <TextField

              // unanswered={
              //   errorArray.includes(questionId) &&
              //   isRequired &&
              //   !answers[questionId]
              // }
              >
                <header>
                  <h4 id={index}>{questionText}</h4>
                  <p className="helpertext">{helperText}</p>
                </header>
                <input
                  id={index}
                  name={questionId}
                  type="text"
                  // onChange={onChange}
                />
              </TextField>
            );
          }

          // format each question depending on the inputType
          if (inputType === 'number') {
            return (
              <TextField

              // unanswered={
              //   errorArray.includes(questionId) &&
              //   isRequired &&
              //   !answers[questionId]
              // }
              >
                <header>
                  <h4 id={index}>{questionText}</h4>
                  <p className="helpertext">{helperText}</p>
                </header>
                <input
                  id={index}
                  name={questionId}
                  type="text"
                  // onChange={onChange}
                />
              </TextField>
            );
          }

          if (inputType === 'radio') {
            return (
              <RadioField
              // unanswered={
              //   errorArray.includes(questionId) &&
              //   isRequired &&
              //   !answers[questionId]
              // }
              >
                <header>
                  <h4 id={index}>{questionText}</h4>
                  <p className="helpertext">{helperText}</p>
                </header>
                <div className="answers">
                  {options.map((e, i) => {
                    const value = e;

                    const uniqueId = e + questionId;
                    return (
                      <div>
                        <div key={i}>
                          <label htmlFor={uniqueId}>
                            <input
                              value={value}
                              id={uniqueId}
                              name={questionId}
                              type="radio"
                              // onChange={onChange}
                            />
                            <span className="checkmark" />
                            {/* <p>{value}</p> */}
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* <div className="other-div"> */}
                {/* Load "Other" div */}
                {/* {answers[questionId] &&
                  answers[questionId].includes('Other') ? (
                    <TextField>
                      <p>Please specify:</p>
                      <input
                        id="other"
                        name={questionId}
                        type="text"
                        onChange={handleOther}
                      />
                    </TextField>
                  ) : (
                    ''
                  )}
                </div>  */}
              </RadioField>
            );
          }

          if (inputType === 'matrix') {
            return (
              <MatrixField

              // unanswered={
              //   errorArray.includes(questionId) &&
              //   isRequired &&
              //   !answers[questionId]
              // }
              >
                <header>
                  <h4 id={index}>{questionText}</h4>
                  <p className="helpertext">{helperText}</p>
                </header>
                <div>
                  {options.map((option, i) => (
                    <div key={i} className="matrixanswers">
                      <p className="row-questions" id={i}>
                        {option.text}
                      </p>
                      <div className="options">
                        {option.options.map((subOption, ind) => {
                          if (option.options.length === ind + 1) {
                            return (
                              <TextField

                              // unanswered={
                              //   errorArray.includes(questionId) &&
                              //   isRequired &&
                              //   !answers[questionId]
                              // }
                              >
                                <header>
                                  <p id={ind}>{subOption}</p>
                                </header>
                                <input
                                  id={ind}
                                  name={subOption}
                                  type="text"
                                  // onChange={onChange}
                                />
                              </TextField>
                            );
                          }
                          return (
                            <label htmlFor={option}>
                              <input
                                id={ind}
                                name={option}
                                type="radio"
                                value={subOption}
                                className={`matrix ${ind}`}
                                // onChange={() => {
                                //   handleMatrix(
                                //     el.options.rows[i],
                                //     elem,
                                //     questionId
                                //   );
                                // }}
                              />
                              <span className="checkmark" />
                              <p>{subOption}</p>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </MatrixField>
            );
          }
          return '';
        })}
      </React.Fragment>
    );
  }
}
