import React, { Component } from 'react';
import { connect } from 'react-redux';

import Collapse from 'antd/lib/collapse';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

import Reach from '../../common/Reach';
import { fetchTrainerResults } from '../../../actions/users';

import Header from '../../common/Header';

import {
  TrainerResultsWrapper,
  Header as StyledHeader,
  ContentWrapper,
  ButtonWrapper,
} from './TrainerResults.style';

const { Panel } = Collapse;

const panels = {
  reach: { text: 'Reach', render: props => <Reach data={props} /> },
  behavior: { text: 'Behavioural', render: () => null },
  feedback: { text: 'Trainer feedback', render: () => null },
};

class TrainerReslts extends Component {
  async componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    await this.props.fetchTrainerResults();
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

        <i className="fas fa-home" />
      </TrainerResultsWrapper>
    );
  }
}

const mapStateToProps = state => ({
  results: state.results,
});

export default connect(
  mapStateToProps,
  { fetchTrainerResults }
)(TrainerReslts);
