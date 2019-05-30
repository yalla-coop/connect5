import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Feedback from '../../common/Feedback';

import { Wrapper, Paragraph } from './TrainerFeedback.style';
import Header from '../../common/Header';

// this can be refactored later on
const urlArr = window.location.href.split('/');
const trainerId = urlArr[5];
let sessionId;
if (urlArr[6]) {
  sessionId = [urlArr[6]];
}

const TrainerFeedbackOverall = ({ isAuthenticated }) => {
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
