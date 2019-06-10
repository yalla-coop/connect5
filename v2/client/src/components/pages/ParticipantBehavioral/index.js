import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import BehavioralInsight from '../../common/BehavioralInsight';
import { Wrapper, Paragraph } from './ParticipantBehavioral.style';
import Header from '../../common/Header';

const ParticipantBehavioral = ({ isAuthenticated, pin, role }) => {
  if (!isAuthenticated || role !== 'participant' || !pin) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Header type="view" label="Behavioural Insights" />
      <Wrapper>
        <Paragraph>
          Behaviour is influenced by our perceptions of our capability,
          opportunity and motivation for that behaviour
        </Paragraph>
        <BehavioralInsight userRole={role} idOrPIN={pin} />;
      </Wrapper>
    </>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loaded: state.auth.loaded,
  pin: state.auth.pin,
  role: state.auth.role,
});

export default connect(mapStateToProps)(ParticipantBehavioral);
