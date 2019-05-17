// this is where we map through all the questions
// and populate the Survey component

import React from 'react';

import { RadioField, TextField, ErrorDiv, Slider } from './Questions.style';

const checkErrors = (errors, questionId, answers) =>
  errors.includes(questionId) && !answers[questionId] ? (
    <ErrorDiv>
      <span>Required</span>
    </ErrorDiv>
  ) : (
    ''
  );

const renderQuestionInputType = (
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
  if (inputType === 'text') {
    return (
      <TextField>
        <header>
          {subGroup && <h3>{subGroup}</h3>}
          <p id={index}>{questionText}</p>
          <p className="helpertext">{helperText}</p>
          {checkErrors(errorArray, questionId, answers)}
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
          <p id={index}>{questionText}</p>
          <p className="helpertext">{helperText}</p>
          {checkErrors(errorArray, questionId, answers)}
        </header>
        <input id={index} name={questionId} type="date" onChange={onChange} />
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
          {checkErrors(errorArray, questionId, answers)}
        </header>
        <input
          id={index}
          name={questionId}
          type="number"
          min="0"
          onChange={onChange}
        />
      </TextField>
    );
  }
  if (inputType === 'numberZeroTen') {
    return (
      <TextField>
        <header>
          {subGroup && <h3>{subGroup}</h3>}
          <h4 id={index}>{questionText}</h4>
          <p className="helpertext">{helperText}</p>
          {checkErrors(errorArray, questionId, answers)}
        </header>
        <Slider
          unanswered={errorArray.includes(questionId) && !answers[questionId]}
          id={`sliderInput-${index}`}
          name={questionId}
          min="0"
          max="10"
          type="range"
          onChange={onChange}
        />
        <output>{answers[questionId]}</output>
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
          <p id={index}>{questionText}</p>
          <p className="helpertext">{helperText}</p>
          {checkErrors(errorArray, questionId, answers)}
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

const questionsRender = (
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
      renderQuestionInputType(
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

export default class Questions extends React.Component {
  render() {
    const {
      onChange,
      questions,
      handleOther,
      handlePIN,
      answers,
      errors,
    } = this.props;

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
          <TextField>
            <header>
              <h4>Please enter your PIN</h4>
              <p>
                We want to create a PIN code so that we can link your responses
                to this survey with your responses to other Connect 5 surveys,
                whilst you remain entirely anonymous. In order to do that,
                please type in the third letter of your first name, the first
                two letters of your mother's first name and the date you were
                born (e.g., you would type 18 if you were born on the 18th of
                July)
              </p>
            </header>
            <input id="PIN" name="PIN" type="text" onChange={handlePIN} />
          </TextField>
          {questionsRender(
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
