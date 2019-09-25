// renders chart js graphs for trainer feedback

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spin from '../Spin';
import { Wrapper, Description, Container } from './Feedback.style';

import HorizontalBarComponent from './HorizontalBarComponent';

import { fetchTrainerFeedback as fetchTrainerFeedbackAction } from '../../../actions/users';
import { WhiteWrapper } from '../BehavioralInsight/BehavioralInsight.style';

class TrainerFeedbackOverall extends Component {
  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    const { role: oldRole } = prevProps;
    const { role } = this.props;
    if (role !== oldRole) {
      this.getData();
    }
  }

  getData = () => {
    const {
      fetchTrainerFeedback,
      trainerId,
      sessionId,
      surveyType,
      role,
    } = this.props;
    fetchTrainerFeedback({ trainerId, sessionId, surveyType, role });
  };

  render() {
    const { feedbackData, loaded } = this.props;

    return (
      <Wrapper>
        {loaded ? (
          <Container>
            {feedbackData.length === 0 ? (
              <Description>no data collected yet :( </Description>
            ) : (
              <WhiteWrapper>
                <HorizontalBarComponent feedbackData={feedbackData} />
              </WhiteWrapper>
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
  feedbackData: state.trainerFeedback.trainer.data,
  loaded: state.trainerFeedback.trainer.loaded,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { fetchTrainerFeedback: fetchTrainerFeedbackAction }
)(TrainerFeedbackOverall);
