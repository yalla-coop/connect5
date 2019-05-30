import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Feedback from '../../common/Feedback';

import { Wrapper, Paragraph } from './TrainerFeedbackOverall.style';
import Header from '../../common/Header';

const id = window.location.href.split('/')[5];

const TrainerFeedbackOverall = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Header type="view" label="Trainer Feedback" />
      <Wrapper>
        <Paragraph>Did your trainer ask questions...</Paragraph>
        <Feedback id={id} />
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
