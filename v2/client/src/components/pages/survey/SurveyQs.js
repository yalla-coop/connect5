// this is where we map through all the questions
// and populate the Survey component
import React from 'react';
import { DatePicker, Progress, Rate } from 'antd';
// please leave this inside for antd to style right
import 'antd/dist/antd.css';
import { colors } from '../../../theme';
import { Link, Element, animateScroll as scroll } from 'react-scroll'

import {
  RadioField,
  TextField,
  Slider,
  NumberSliderDiv,
  NumberOutput,
  QuestionWrapper,
  SectionCategory,
  SubGroup,
  Warning,
  StyledElement
} from './Questions.style';

import { ProgressWrapper } from './Survey.style';
// checks if errors are present (renders error msg after submit)

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
  currentQuestion
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
          <Warning>
            {!answers[questionId] && '* this question must be answered'}
          </Warning>
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
          />
        </div>
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
          {!answers[questionId] && (
            <Warning>* this question must be answered</Warning>
          )}
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
          {!answers[questionId] && (
            <Warning>* this question must be answered</Warning>
          )}
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
          {!answers[questionId] && (
            <Warning>* this question must be answered</Warning>
          )}
        </header>
        <NumberSliderDiv>
          {/* <Slider
            id={`sliderInput-${index}`}
            name={questionId}
            min="0"
            max="10"
            type="range"
            onChange={onChange}
            unanswered={errorArray.includes(questionId) && !answers[questionId]}
            data-group={group}
            data-field={participantField}
          /> */}
          <Rate
            id={`sliderInput-${index}`}
            name={questionId}
            count={6}
            onChange={value => {
              handleStarChange(value, questionId);
              return setCurrentQuestion(nextQuestionID);
            }
            }
            unanswered={errorArray.includes(questionId) && !answers[questionId]}
            data-group={group}
            data-field={participantField}
            onBlur={() => setCurrentQuestion(nextQuestionID)}
          />
        </NumberSliderDiv>
        <NumberOutput>
          Current Rating:{' '}
          {answers[questionId] ? answers[questionId].answer : '5'}
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
          {!answers[questionId] && (
            <Warning>* this question must be answered</Warning>
          )}
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
                      onChange={() => { 
                        onChange();
                        return setCurrentQuestion(nextQuestionID)
                      }
                      }
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
  currentQuestion
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
      <QuestionWrapper key={section[0].group}>
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
            const nextQuestionID = nextQuestion && nextQuestion._id;
            const prevQuestion = section[qIndex - 1];
            const prevQuestionID = prevQuestion && prevQuestion._id;
            return (
              <StyledElement key={questionId} name={questionId} disabled={!answers[prevQuestionID] && qIndex !== 0} id={questionId} >
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
                  currentQuestion
                )}
                {/* find it's location in the array */}
                {/* check if there's another item beyond it in the array */}
                {/* if so render next button that links to next question */}
                {nextQuestion && <Link to={nextQuestionID} smooth={true} duration={500}>Next Question</Link>}
              </StyledElement>
            );
          })}
      </QuestionWrapper>
    ));
};

export default class Questions extends React.Component {

  state = {
    currentQuestion: null
  }

  componentDidUpdate() {
    const element = document.getElementById(this.state.currentQuestion);
    console.log("reached", this.state.currentQuestion, element)
    if (element) { setTimeout(() => {element.scrollIntoView({behavior: 'smooth', block: 'center'})}, 100 ) };
    // scroll.scrollTo(this.state.currentQuestion)

  }

  // set the current question to focus on 
  setCurrentQuestion = questionId => {
    this.setState({ currentQuestion: questionId });
    // this.refs[questionId].scrollIntoView({behaviour: 'smooth'})
    // const element = document.getElementById(questionId);
    // console.log("hey", element)
    // element.scrollIntoView({behavior: 'smooth'});
  }


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
      completionRate,
    } = this.props;

    const {
      currentQuestion
    } = this.state;

    const { setCurrentQuestion } = this;

    const errorArray = Object.keys(errors);

    return (
      <React.Fragment>
        <QuestionWrapper>
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
            currentQuestion
          )}
          {renderSkipButtons}
          <ProgressWrapper>
            <Progress
              type="circle"
              percent={completionRate}
              width={60}
              strokeColor={`${colors.green}`}
              style={{ color: 'white !important' }}
            />
          </ProgressWrapper>
        </QuestionWrapper>
      </React.Fragment>
    );
  }
}
