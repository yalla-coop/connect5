// this is where we map through all the questions
// and populate the Survey component

import React from 'react';
import { Alert } from 'antd';
import {
  RadioField,
  TextField,
  Slider,
  NumberSliderDiv,
  NumberOutput,
  QuestionCategory,
  ErrorDiv,
} from './Questions.style';

// checks if errors are present (renders error msg after submit)
const checkErrors = (errorArr, questionId, answers, errors) => {
  if (errorArr.includes(questionId) && !answers[questionId]) {
    return (
      <ErrorDiv>
        {' '}
        <Alert message={`${errors[questionId]}`} type="error" />
      </ErrorDiv>
    );
  }
  if (
    errorArr.includes(questionId) &&
    errors[questionId] === 'enter a valid UK postcode'
  ) {
    return (
      <ErrorDiv>
        <Alert message={`${errors[questionId]}`} type="error" />
      </ErrorDiv>
    );
  }
  return null;
};

// checks and renders PIN validation msg
const checkPINerror = errors =>
  errors.PIN ? (
    <ErrorDiv>
      <Alert message={`${errors.PIN}`} type="error" />
    </ErrorDiv>
  ) : (
    ''
  );

// renders questions accordingly to their input type
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
  subGroup,
  errors
) => {
  if (inputType === 'text') {
    return (
      <TextField>
        <header>
          {subGroup && <h3>{subGroup}</h3>}
          <h4 id={index}>{questionText}</h4>
          <p className="helpertext">{helperText}</p>
          {checkErrors(errorArray, questionId, answers, errors)}
        </header>
        <input id={index} name={questionId} type="text" onChange={onChange} />
      </TextField>
    );
  }
  if (inputType === 'date') {
    return (
      <TextField>
        <header>
          {subGroup && <p>{subGroup}</p>}
          <h4 id={index}>{questionText}</h4>
          <p className="helpertext">{helperText}</p>
          {checkErrors(errorArray, questionId, answers, errors)}
        </header>
        <input id={index} name={questionId} type="date" onChange={onChange} />
      </TextField>
    );
  }
  if (inputType === 'numberPositive') {
    return (
      <TextField>
        <header>
          {subGroup && <p>{subGroup}</p>}
          <h4 id={index}>{questionText}</h4>
          <p className="helpertext">Please specify number</p>
          <p className="helpertext">{helperText}</p>
          {checkErrors(errorArray, questionId, answers, errors)}
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
          {subGroup && <p>{subGroup}</p>}
          <h4 id={index}>{questionText}</h4>
          <p className="helpertext">
            Please choose: 0 (strongly disagree) to 10 (strongly agree)
          </p>
          <p className="helpertext">{helperText}</p>
          {checkErrors(errorArray, questionId, answers, errors)}
        </header>
        <NumberSliderDiv>
          <Slider
            id={`sliderInput-${index}`}
            name={questionId}
            min="0"
            max="10"
            type="range"
            onChange={onChange}
          />
        </NumberSliderDiv>
        <NumberOutput>
          <strong>Current Rating: </strong>
          {answers[questionId] ? answers[questionId] : '5'}
        </NumberOutput>
      </TextField>
    );
  }
  if (inputType === 'radio') {
    return (
      <RadioField>
        <header>
          {subGroup && <p>{subGroup}</p>}
          <h4 id={index}>{questionText}</h4>
          <p className="helpertext">{helperText}</p>
          {checkErrors(errorArray, questionId, answers, errors)}
        </header>
        <div className="answers">
          {options.map(e => {
            const value = e;

            const uniqueId = e + questionId;
            return (
              <div key={`${value}parent`}>
                <div key={`${value}child`}>
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

// renders sub group text if included
const renderSubGroupText = el =>
  el.subGroup && el.subGroup.text ? el.subGroup.text : null;

// uses renderQuestionInputType fnc from above and loops over questions array
const questionsRender = (
  arrayOfQuestions,
  answers,
  errorArray,
  onChange,
  handleOther,
  errors
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
    return (
      <div key={questionId}>
        {' '}
        {/* renders headlines */}
        <QuestionCategory>
          Question {index + 1} - {group}
        </QuestionCategory>
        {renderQuestionInputType(
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
          renderSubGroupText(el),
          errors
        )}
      </div>
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

    return (
      <React.Fragment>
        <TextField>
          <header>
            <h3>Please enter your PIN</h3>
            <p>
              {` We want to create a PIN code so that we can link your responses to
              this survey with your responses to other Connect 5 surveys, whilst
              you remain entirely anonymous. In order to do that, `}
              <strong>
                {` please type in the third letter of your first name, the first
                two letters of your mother's first name and the date you were
                born `}
              </strong>
              (e.g., you would type 01 if you were born on the 01st of July)
            </p>
          </header>
          {checkPINerror(errors)}
          <input
            id="PIN"
            name="PIN"
            type="text"
            maxLength="5"
            minLength="5"
            onChange={handlePIN}
          />
        </TextField>
        {questionsRender(
          questions,
          answers,
          errorArray,
          onChange,
          handleOther,
          errors
        )}
      </React.Fragment>
    );
  }
}
