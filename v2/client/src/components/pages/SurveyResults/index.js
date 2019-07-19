import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Collapse from 'antd/lib/collapse';
import Icon from 'antd/lib/icon';

import { fetchUserResults } from '../../../actions/users';
import BehavioralSurveyResults from '../../common/BehavioralInsight/Survey';
import {
  TrainerResultsWrapper,
  StatsDiv,
  Paragraph,
  Bold,
  IndividualWrapper,
  Error,
  IndividualQuestion,
  NavigationWrapper,
  Arrow,
  QuestionSpan,
  Answer,
} from './SurveyResults.style';
import TrainerFeedback from '../../common/Feedback';
import Header from '../../common/Header';
import Toggle from '../../common/Toggle';
import ExportButton from '../../common/ExportButton';

const { Panel } = Collapse;

const behavioralSurveys = [
  'pre-day-1',
  'post-day-1',
  'post-day-2',
  'post-day-3',
  'pre-special',
  'post-special',
];

class SurveyResults extends Component {
  state = {
    toggle: 'left',
    responses: [],
    attendeesNumber: null,
    responsesNumber: null,
    activeIndex: 0,
  };

  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    axios
      .get(`/api/session/${params.sessionId}/${params.surveyType}/responses`)
      .then(({ data }) => {
        const { responses, attendeesNumber, responsesNumber } = data;
        this.setState({ responses, attendeesNumber, responsesNumber });
      });
  }

  clickToggle = direction => {
    this.setState({ toggle: direction });
  };

  handleNextPrev = e => {
    const { activeIndex, responses } = this.state;
    const inc = Number(e.target.id);
    let newIndex = 0;
    if (activeIndex + inc >= responses.length) {
      newIndex = 0;
    } else if (activeIndex + inc < 0) {
      newIndex = responses.length - 1;
    } else {
      newIndex = activeIndex + inc;
    }
    this.setState({ activeIndex: newIndex });
  };

  render() {
    const {
      match: { params },
    } = this.props;
    const {
      toggle,
      responses,
      attendeesNumber,
      responsesNumber,
      activeIndex,
    } = this.state;

    const responseNumber = activeIndex + 1;
    const activeresponse = responses && responses[activeIndex];
    return (
      <TrainerResultsWrapper>
        <Header label="results" type="section" />
        <Toggle
          selected={toggle}
          leftText="Overall Results"
          rightText="Individual Responses"
          large
          style={{ margin: '20px auto' }}
          onClick={this.clickToggle}
        />
        {toggle === 'left' ? (
          <>
            <StatsDiv>
              <Paragraph first>
                <Bold>Number of Replies: {responsesNumber}</Bold> (out of{' '}
                {attendeesNumber})
              </Paragraph>
              <Paragraph>
                <Bold>
                  Completion Rate:{' '}
                  {Math.round((responsesNumber / attendeesNumber) * 100)}%
                </Bold>
              </Paragraph>
            </StatsDiv>
            <div className="survey-results__collaps">
              <Collapse
                accordion
                bordered={false}
                expandIconPosition="right"
                expandIcon={({ isActive }) => (
                  <Icon type="down" rotate={isActive ? 90 : 0} />
                )}
                defaultActiveKey={['1']}
              >
                {behavioralSurveys.includes(params.surveyType) ? (
                  <Panel
                    key={
                      behavioralSurveys.includes(params.surveyType) ? '1' : '0'
                    }
                    header="Behavioural Analysis"
                    style={{
                      background: '#f7f7f7',
                      borderRadius: 4,
                      overflow: 'hidden',
                      padding: 0,
                    }}
                  >
                    <BehavioralSurveyResults
                      sessionId={params.sessionId}
                      surveyType={params.surveyType}
                    />
                  </Panel>
                ) : null}
                <Panel
                  header="Trainer feedback"
                  key={
                    behavioralSurveys.includes(params.surveyType) ? '0' : '1'
                  }
                  style={{
                    background: '#f7f7f7',
                    borderRadius: 4,
                    overflow: 'hidden',
                    padding: 0,
                  }}
                >
                  <TrainerFeedback
                    sessionId={params.sessionId}
                    surveyType={params.surveyType}
                  />
                </Panel>
              </Collapse>
            </div>
            {/* <ButtonWrapper>
              <Button icon="download" size="large">
                Export to CSV
              </Button>
            </ButtonWrapper> */}
            <ExportButton />
            {console.log("you're here")}
          </>
        ) : (
          <IndividualWrapper>
            {responsesNumber === 0 ? (
              <Error>This session has no responses yet :(</Error>
            ) : (
              <div style={{ paddingTop: '5px' }}>
                <NavigationWrapper>
                  <Arrow
                    direction="right"
                    id="-1"
                    onClick={this.handleNextPrev}
                  />

                  <i>
                    {responseNumber} OF {responsesNumber}
                  </i>

                  <Arrow
                    direction="left"
                    id="+1"
                    onClick={this.handleNextPrev}
                  />
                </NavigationWrapper>
                <Paragraph first align="center">
                  <Bold>
                    Participant {activeresponse.PIN} -{' '}
                    <Link to={`/participant/${activeresponse.PIN}`}>
                      view profile
                    </Link>
                  </Bold>
                </Paragraph>

                {activeresponse.data.map(question => (
                  <IndividualQuestion key={question.questionText}>
                    <QuestionSpan>Q.</QuestionSpan>
                    {question.questionText}
                    <Answer>
                      <QuestionSpan>A.</QuestionSpan>
                      {question.answer}
                    </Answer>
                  </IndividualQuestion>
                ))}
              </div>
            )}
          </IndividualWrapper>
        )}
      </TrainerResultsWrapper>
    );
  }
}

const mapStateToProps = state => ({
  results: state.results,
});

export default connect(
  mapStateToProps,
  { fetchUserResults }
)(SurveyResults);
