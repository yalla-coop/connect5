import React, { Component } from 'react';
import { connect } from 'react-redux';

import Collapse from 'antd/lib/collapse';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

import { fetchUserResults } from '../../../actions/users';
import BehavioralSurveyResults from '../../common/BehavioralInsight/Survey';
import { TrainerResultsWrapper, ButtonWrapper } from './SurveyResults.style';
import Header from '../../common/Header';
import Toggle from '../../common/Toggle';

const { Panel } = Collapse;

const panels = ({ sessionId, surveyType }) => ({
  behavior: {
    text: 'Behavioural Analysis',
    render: () => (
      <BehavioralSurveyResults sessionId={sessionId} surveyType={surveyType} />
    ),
  },
  feedback: { text: 'Trainer feedback', render: () => null },
});

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

    const panelsElements = panels(params);
    const { results } = this.props;
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
          >
            {Object.keys(panelsElements).map(panel => (
              <Panel
                header={panelsElements[panel].text}
                key={panel}
                style={{
                  background: '#f7f7f7',
                  borderRadius: 4,
                  overflow: 'hidden',
                  padding: 0,
                }}
              >
                {panelsElements[panel].render(results)}
              </Panel>
            ))}
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
