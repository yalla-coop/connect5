// this is where we map through all the questions
// and populate the Survey component
import React from "react";
import { DatePicker, Rate, Select, Icon, Modal, Collapse } from "antd";
// // please leave this inside for antd to style right
// import 'antd/dist/antd.css';
import moment from "moment";

import {
  RadioField,
  TextField,
  QuestionWrapper,
  SectionCategory,
  SubGroup,
  Warning,
  RateDiv,
  QuestionGroup,
  InfoHeader,
  StyledIframe,
  QuestionText
} from "./Questions.style";

const { Option } = Select;
const { Panel } = Collapse;

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
  handleDropdown,
  code,
  setMaxNumber,
  toggleModal
) => {
  if (inputType === "text") {
    return (
      <TextField>
        <header>
          {subGroup && <SubGroup>{subGroup}</SubGroup>}
          <QuestionText id={index}>{questionText}</QuestionText>
          {group.text === "Behavioural Insights" && (
            <Icon
              type="info-circle"
              fontSize={14}
              onClick={toggleModal}
              style={{
                display: "inline",
                marginLeft: "0.75rem",
                color: "#1890ff"
              }}
            />
          )}
          <p className="helpertext">{helperText}</p>
        </header>

        <div>
          <input
            id={index}
            name={questionId}
            type="text"
            onChange={onChange}
            data-group={group.text}
            data-field={participantField}
            value={
              answers[questionId] && answers[questionId].answer
                ? answers[questionId].answer
                : ""
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
          {!answers[questionId] && "* this question must be answered"}
        </Warning>
      </TextField>
    );
  }
  if (inputType === "date") {
    return (
      <TextField
        unanswered={errorArray.includes(questionId) && !answers[questionId]}
      >
        <header>
          {subGroup && <SubGroup>{subGroup}</SubGroup>}
          <QuestionText id={index}>{questionText}</QuestionText>
          {group.text === "Behavioural Insights" && (
            <Icon
              type="info-circle"
              fontSize={14}
              onClick={toggleModal}
              style={{
                display: "inline",
                marginLeft: "0.75rem",
                color: "#1890ff"
              }}
            />
          )}
          <p className="helpertext">{helperText}</p>
        </header>
        <DatePicker
          id={index}
          name={questionId}
          onChange={value =>
            handleAntdDatePicker(
              questionId,
              value,
              group.text,
              participantField
            )
          }
          value={answers[questionId] && answers[questionId].answer}
          onBlur={() => setCurrentQuestion(nextQuestionID)}
          defaultValue={moment()}
        />
        {!answers[questionId] && (
          <Warning>* this question must be answered</Warning>
        )}
      </TextField>
    );
  }
  if (inputType === "numberPositive") {
    return (
      <TextField
        unanswered={errorArray.includes(questionId) && !answers[questionId]}
      >
        <header>
          {subGroup && <SubGroup>{subGroup}</SubGroup>}
          <QuestionText id={index}>{questionText}</QuestionText>
          {group.text === "Behavioural Insights" && (
            <Icon
              type="info-circle"
              fontSize={14}
              onClick={toggleModal}
              style={{
                display: "inline",
                marginLeft: "0.75rem",
                color: "#1890ff"
              }}
            />
          )}
          <p className="helpertext">Please specify number</p>

          <p className="helpertext">{helperText}</p>
        </header>
        <input
          id={index}
          name={questionId}
          type="number"
          min="0"
          onChange={onChange}
          data-group={group.text}
          data-field={participantField}
          data-code={code}
          data-type={inputType}
          value={
            answers[questionId] && answers[questionId].answer
              ? answers[questionId].answer
              : ""
          }
          onBlur={e => {
            setCurrentQuestion(nextQuestionID);
            return setMaxNumber(code, e.target.value);
          }}
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
  if (inputType === "numberZeroTen") {
    return (
      <TextField
        unanswered={errorArray.includes(questionId) && !answers[questionId]}
      >
        <header>
          {subGroup && <SubGroup>{subGroup}</SubGroup>}
          <QuestionText id={index}>{questionText}</QuestionText>
          {group.text === "Behavioural Insights" && (
            <Icon
              type="info-circle"
              fontSize={14}
              onClick={toggleModal}
              style={{
                display: "inline",
                marginLeft: "0.75rem",
                color: "#1890ff"
              }}
            />
          )}
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
            allowClear={false}
            count={6}
            onChange={value => {
              handleStarChange(value, questionId, participantField);
              return setCurrentQuestion(nextQuestionID);
            }}
            unanswered={errorArray.includes(questionId) && !answers[questionId]}
            data-group={group.text}
            data-field={participantField}
            onBlur={() => setCurrentQuestion(nextQuestionID)}
            value={answers[questionId] && answers[questionId].answer + 1}
          />
        </RateDiv>
        {!answers[questionId] && (
          <Warning>* this question must be answered</Warning>
        )}
      </TextField>
    );
  }
  if (inputType === "radio") {
    return (
      <RadioField
        unanswered={errorArray.includes(questionId) && !answers[questionId]}
      >
        <header>
          {subGroup && <SubGroup>{subGroup}</SubGroup>}
          <QuestionText id={index}>{questionText}</QuestionText>
          {group.text === "Behavioural Insights" && (
            <Icon
              type="info-circle"
              fontSize={14}
              onClick={toggleModal}
              style={{
                display: "inline",
                marginLeft: "0.75rem",
                color: "#1890ff"
              }}
            />
          )}
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
                          : ""
                      }
                      id={uniqueId}
                      name={questionId}
                      type="radio"
                      onChange={radioE => {
                        onChange(radioE);
                        return setCurrentQuestion(nextQuestionID);
                      }}
                      data-group={group.text}
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
          answers[questionId].answer.includes("Other") ? (
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
                data-group={group.text}
                data-field={participantField}
                onBlur={() => setCurrentQuestion(nextQuestionID)}
              />
            </TextField>
          ) : (
            ""
          )}
        </div>
        {!answers[questionId] && (
          <Warning>* this question must be answered</Warning>
        )}
      </RadioField>
    );
  }
  if (inputType === "dropdown") {
    return (
      <RadioField
        unanswered={errorArray.includes(questionId) && !answers[questionId]}
      >
        <header>
          {subGroup && <SubGroup>{subGroup}</SubGroup>}
          <QuestionText id={index}>{questionText}</QuestionText>
          {group.text === "Behavioural Insights" && (
            <Icon
              type="info-circle"
              fontSize={14}
              onClick={toggleModal}
              style={{
                display: "inline",
                marginLeft: "0.75rem",
                color: "#1890ff"
              }}
            />
          )}
          <p className="helpertext">{helperText}</p>
        </header>
        <Select
          value={answers[questionId] && answers[questionId].answer}
          defaultActiveFirstOption={false}
          onChange={value => {
            handleDropdown(value, questionId, participantField);
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
          answers[questionId].answer.includes("Other") ? (
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
                data-group={group.text}
                data-field={participantField}
                onBlur={() => setCurrentQuestion(nextQuestionID)}
              />
            </TextField>
          ) : (
            ""
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
  handleDropdown,
  toggleModal,
  setMaxNumber
) => {
  const demographicQs = arrayOfQuestions.filter(
    question => question.group.text === "demographic"
  );

  const behaviourQs = arrayOfQuestions.filter(
    question => question.group.text === "Behavioural Insights"
  );

  const trainerQs = arrayOfQuestions.filter(
    question => question.group.text === "about your trainer"
  );

  const teachingQs = arrayOfQuestions.filter(
    question => question.group.text === "about your usual way of teaching"
  );

  const teachingFutureQs = arrayOfQuestions.filter(
    question =>
      question.group.text === "about how you expect to teach in the future"
  );

  return [demographicQs, behaviourQs, trainerQs, teachingQs, teachingFutureQs]
    .filter(section => section.length > 0)
    .map((section, index) => (
      // map through each section
      <QuestionGroup key={section[0].group}>
        <SectionCategory>{section[0] && section[0].group.text}</SectionCategory>
        {section[0] && section[0].group.text === "Behavioural Insights" && (
          <InfoHeader to="#" onClick={toggleModal}>
            <Icon
              type="info-circle"
              fontSize={14}
              onClick={toggleModal}
              style={{
                display: "inline",
                marginRight: "0.75rem",
                color: "#1890ff"
              }}
            />
            Why are you asking me these questions?
          </InfoHeader>
        )}
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
              code
            } = el;
            const inputType = el.questionType.desc;
            const nextQuestion = section[qIndex + 1];
            const nextQuestionID = nextQuestion ? nextQuestion._id : "end";
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
                  handleDropdown,
                  code,
                  setMaxNumber,
                  toggleModal
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
    modalVisible: false
  };

  componentDidUpdate() {
    const { currentQuestion } = this.state;
    const element = document.getElementById(currentQuestion);
    if (element && currentQuestion !== "end") {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    } else if (currentQuestion === "end") {
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

  // toggle modal visibility
  toggleModal = () => {
    const { modalVisible } = this.state;
    this.setState({ modalVisible: !modalVisible });
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
      setMaxNumber,
      testNumber
    } = this.props;

    const { setCurrentQuestion, toggleModal } = this;

    const { modalVisible } = this.state;

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
            handleDropdown,
            toggleModal,
            setMaxNumber,
            testNumber
          )}
          {renderSkipButtons}
        </QuestionGroup>
        <Modal
          title="Connect5 Impacting Behaviour"
          visible={modalVisible}
          onOk={toggleModal}
          onCancel={toggleModal}
          width={800}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <p>
            The aim of Connect5 is to improve population mental wellbeing by
            changing the way people have conversations about mental wellbeing
            with the public.
          </p>
          <p>
            By answering these questions we can understand how well we are
            helping you with these sorts of conversations, and use this to
            improve the quality of our training
          </p>
          <StyledIframe>
            <iframe
              src="https://player.vimeo.com/video/190771407"
              width="640"
              height="360"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
              title="COM-B explanation Video"
            />
          </StyledIframe>
          <Collapse bordered={false}>
            <Panel header="What are mental wellbeing conversations?" key="1">
              <p>
                {'"'}Mental wellbeing conversations{'"'} includes a lot of
                different types of conversation. Connect5 is targeting three
                types of conversation. These are:
              </p>
              <ol>
                <li>
                  Conversations in which you suggest ways a person can take
                  action to improve mental wellbeing.
                </li>
                <li>
                  Conversations in which you and the person you are talking to
                  develop a shared understanding of that person’s mental
                  wellbeing needs.
                </li>
                <li>
                  Conversations that empower a person to make changes that
                  address their mental wellbeing needs.
                </li>
              </ol>
              <p>
                These three types of conversation increase in both complexity
                and probably time take from the first to the last.
              </p>
            </Panel>
            <Panel
              header="Find out more about what we mean when we say 'conversations in which you suggest ways a person can take action to improve mental wellbeing.'"
              key="2"
            >
              <p>
                Here we include brief wellbeing advice. This could include
                things like “have you thought of looking at any self-help
                materials?” or “that sounds difficult for you, what are your
                thoughts about what you might need to support you though it”.
              </p>
              <p>
                This behaviour assumes that you might not have opportunity in
                terms of your role or time to go a step further and, together
                with the person, develop a shared understanding of their mental
                health and wellbeing needs. These conversations will probably be
                quite short.
              </p>
            </Panel>
            <Panel
              header="Find out more about what we mean when we say 'conversations in which you and the person you
are talking to develop a shared understanding of that person’s mental wellbeing needs.'"
              key="3"
            >
              <p>
                Here we mean offering brief mental wellbeing interventions. This
                goes beyond giving brief wellbeing advice. These are
                conversations in which you, and the person you are talking with,
                gain insight and discuss taking action to improve their mental
                wellbeing.
              </p>
              <p>
                It doesn’t go as far as using conversational methods to empower
                change. These conversations provide a framework for a person to
                understand why they feel like do and what action they can take
                for themselves to feel better.
              </p>
              <p>
                Examples of this type of conversation include {'"'}what’s going
                on for you at the moment?{'"'}, “when this is happening what
                kinds of things run through your mind?{'"'}, {'"'}how do you
                feel about the situation?{'"'}, {'"'}since this has been
                happening what kind of changes have you noticed in what you do?
                {'"'}
              </p>
            </Panel>
            <Panel
              header="Find out more about what we mean when we say, 'conversations in which you use appropriate
methods to empower a person to make changes that address their mental wellbeing.'"
              key="4"
            >
              <p>
                Here we are working with someone to help them gain insight into
                actions that might help them to address their mental wellbeing.
                It goes beyond developing a shared understanding of the issues,
                to the individual themselves deciding what they are going to do
                and planning their actions.
              </p>
              <p>
                You would usually need more time to have this sort of
                conversation as the action needs to be planed and reviewed. C5
                offers a range of psychologically informed tools and resources
                which target change at different aspects of a person’s
                experience and provide a framework for these conversations
              </p>
              <p>
                Examples of this type of conversation are {'"'}now we have
                identified the problem you want to address let’s figure out what
                your goal is{'"'}, {'"'}now you have identified you want to
                change your behaviour, let’s work together to make a plan so
                that you get more connection, pleasure and achievement over the
                next week{'"'}
              </p>
            </Panel>
          </Collapse>
        </Modal>
      </React.Fragment>
    );
  }
}
