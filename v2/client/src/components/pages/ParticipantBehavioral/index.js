import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ParticipantBehavioralInsight from '../../common/BehavioralInsight/Participant';
import { Wrapper, Paragraph } from './ParticipantBehavioral.style';
import Header from '../../common/Header';

const ParticipantBehavioral = ({ isAuthenticated, PIN, role }) => {
  if (!isAuthenticated || role !== 'participant' || !PIN) {
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
        <ParticipantBehavioralInsight userRole={role} idOrPIN={PIN} />;
      </Wrapper>
    </>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loaded: state.auth.loaded,
  PIN: state.auth.PIN,
  role: state.auth.role,
});

export default connect(mapStateToProps)(ParticipantBehavioral);
