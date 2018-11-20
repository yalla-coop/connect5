import React from "react";
import PropTypes from "prop-types";

import { RadioField, TextField, RadioStarField, MatrixField, CheckboxField } from "./Questions.style";

export default class Questions extends React.Component {
  render() {
    const {
      onChange,
      questions,
      handleMatrix,
      selectCheckedItem,
      answers,
    } = this.props;
    return (
      <React.Fragment>
        {questions.map((el, index) => {
          // let questionId = questionId
          // let questionText = questionText

          let {_id: questionId, questionText, helperText} = el;

          if (el.inputType === "text") {
            return (
              <TextField key={index}>
                <header>
                  <h4 id={index}>{questionText}</h4>
                  <p className="helpertext">{helperText}</p>
                </header>
                <input id={index} name={questionId} type="text" onChange={onChange} />
              </TextField>
            );
          }
          if (el.inputType === "radio") {
            return (
              <RadioField key={index}>
                <header>
                  <h4 id={index}>{questionText}</h4>
                  <p className="helpertext">{helperText}</p>
                </header>
                <div className="answers">
                  {el.options.map((e, i) => {
                    const value = e;
                    const uniqueId = e + questionId;
                    return (
                      <div key={i}>
                        <label htmlFor={uniqueId}>
                          {value}
                          <input value={value} id={uniqueId} name={questionId} type="radio" onChange={onChange} />
                          <span className="checkmark" />
                        </label>
                      </div>
                    );
                  })}
                </div>
              </RadioField>
            );
          }
          if (el.inputType === "radiostar") {
            return (
              <RadioStarField key={index}>
                <header>
                  <h4 id={index}>{questionText}</h4>
                  <p className="helpertext">{helperText}</p>
                </header>
                <div className="answers">
                  {el.options.map((e, i) => {
                    let value = e;
                    
                    let uniqueKey = i + questionId
                    return (
                      <div
                        key={uniqueKey}
                        onClick={e => {
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
                            checked={answers[questionId] === value}
                          />
                          <span className="checkmark" />
                        </label>
                      </div>
                    )})}
                </div>
              </RadioStarField>
            );
          }
          if (el.inputType === "checkbox") {
            return (
              <CheckboxField key={index}>
                <header>
                  <h4 id={index}>{questionText}</h4>
                  <p className="helpertext">{helperText}</p>
                </header>
                <div className="answers">
                  {el.options.map((e, i) => (
                    <label key={i} htmlFor={e}>
                      <input id={e} name={questionId} type="checkbox" value={e} onChange={onChange} />
                      <span className="checkmark" />
                      <p>{e}</p>
                    </label>
                  ))}
                </div>
              </CheckboxField>
            );
          }
          if (el.inputType === "matrix") {
            return (
              <MatrixField key={index}>
                <header>
                  <h4 id={index}>{questionText}</h4>
                  <p className="helpertext">{helperText}</p>
                </header>
                <div>
                  {el.options.rows.map((e, i) => (
                    <div key={i} className="matrixanswers">
                      <p className="row-questions" id={i}>{el.options.rows[i]} </p>
                      <div class="options">
                        {el.options.columns.map((elem, ind) => (
                          <label key={ind} htmlFor={e}>
                            <input
                              id={ind}
                              name={e}
                              type="radio"
                              value={elem}
                              className={`matrix ${ind}`}
                              onChange={() => {
                                handleMatrix(i, elem, questionId);
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
                {/* {el.options.columns.map((e, i) => (
                  <div key={i}>
                    <input id={e} name="matrix" type="radio" value={e} />
                  </div>
                ))} */}
              </MatrixField>
            );
          }

          // if (el.inputType === "matrix") {
          //   return (
          //     <fieldset>
          //       <label>
          //         <p id={index}>{questionText}</p>
          //       </label>
          //       {el.options.map((e, i) => (
          //         <div key={i}>
          //           <input id={e} name="matrix" type="radio" value={e} />
          //           <label htmlFor={e}>{e}</label>
          //         </div>
          //       ))}
          //     </fieldset>
          //   );
          // }
        })}
      </React.Fragment>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.isRequired,
};
