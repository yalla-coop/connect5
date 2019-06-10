import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Feedback from '../../common/Feedback';

import { Wrapper, Paragraph } from './TrainerFeedback.style';
import Header from '../../common/Header';

// http://localhost:3000/trainer-results/feedback/5ceff6075012e8748ef607ec
const TrainerFeedbackOverall = ({ isAuthenticated, match }) => {
  // session id hardcoded for now
  const sessionId = null;
  const { trainerId } = match.params;

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Header type="view" label="Trainer Feedback" />
      <Wrapper>
        <Paragraph>Did your trainer ask questions...</Paragraph>
        <Feedback trainerId={trainerId} sessionId={sessionId} />
      </Wrapper>
    </>
  );
};

const mapStateToProps = state => ({
  loaded: state.auth.loaded,
  isAuthenticated: state.auth.isAuthenticated,
  role: state.auth.role,
});

export default connect(mapStateToProps)(TrainerFeedbackOverall);
