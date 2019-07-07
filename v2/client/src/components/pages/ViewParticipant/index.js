/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';

// // COMMON COMPONENTS
import Header from '../../common/Header';
import Toggle from '../../common/Toggle';
import ParticipantBehavioralInsight from '../../common/BehavioralInsight/Participant';

// ACTIONS
import { fetchParticipantFeedBack } from '../../../actions/trainerAction';

// STYLING
import { PageWrapper, ContentWrapper } from './ViewParticipant.style';

class ViewParticipant extends Component {
  state = {
    toggle: 'left',
  };

  componentDidMount() {
    const { match } = this.props;
    this.props.fetchParticipantFeedBack(match.params.PIN);
  }

  clickToggle = direction => {
    this.setState({ toggle: direction });
  };

  render() {
    const { toggle } = this.state;

    const { match } = this.props;
    return (
      <PageWrapper>
        <Header label={`Viewing ${match.params.PIN}`} type="view" />
        <Toggle
          selected={toggle}
          leftText="Behavioural Insights"
          rightText="Trainer Feedback"
          large
          style={{ margin: '20px auto' }}
          onClick={this.clickToggle}
        />
        <ContentWrapper>
          {toggle === 'left' ? (
            <>
              <p>
                Behaviour is influenced by our perceptions of our capability,
                opportunity and motivation for that behaviour
              </p>
              <ParticipantBehavioralInsight
                backgroundColor="#fff"
                userRole="participant"
                idOrPIN={match.params.PIN}
              />
            </>
          ) : (
            <></>
          )}
        </ContentWrapper>
      </PageWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    id: state.auth.id,
    role: state.auth.role,
    sessions: state.sessions.sessions,
    sessionsNum: state.sessions.sessionsCount,
    viewLevel: state.viewLevel.viewLevel,
  };
};

export default connect(
  mapStateToProps,
  { fetchParticipantFeedBack }
)(ViewParticipant);
