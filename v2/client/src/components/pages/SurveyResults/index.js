import React, { Component } from 'react';
import { connect } from 'react-redux';

import Collapse from 'antd/lib/collapse';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

import { fetchUserResults } from '../../../actions/users';
import BehavioralSurveyResults from '../../common/BehavioralInsight/Survey';
import TrainerFeedback from '../../common/Feedback';
import { TrainerResultsWrapper, ButtonWrapper } from './SurveyResults.style';
import Header from '../../common/Header';
import Toggle from '../../common/Toggle';

const { Panel } = Collapse;

const behavioralSurveys = [
  'pre-day-1',
  'post-day-1',
  'post-day-2',
  'post-day-3',
  'post-special',
];

class SurveyResults extends Component {
  state = {
    toggle: 'right',
  };

  clickToggle = direction => {
    this.setState({ toggle: direction });
  };

  render() {
    const {
      match: { params },
    } = this.props;
    const { toggle } = this.state;

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
                key={behavioralSurveys.includes(params.surveyType) ? '1' : '0'}
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
              key={behavioralSurveys.includes(params.surveyType) ? '0' : '1'}
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
        <ButtonWrapper>
          <Button icon="download" size="large">
            Export to CSV
          </Button>
        </ButtonWrapper>
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
