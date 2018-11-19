import React from "react";
import PropTypes from "prop-types";

export default class Questions extends React.Component {
  render() {
    const { questions } = this.props;
    return (
      <React.Fragment>
        {questions.map((el, index) => {
          if (el.inputType === "text") {
            return (
              <fieldset key={index}>
                <label htmlFor={index}>
                  <p id={index}>{el.questionText}</p>
                </label>
                <input id={index} type="text" />
              </fieldset>
            );
          }
          if (el.inputType === "radio") {
            return (
              <fieldset key={index}>
                <label>
                  <p id={index}>{el.questionText}</p>
                </label>
                {el.options.map((e, i) => (
                  <div key={i}>
                    <input id={e} name="radio" type="radio" value={e} />
                    <label htmlFor={e}>{e}</label>
                  </div>
                ))}
              </fieldset>
            );
          }
          if (el.inputType === "radiostar") {
            return (
              <fieldset>
                <label>
                  <p id={index}>{el.questionText}</p>
                </label>
                {el.options.map((e, i) => (
                  <div key={i}>
                    <input id={e} name="radiostar" type="radio" value={e} />
                    <label htmlFor={e}>{e}</label>
                  </div>
                ))}
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
