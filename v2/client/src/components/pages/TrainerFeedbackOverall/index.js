import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Feedback from '../../common/Feedback';

import Spin from '../../common/Spin';

import {
  Wrapper,
  Paragraph,
  ChartWrapper,
  Description,
  Container,
  HeadlineDiv,
} from './TrainerFeedbackOverall.style';
import Header from '../../common/Header';

const TrainerFeedbackOverall = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Header type="view" label="Trainer Feedback" />
      <Wrapper>
        <Paragraph>Did your trainer ask questions...</Paragraph>
        <Feedback />
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
