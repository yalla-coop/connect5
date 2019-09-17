// this is where we map through all the questions
// and populate the Survey component
import React from 'react';
import { DatePicker, Rate, Select } from 'antd';
// // please leave this inside for antd to style right
// import 'antd/dist/antd.css';
import { animateScroll as scroll } from 'react-scroll';

import {
  RadioField,
  TextField,
  QuestionWrapper,
  SectionCategory,
  SubGroup,
  Warning,
  RateDiv,
  QuestionGroup,
} from './Questions.style';

const { Option } = Select;

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
  handleAntdDatePicker,
  group,
  participantField,
  handleStarChange,
  nextQuestionID,
  setCurrentQuestion,
  handleDropdown
) => {
  if (inputType === 'text') {
    return (
      <TextField>
        <header>
          {subGroup && <SubGroup>{subGroup}</SubGroup>}
          <h4 id={index}>{questionText}</h4>
          <p className="helpertext">{helperText}</p>
        </header>

        <div>
          <input
            id={index}
            name={questionId}
            type="text"
            onChange={onChange}
            data-group={group}
            data-field={participantField}
            value={
              answers[questionId] && answers[questionId].answer
                ? answers[questionId].answer
                : ''
            }
            onBlur={() => setCurrentQuestion(nextQuestionID)}
            onKeyDown={event => {
              if (event.keyCode === 13) {
                event.preventDefault();
                return setCurrentQuestion(nextQuestionID);
              }
              return null;
            }}
          />
        </div>
        <Warning>
          {!answers[questionId] && '* this question must be answered'}
        </Warning>
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
        </header>
        <DatePicker
          id={index}
          name={questionId}
          onChange={value =>
            handleAntdDatePicker(questionId, value, group, participantField)
          }
          value={answers[questionId] && answers[questionId].answer}
          onBlur={() => setCurrentQuestion(nextQuestionID)}
        />
        {!answers[questionId] && (
          <Warning>* this question must be answered</Warning>
        )}
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
        </header>
        <input
          id={index}
          name={questionId}
          type="number"
          min="0"
          onChange={onChange}
          data-group={group}
          data-field={participantField}
          value={
            answers[questionId] && answers[questionId].answer
              ? answers[questionId].answer
              : ''
          }
          onBlur={() => setCurrentQuestion(nextQuestionID)}
          onKeyDown={event => {
            if (event.keyCode === 13) {
              event.preventDefault();
              return setCurrentQuestion(nextQuestionID);
            }
            return null;
          }}
        />
        {!answers[questionId] && (
          <Warning>* this question must be answered</Warning>
        )}
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
            Please choose: 1 star (strongly disagree) to 6 stars (strongly
            agree)
          </p>
          <p className="helpertext">{helperText}</p>
        </header>
        <RateDiv>
          <Rate
            id={`sliderInput-${index}`}
            name={questionId}
            count={6}
            onChange={value => {
              handleStarChange(value, questionId);
              return setCurrentQuestion(nextQuestionID);
            }}
            unanswered={errorArray.includes(questionId) && !answers[questionId]}
            data-group={group}
            data-field={participantField}
            onBlur={() => setCurrentQuestion(nextQuestionID)}
          />
        </RateDiv>
        {!answers[questionId] && (
          <Warning>* this question must be answered</Warning>
        )}
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
                      checked={
                        answers[questionId] &&
                        answers[questionId].answer === value
                          ? value
                          : ''
                      }
                      id={uniqueId}
                      name={questionId}
                      type="radio"
                      onChange={radioE => {
                        onChange(radioE);
                        return setCurrentQuestion(nextQuestionID);
                      }}
                      data-group={group}
                      data-field={participantField}
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
          answers[questionId].answer &&
          answers[questionId].answer.includes('Other') ? (
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
                data-group={group}
                data-field={participantField}
                onBlur={() => setCurrentQuestion(nextQuestionID)}
              />
            </TextField>
          ) : (
            ''
          )}
        </div>
        {!answers[questionId] && (
          <Warning>* this question must be answered</Warning>
        )}
      </RadioField>
    );
  }
  if (inputType === 'dropdown') {
    return (
      <RadioField
        unanswered={errorArray.includes(questionId) && !answers[questionId]}
      >
        <header>
          {subGroup && <SubGroup>{subGroup}</SubGroup>}
          <h4 id={index}>{questionText}</h4>
          <p className="helpertext">{helperText}</p>
        </header>
        <Select
          value={answers[questionId] && answers[questionId].answer}
          defaultActiveFirstOption={false}
          onChange={value => {
            handleDropdown(value, questionId);
            return setCurrentQuestion(nextQuestionID);
          }}
          notFoundContent={null}
          onBlur={() => setCurrentQuestion(nextQuestionID)}
        >
          {options.map(option => (
            <Option key={option}>{option}</Option>
          ))}
        </Select>
        <div className="other-div">
          {/* Load "Other" div */}
          {answers[questionId] &&
          answers[questionId].answer &&
          answers[questionId].answer.includes('Other') ? (
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
                data-group={group}
                data-field={participantField}
                onBlur={() => setCurrentQuestion(nextQuestionID)}
              />
            </TextField>
          ) : (
            ''
          )}
        </div>
        {!answers[questionId] && (
          <Warning>* this question must be answered</Warning>
        )}
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
  handleAntdDatePicker,
  handleStarChange,
  setCurrentQuestion,
  handleDropdown
) => {
  const demographicQs = arrayOfQuestions.filter(
    question => question.group.text === 'demographic'
  );

  const behaviourQs = arrayOfQuestions.filter(
    question => question.group.text === 'Behavioural Insights'
  );

  const trainerQs = arrayOfQuestions.filter(
    question => question.group.text === 'about your trainer'
  );

  const teachingQs = arrayOfQuestions.filter(
    question => question.group.text === 'about your usual way of teaching'
  );

  return [demographicQs, behaviourQs, trainerQs, teachingQs]
    .filter(section => section.length > 0)
    .map((section, index) => (
      // map through each section
      <QuestionGroup key={section[0].group}>
        <SectionCategory>{section[0] && section[0].group.text}</SectionCategory>
        {section &&
          section.map((el, qIndex) => {
            // map through all the questions
            // el is one question
            const {
              _id: questionId,
              text: questionText,
              helperText,
              options,
              group,
              participantField,
            } = el;
            const inputType = el.questionType.desc;
            const nextQuestion = section[qIndex + 1];
            const nextQuestionID = nextQuestion ? nextQuestion._id : 'end';
            const prevQuestion = section[qIndex - 1];
            const prevQuestionID = prevQuestion && prevQuestion._id;
            return (
              <QuestionWrapper
                key={questionId}
                name={questionId}
                disabled={!answers[prevQuestionID] && qIndex !== 0}
                id={questionId}
              >
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
                  handleAntdDatePicker,
                  group,
                  participantField,
                  handleStarChange,
                  nextQuestionID,
                  setCurrentQuestion,
                  handleDropdown
                )}
              </QuestionWrapper>
            );
          })}
      </QuestionGroup>
    ));
};

export default class Questions extends React.Component {
  state = {
    currentQuestion: null,
  };

  componentDidUpdate() {
    const { currentQuestion } = this.state;
    const element = document.getElementById(currentQuestion);
    if (element && currentQuestion !== 'end') {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } else if (currentQuestion === 'end') {
      setTimeout(() => {
        // scroll.scrollToBottom();
        this.setState({ currentQuestion: null });
      }, 100);
    }
  }

  // set the current question to focus on
  setCurrentQuestion = questionId => {
    this.setState({ currentQuestion: questionId });
  };

  render() {
    const {
      onChange,
      questions,
      handleOther,
      renderSkipButtons,
      answers,
      errors,
      handleAntdDatePicker,
      handleStarChange,
      handleDropdown,
    } = this.props;

    const { setCurrentQuestion } = this;

    const errorArray = Object.keys(errors);

    return (
      <React.Fragment>
        <QuestionGroup>
          {questionsRender(
            questions,
            answers,
            errorArray,
            onChange,
            handleOther,
            errors,
            handleAntdDatePicker,
            handleStarChange,
            setCurrentQuestion,
            handleDropdown
          )}
          {renderSkipButtons}
        </QuestionGroup>
      </React.Fragment>
    );
  }
}
