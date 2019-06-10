import React, { Component } from 'react';
import { connect } from 'react-redux';

import Collapse from 'antd/lib/collapse';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';

import Reach from '../../common/Reach';
import { fetchUserResults } from '../../../actions/users';

import { TrainerResultsWrapper, ButtonWrapper } from './UserResults.style';
import Header from '../../common/Header';

const { Panel } = Collapse;

const panels = {
  reach: { text: 'Reach', render: props => <Reach data={props} /> },
  behavior: {
    text: 'Behavioural',
    render: () => null,
  },
  feedback: { text: 'Trainer feedback', render: () => null },
};

class UserResults extends Component {
  state = {
    selectedUserId: null,
  };

  async componentDidMount() {
    // show results based on the logged in user id and role
    const {
      match: { params },
      role,
      userId,
      history,
    } = this.props;
    const { id } = params;

    // if trainer has been selected from trainer list and the logged in user is localLead then use the trainer's id and view them as a trainer
    // else if selected from list use that trainer/local lead's role
    // i.e. this would be for an admin viewing
    // otherwise use logged in user's id and role
    const { state } = history.location;
    const { fetchUserResults } = this.props;
    if (state && state.trainer && role === 'localLead') {
      await fetchUserResults(state.trainer._id, 'trainer');
    } else if (state && state.trainer) {
      await fetchUserResults(state.trainer._id, state.trainer.role);
    } else {
      await fetchUserResults(userId, role);
    }

    // check if localLead is in trainer or lead view and assign the role accordingly

    // eslint-disable-next-line react/destructuring-assignment
  }

  render() {
    const { results, role, history, groupView } = this.props;
    const { state } = history.location;

    // if a user has been passed on then store as the user
    const user = state && state.trainer;

    const topLevelView = !groupView && ['admin', 'localLead'].includes(role);
    return (
      <TrainerResultsWrapper nudge={topLevelView}>
        {topLevelView && (
          <Header
            label={user ? `Viewing ${user.name}` : 'Individual View'}
            type="view"
          />
        )}
        <Header label="results" type="section" nudge={topLevelView} />
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
  userId: state.auth.id,
});

export default connect(
  mapStateToProps,
  { fetchUserResults }
)(UserResults);
