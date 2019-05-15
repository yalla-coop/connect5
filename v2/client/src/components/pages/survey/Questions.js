// this is where we map through all the questions
// and populate the Survey component

import React from 'react';

import { RadioField, TextField } from './Questions.style';

export default class Questions extends React.Component {
  render() {
    const {
      onChange,
      questions,

      handleOther,
      selectCheckedItem,
      answers,
      errors,
    } = this.props;
    const errorArray = Object.keys(errors);
    console.log(questions);
    return (
      <React.Fragment>
        {questions.map((el, index) => {
          // map through all the questions
          // el is one question

          const {
            _id: questionId,
            text: questionText,
            group,
            helperText,
            options,
          } = el;
          const inputType = el.questionType.desc;

          // format each question depending on the inputType
          if (inputType === 'text') {
            return (
              <TextField
                unanswered={
                  errorArray.includes(questionId) && !answers[questionId]
                }
              >
                <header>
                  <h4 id={index}>{questionText}</h4>
                  <p className="helpertext">{helperText}</p>
                </header>
                <input
                  id={index}
                  name={questionId}
                  type="text"
                  onChange={onChange}
                />
              </TextField>
            );
          }
          if (inputType === 'date') {
            return (
              <TextField
                unanswered={
                  errorArray.includes(questionId) && !answers[questionId]
                }
              >
                <header>
                  <h4 id={index}>{questionText}</h4>
                  <p className="helpertext">{helperText}</p>
                </header>
                <input
                  id={index}
                  name={questionId}
                  type="text"
                  onChange={onChange}
                />
              </TextField>
            );
          }

          if (inputType === 'number') {
            return (
              <TextField
                unanswered={
                  errorArray.includes(questionId) && !answers[questionId]
                }
              >
                <header>
                  <h4 id={index}>{questionText}</h4>
                  <p className="helpertext">{helperText}</p>
                </header>
                <input
                  id={index}
                  name={questionId}
                  type="text"
                  onChange={onChange}
                />
              </TextField>
            );
          }

          if (inputType === 'radio') {
            return (
              <RadioField
                unanswered={
                  errorArray.includes(questionId) && !answers[questionId]
                }
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
                              onChange={onChange}
                            />
                            <span className="checkmark" />
                            <p>{value}</p>
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="other-div">
                  {/* Load "Other" div */}
                  {answers[questionId] &&
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
                </div>
              </RadioField>
            );
          }

          return '';
        })}
      </React.Fragment>
    );
  }
}
