/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import moment from 'moment';

import { fetchParticipantSessions } from '../../../actions/groupSessionsAction';
import { logout } from '../../../actions/authAction';
import { uppercaseSurvey } from '../../../helpers';

import { surveysTypes } from '../../../constants';

import Header from '../../common/Header';

import {
  DashboardWrapper,
  H3,
  LinkBtn,
  LogOut,
  Pin,
  Content,
  Span,
} from './ParticipantDashboard.style';

class UserDashboard extends Component {
  state = {
    popupVisible: false,
    dismissed: false,
    canGetCertivicate: false,
  };

  componentDidMount() {
    const { location, PIN } = this.props;
    if (!location.state) return;
    const { surveySubmited, sessionId } = location.state;
    if (surveySubmited && sessionId) {
      this.props.fetchParticipantSessions({ PIN });
    }
  }

  componentDidUpdate() {
    const { sessions, location } = this.props;
    const { popupVisible, dismissed } = this.state;

    if (!location.state || sessions.length === 0) {
      return;
    }

    const { surveySubmited, sessionId } = location.state;
    // check if the participant completed all session survey

    if (surveySubmited && sessionId && !popupVisible && !dismissed) {
      const isSessionCompleted = sessions.some(
        item => item.sessions._id === sessionId && item.completed
      );
      if (isSessionCompleted) {
        this.setState({ popupVisible: true, canGetCertivicate: true });
      } else {
        const [sessionDetails] = sessions.filter(
          session => session.sessions._id === sessionId
        );

        const [remainedSession] = surveysTypes[
          sessionDetails.sessions.type
        ].filter(type => !sessionDetails.surveyType.includes(type));

        // check if the session done
        // then show the post survey link
        const isSessionDone =
          Date.now() >= moment(sessionDetails.sessions.date).valueOf();

        const isSessionPre = remainedSession.includes('pre');

        this.setState({
          popupVisible: isSessionPre || isSessionDone,
          canGetCertivicate: false,
          remainedSessionCapital: uppercaseSurvey(remainedSession),
          remainedSession,
          shortId: sessionDetails.sessions.shortId,
          dismissed: isSessionPre || !isSessionDone,
        });
      }
    }
  }

  handleOk = () => {
    const { history } = this.props;
    const { canGetCertivicate, remainedSession, shortId } = this.state;

    const { sessionId } = history.location.state;
    if (canGetCertivicate) {
      history.push(`/certificate/${sessionId}`);
    } else {
      history.push(`/survey/${remainedSession}&${shortId}`);
    }
  };

  handleCancel = () => {
    this.setState({ popupVisible: false, dismissed: true });
  };

  render() {
    const { PIN, logout: logoutAction, email } = this.props;
    const {
      popupVisible,
      canGetCertivicate,
      remainedSessionCapital,
      dismissed,
    } = this.state;
    return (
      <DashboardWrapper>
        <Header type="home" />
        {PIN && (
          <>
            <Modal
              title={canGetCertivicate ? 'Congratulations: 🎉🎉' : 'Thank you!'}
              visible={popupVisible && !dismissed}
              onOk={this.handleOk}
              okText={
                canGetCertivicate ? 'Get the cirtificate' : 'Fill the survey'
              }
              cancelText="Skip"
              onCancel={this.handleCancel}
            >
              {canGetCertivicate ? (
                <p>You successfully completed the session{"'"}s surveys</p>
              ) : (
                <p>Fill the survey {remainedSessionCapital}</p>
              )}
            </Modal>
          </>
        )}
        <H3>Welcome back</H3>
        <Content>
          {PIN ? <Span>my PIN:</Span> : <Span>my email:</Span>}
          <Pin>{PIN || email}</Pin>
        </Content>

        {(PIN && (
          <>
            <LinkBtn to="/participant/behavioral-insight">Insights</LinkBtn>
            <LinkBtn to="/participant/progress">Progress</LinkBtn>
            <LinkBtn to="/sessions-files">Materials</LinkBtn>
          </>
        )) || <LinkBtn to="/participant-sessions-list">Session</LinkBtn>}

        <LogOut onClick={logoutAction}>Log out</LogOut>
      </DashboardWrapper>
    );
  }
}

const mapStateToProps = state => ({
  PIN: state.auth.PIN,
  email: state.auth.email,
  sessions: state.sessions.sessions,
});

export default connect(
  mapStateToProps,
  { fetchParticipantSessions, logout }
)(UserDashboard);
