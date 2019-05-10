// this is where we map through all the questions
// and populate the Survey component

import React from "react";

import {
  RadioField,
  TextField,
  RadioStarField,
  MatrixField,
  CheckboxField,
} from "./Questions.style";

export default class Questions extends React.Component {
  render() {
    const {
      onChange, questions, handleMatrix, handleOther, selectCheckedItem, answers, errors,
    } = this.props;
    const errorArray = Object.keys(errors);
    // const answerArray = Object.keys(answers);

    return (
      <React.Fragment>
        {questions.map((el, index) => {
          // map through all the questions
          // el is one question

          const {
            _id: questionId, questionText, helperText, isRequired,
          } = el;

          // format each question depending on the inputType
          if (el.inputType === "text") {
            return (
              <TextField
                key={questionId}
                unanswered={errorArray.includes(questionId)
               && isRequired && !answers[questionId]}
              >
                <header>
                  <h4 id={index}>
                    {questionText}
                    {isRequired ? " *" : ""}
                  </h4>
                  <p className="helpertext">{helperText}</p>
                </header>
                <input id={index} name={questionId} type="text" onChange={onChange} />
              </TextField>
            );
          }
          if (el.inputType === "textarea") {
            return (
              <TextField
                key={questionId}
                unanswered={
                  errorArray.includes(questionId)
                  && isRequired
                  && !answers[questionId]
                }
              >
                <header>
                  <h4 id={index}>
                    {questionText}
                    {isRequired ? " *" : ""}
                  </h4>
                  <p className="helpertext">{helperText}</p>
                </header>
                <textarea id={index} name={questionId} type="textarea" rows="5" onChange={onChange} />
              </TextField>
            );
          }
          if (el.inputType === "radio") {
            return (
              <RadioField
                key={`${questionId}radio`}
                unanswered={
                  errorArray.includes(questionId)
              && isRequired
              && !answers[questionId]
                }
              >
                <header>
                  <h4 id={index}>
                    {questionText}
                    {isRequired ? " *" : ""}
                  </h4>
                  <p className="helpertext">{helperText}</p>
                </header>
                <div className="answers">
                  {el.options.map((e) => {
                    const value = e;
                    const uniqueId = e + questionId;
                    return (
                      <div key={uniqueId}>
                        <div>
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
                  {answers[questionId] && answers[questionId].includes("Other") ? (
                    <TextField>
                      <p>Please specify:</p>
                      <input id="other" name={questionId} type="text" onChange={handleOther} />
                    </TextField>
                  ) : ""}
                </div>
              </RadioField>
            );
          }
          if (el.inputType === "radiostar") {
            return (
              <RadioStarField key={`${questionId}radiostar`} unanswered={errorArray.includes(questionId) && isRequired && !answers[questionId]}>
                <header>
                  <h4 id={index}>
                    {questionText}
                    {isRequired ? " *" : ""}
                  </h4>
                  <p className="helpertext">{helperText}</p>
                </header>
                <div className="answers">
                  {el.options.map((e, i) => {
                    const value = e;

                    const uniqueKey = i + questionId;
                    return (
                      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                      <div
                        key={`${questionId}${e}`}
                        onClick={() => {
                          selectCheckedItem(value, questionId);
                        }}
                      >
                        <label htmlFor={uniqueKey}>
                          <p>{value}</p>
                          <input
                            id={uniqueKey}
                            name={questionId}
                            type="radio"
                            value={value}
                            className={value}
                            onChange={onChange}
                            checked={answers[questionId] === value}
                          />
                          <span className="checkmark" />
                        </label>
                      </div>
                    );
                  })}
                </div>
              </RadioStarField>
            );
          }
          if (el.inputType === "checkbox") {
            return (
              <CheckboxField
                key={`${questionId}checkbox`}
                unanswered={errorArray.includes(questionId)
              && isRequired
              && !answers[questionId]}
              >
                <header>
                  <h4 id={index}>
                    {questionText}
                    {isRequired ? " *" : ""}
                  </h4>
                  <p className="helpertext">{helperText}</p>
                </header>
                <div className="answers">
                  {el.options.map(e => (
                    <label key={`${questionId}${e}`} htmlFor={e}>
                      <input
                        id={e}
                        name={questionId}
                        type="checkbox"
                        value={e}
                        onChange={onChange}
                      />
                      <span className="checkmark" />
                      <p>{e}</p>
                    </label>
                  ))}
                </div>
                <div className="other-div">
                  {/* Load "Other" div */}
                  {answers[questionId] && answers[questionId].includes("Other (please specify)") ? (
                    <TextField>
                      <p>Please specify:</p>
                      <input id="other-checkbox" name={questionId} type="text" onFocus={handleOther} onBlur={handleOther} />
                    </TextField>
                  ) : ""}
                </div>
              </CheckboxField>
            );
          }
          if (el.inputType === "matrix") {
            return (
              <MatrixField
                key={`${questionId}matrix`}
                unanswered={errorArray.includes(questionId)
              && isRequired && !answers[questionId]}
              >
                <header>
                  <h4 id={index}>
                    {questionText}
                    {isRequired ? " *" : ""}
                  </h4>
                  <p className="helpertext">{helperText}</p>
                </header>
                <div>
                  {el.options.rows.map((e, i) => (
                    <div key={`${questionId}${el.options.rows[i]}`} className="matrixanswers">
                      <p className="row-questions" id={i}>
                        {el.options.rows[i]}
                        {" "}
                      </p>
                      <div className="options">
                        {el.options.columns.map((elem, ind) => (
                          <label key={`${questionId}${elem}`} htmlFor={e}>
                            <input
                              id={ind}
                              name={e}
                              type="radio"
                              value={elem}
                              className={`matrix ${ind}`}
                              onChange={() => {
                                handleMatrix(el.options.rows[i], elem, questionId);
                              }}
                            />
                            <span className="checkmark" />
                            <p>{elem}</p>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </MatrixField>
            );
          }
          return "";
        })}
      </React.Fragment>
    );
  }
}
