import React, { Component } from 'react';
import { connect } from 'react-redux';

import Collapse from 'antd/lib/collapse';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

import { fetchUserResults } from '../../../actions/users';
import BehavioralSurveyResults from './BehavioralSurveyResults';
import { TrainerResultsWrapper, ButtonWrapper } from './SurveyResults.style';
import Header from '../../common/Header';

const { Panel } = Collapse;

const panels = {
  behavior: {
    text: 'Behavioural Analysis',
    render: () => <BehavioralSurveyResults />,
  },
  feedback: { text: 'Trainer feedback', render: () => null },
};

class SurveyResults extends Component {
  async componentDidMount() {
    // show results based on the logged in user id and role
    const {
      match: { params },
    } = this.props;
  }

  render() {
    const { results } = this.props;
    return (
      <TrainerResultsWrapper>
        <Header label="results" type="section" />
        <Collapse
          accordion
          expandIconPosition="right"
          expandIcon={({ isActive }) => (
            <Icon type="down" rotate={isActive ? 90 : 0} />
          )}
        >
          {Object.keys(panels).map(panel => (
            <Panel header={panels[panel].text} key={panel}>
              {panels[panel].render(results)}
            </Panel>
          ))}
        </Collapse>
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
