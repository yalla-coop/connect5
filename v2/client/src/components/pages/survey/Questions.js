// this is where we map through all the questions
// and populate the Survey component

import React from 'react';

import { RadioField, TextField } from './Questions.style';

export default class Questions extends React.Component {
  renderQuestions = (
    inputType,
    errorArray,
    questionId,
    answers,
    index,
    questionText,
    helperText,
    onChange,
    options,
    handleOther,
    subGroup
  ) => {
    console.log(subGroup);
    if (inputType === 'text') {
      return (
        <TextField
          unanswered={errorArray.includes(questionId) && !answers[questionId]}
        >
          <header>
            {subGroup && <h3>{subGroup}</h3>}
            <h4 id={index}>{questionText}</h4>
            <p className="helpertext">{helperText}</p>
          </header>
          <input id={index} name={questionId} type="text" onChange={onChange} />
        </TextField>
      );
    }
    if (inputType === 'date') {
      return (
        <TextField
          unanswered={errorArray.includes(questionId) && !answers[questionId]}
        >
          <header>
            {subGroup && <h3>{subGroup}</h3>}
            <h4 id={index}>{questionText}</h4>
            <p className="helpertext">{helperText}</p>
          </header>
          <input id={index} name={questionId} type="text" onChange={onChange} />
        </TextField>
      );
    }
    if (inputType === 'numberPositive') {
      return (
        <TextField
          unanswered={errorArray.includes(questionId) && !answers[questionId]}
        >
          <header>
            {subGroup && <h3>{subGroup}</h3>}
            <h4 id={index}>{questionText}</h4>
            <p className="helpertext">{helperText}</p>
          </header>
          <input id={index} name={questionId} type="text" onChange={onChange} />
        </TextField>
      );
    }
    if (inputType === 'numberZeroTen') {
      return (
        <TextField
          unanswered={errorArray.includes(questionId) && !answers[questionId]}
        >
          <header>
            {subGroup && <h3>{subGroup}</h3>}
            <h4 id={index}>{questionText}</h4>
            <p className="helpertext">{helperText}</p>
          </header>
          <input id={index} name={questionId} type="text" onChange={onChange} />
        </TextField>
      );
    }
    if (inputType === 'radio') {
      return (
        <RadioField
          unanswered={errorArray.includes(questionId) && !answers[questionId]}
        >
          <header>
            {subGroup && <h3>{subGroup}</h3>}
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
            {answers[questionId] && answers[questionId].includes('Other') ? (
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
    return null;
  };

  loopOverQuestionsRender = (
    arrayOfQuestions,
    answers,
    errorArray,
    onChange,
    handleOther,
    category
  ) =>
    arrayOfQuestions.map((el, index) => {
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
      const subGroupText = () => {
        if (el.subGroup && el.subGroup.text) {
          return el.subGroup.text;
        }
        return null;
      };

      return (
        group &&
        group === `${category}` &&
        this.renderQuestions(
          inputType,
          errorArray,
          questionId,
          answers,
          index,
          questionText,
          helperText,
          onChange,
          options,
          handleOther,
          subGroupText()
        )
      );
    });

  render() {
    const {
      onChange,
      questions,
      handleOther,
      selectCheckedItem,
      answers,
      errors,
    } = this.props;
    console.log(questions);
    const errorArray = Object.keys(errors);
    const questionsCategories = [
      'demographic',
      'Behavioural Insights',
      'about your trainer',
      'about your usual way of teaching',
    ];

    return questionsCategories.map(category => {
      return (
        <React.Fragment>
          <h2>{category}</h2>
          {this.loopOverQuestionsRender(
            questions,
            answers,
            errorArray,
            onChange,
            handleOther,
            category
          )}
        </React.Fragment>
      );
    });
  }
}
