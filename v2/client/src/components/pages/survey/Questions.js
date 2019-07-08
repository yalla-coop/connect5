// this is where we map through all the questions
// and populate the Survey component

import React from 'react';
import { Alert, DatePicker } from 'antd';
import {
  RadioField,
  TextField,
  Slider,
  NumberSliderDiv,
  NumberOutput,
  ErrorDiv,
  QuestionWrapper,
  SectionCategory,
  SubGroup,
} from './Questions.style';
// please leave this inside for antd to style right
import 'antd/dist/antd.css';

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
  errors,
  handleAntdDatePicker
) => {
  if (inputType === 'text') {
    return (
      <TextField
        unanswered={errorArray.includes(questionId) && !answers[questionId]}
      >
        <header>
          {subGroup && <SubGroup>{subGroup}</SubGroup>}
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
      <TextField
        unanswered={errorArray.includes(questionId) && !answers[questionId]}
      >
        <header>
          {subGroup && <SubGroup>{subGroup}</SubGroup>}
          <h4 id={index}>{questionText}</h4>
          <p className="helpertext">{helperText}</p>
          {checkErrors(errorArray, questionId, answers, errors)}
        </header>
        <DatePicker
          id={index}
          name={questionId}
          onChange={value => handleAntdDatePicker(questionId, value)}
        />
      </TextField>
    );
  }
  if (inputType === 'numberPositive') {
    return (
      <TextField
        unanswered={errorArray.includes(questionId) && !answers[questionId]}
      >
        <header>
          {subGroup && <SubGroup>{subGroup}</SubGroup>}
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
      <TextField
        unanswered={errorArray.includes(questionId) && !answers[questionId]}
      >
        <header>
          {subGroup && <SubGroup>{subGroup}</SubGroup>}
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
            unanswered={errorArray.includes(questionId) && !answers[questionId]}
          />
        </NumberSliderDiv>
        <NumberOutput>
          Current Rating: {answers[questionId] ? answers[questionId] : '5'}
        </NumberOutput>
      </TextField>
    );
  }
  if (inputType === 'radio') {
    return (
      <RadioField
        unanswered={errorArray.includes(questionId) && !answers[questionId]}
      >
        <header>
          {subGroup && <SubGroup>{subGroup}</SubGroup>}
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
            <TextField
              unanswered={
                errorArray.includes(questionId) && !answers[questionId]
              }
            >
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
  errors,
  handleAntdDatePicker
) => {
  const demographicQs = arrayOfQuestions.filter(
    question => question.group === 'demographic'
  );

  const behaviourQs = arrayOfQuestions.filter(
    question => question.group === 'Behavioural Insights'
  );

  const trainerQs = arrayOfQuestions.filter(
    question => question.group === 'about your trainer'
  );

  const teachingQs = arrayOfQuestions.filter(
    question => question.group === 'about your usual way of teaching'
  );

  return [demographicQs, behaviourQs, trainerQs, teachingQs]
    .filter(section => section.length > 0)
    .map((section, index) => (
      // map through each section
      <QuestionWrapper key={index}>
        <SectionCategory>{section[0] && section[0].group}</SectionCategory>
        {section &&
          section.map((el, ind) => {
            // map through all the questions
            // el is one question
            const {
              _id: questionId,
              text: questionText,
              helperText,
              options,
            } = el;
            const inputType = el.questionType.desc;
            return (
              <div key={questionId}>
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
                  errors,
                  handleAntdDatePicker
                )}
              </div>
            );
          })}
      </QuestionWrapper>
    ));
};

export default class Questions extends React.Component {
  render() {
    const {
      onChange,
      questions,
      handleOther,
      handlePIN,
      answers,
      errors,
      trackAnswers,
      handleAntdDatePicker,
    } = this.props;

    const errorArray = Object.keys(errors);

    return (
      <React.Fragment>
        <QuestionWrapper>
          <SectionCategory>Please enter your PIN</SectionCategory>
          <TextField>
            <header>
              <p>
                {` We want to create a PIN code so that we can link your responses to
              this survey with your responses to other Connect 5 surveys, whilst
              you remain entirely anonymous. In order to do that, `}
                <strong>
                  {` please type in the third letter of your first name, the first
                two letters of your mother's first name and the date you were
                born `}
                </strong>
                (e.g., you would type 01 if you were born on the 1st July)
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
              onBlur={trackAnswers}
            />
          </TextField>
        </QuestionWrapper>
        {questionsRender(
          questions,
          answers,
          errorArray,
          onChange,
          handleOther,
          errors,
          handleAntdDatePicker
        )}
      </React.Fragment>
    );
  }
}
