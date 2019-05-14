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
              <TextField key={index} unanswered={errorArray.includes(questionId) && isRequired && !answers[questionId]}>
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
              <TextField key={index} unanswered={errorArray.includes(questionId) && isRequired && !answers[questionId]}>
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
              <RadioField key={index} unanswered={errorArray.includes(questionId) && isRequired && !answers[questionId]}>
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
                        {answers[questionId] && answers[questionId].includes("Other") ? <TextField><p>Please specify:</p><input id="other" name={questionId} type="text" onChange={handleOther} /></TextField> : ""}
                </div>
              </RadioField>
            );
          }
          if (el.inputType === "radiostar") {
            return (
              <RadioStarField key={index} unanswered={errorArray.includes(questionId) && isRequired && !answers[questionId]}>
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
                      <div
                        key={uniqueKey}
                        onClick={(e) => {
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
            console.log("ANSWERS", answers)
            return (
              <CheckboxField key={index} unanswered={errorArray.includes(questionId) && isRequired && !answers[questionId]}>
                <header>
                  <h4 id={index}>
                    {questionText}
                    {isRequired ? " *" : ""}
                  </h4>
                  <p className="helpertext">{helperText}</p>
                </header>
                <div className="answers">
                  {el.options.map((e, i) => (
                    <label key={i} htmlFor={e}>
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
                  {answers[questionId] && answers[questionId].includes("Other (please specify)") ? <TextField><p>Please specify:</p><input id="other-checkbox" name={questionId} type="text" onFocus={handleOther} onBlur={handleOther} /></TextField> : ""}
                </div>
              </CheckboxField>
            );
          }
          if (el.inputType === "matrix") {
            return (
              <MatrixField key={index} unanswered={errorArray.includes(questionId) && isRequired && !answers[questionId]}>
                <header>
                  <h4 id={index}>
                    {questionText}
                    {isRequired ? " *" : ""}
                  </h4>
                  <p className="helpertext">{helperText}</p>
                </header>
                <div>
                  {el.options.rows.map((e, i) => (
                    <div key={i} className="matrixanswers">
                      <p className="row-questions" id={i}>
                        {el.options.rows[i]}
                        {" "}
                      </p>
                      <div className="options">
                        {el.options.columns.map((elem, ind) => (
                          <label key={ind} htmlFor={e}>
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
