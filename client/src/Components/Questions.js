import React from "react";
import PropTypes from "prop-types";

import { RadioField, TextField, RadioStarField } from "./Questions.style";

export default class Questions extends React.Component {
  render() {
    const { onChange, questions, handleMatrix } = this.props;
    return (
      <React.Fragment>
        {questions.map((el, index) => {
          if (el.inputType === "text") {
            return (
              <TextField key={index}>
                <h4 id={index}>{el.questionText}</h4>
                <input id={index} name={el._id} type="text" onChange={onChange} />
              </TextField>
            );
          }
          if (el.inputType === "radio") {
            return (
              <RadioField key={index}>
                <h4 id={index}>{el.questionText}</h4>
                <div className="answers">
                  {el.options.map((e, i) => (
                    <div key={i}>
                      <label htmlFor={e}>
                        {e}
                        <input value={e} id={e} name={el._id} type="radio" onChange={onChange} />
                        <span className="checkmark" />
                      </label>
                    </div>
                  ))}
                </div>
              </RadioField>
            );
          }
          if (el.inputType === "radiostar") {
            return (
              <RadioStarField key={index}>
                <h4 id={index}>{el.questionText}</h4>
                <div className="answers">
                  {el.options.map((e, i) => (
                    <div className="rate" key={i}>
                      <label htmlFor={e}>
                        {e}
                        <input id={e} name={el._id} type="radio" value={e} onChange={onChange} />
                        <span className="checkmark" />
                      </label>
                    </div>
                  ))}
                </div>
              </RadioStarField>
            );
          }
          if (el.inputType === "checkbox") {
            return (
              <div key={index}>
                <h4 id={index}>{el.questionText}</h4>
                <div className="answers">
                  {el.options.map((e, i) => (
                    <div className="rate" key={i}>
                      <label htmlFor={e}>
                        {e}
                        <input id={e} name={el._id} type="checkbox" value={e} onChange={onChange} />
                        <span className="checkmark" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          if (el.inputType === "matrix") {
            return (
              <fieldset>
                <label>
                  <p id={index}>{el.questionText}</p>
                </label>
                {el.options.rows.map((e, i) => (
                  <div key={i}>
                    <label htmlFor={e}>
                      <p id={i}>{el.options.rows[i]}</p>
                    </label>
                    {el.options.columns.map((elem, ind) => (
                      <input
                        key={ind}
                        id={ind}
                        name={e}
                        type="radio"
                        value={elem}
                        className={`matrix ${ind}`}
                        onChange={() => {
                          handleMatrix(i, elem, el._id);
                        }}
                      />
                    ))}
                  </div>
                ))}
                {/* {el.options.columns.map((e, i) => (
                  <div key={i}>
                    <input id={e} name="matrix" type="radio" value={e} />
                  </div>
                ))} */}
              </fieldset>
            );
          }

          // if (el.inputType === "matrix") {
          //   return (
          //     <fieldset>
          //       <label>
          //         <p id={index}>{el.questionText}</p>
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
