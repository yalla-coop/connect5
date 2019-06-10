// renders chart js graphs for trainer feedback

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spin from '../Spin';

import { Wrapper, Description, Container } from './Feedback.style';

import HorizontalBarComponent from './HorizontalBarComponent';

import { fetchTrainerFeedback as fetchTrainerFeedbackAction } from '../../../actions/users';

class TrainerFeedbackOverall extends Component {
  componentDidMount() {
    const { fetchTrainerFeedback, trainerId, sessionId } = this.props;
    fetchTrainerFeedback(trainerId, sessionId);
  }

  render() {
    const { feedbackData, loaded } = this.props;

    return (
      <Wrapper>
        {loaded ? (
          <Container>
            {feedbackData.length === 0 ? (
              <Description>no data collected yet :( </Description>
            ) : (
              <HorizontalBarComponent feedbackData={feedbackData} />
            )}
          </Container>
        ) : (
          <Spin />
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  feedbackData: state.trainerFeedback.data,
  loaded: state.trainerFeedback.loaded,
  isAuthenticated: state.auth.isAuthenticated,
  role: state.auth.role,
});

export default connect(
  mapStateToProps,
  { fetchTrainerFeedback: fetchTrainerFeedbackAction }
)(TrainerFeedbackOverall);
