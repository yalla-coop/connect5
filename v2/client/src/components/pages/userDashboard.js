/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import moment from 'moment';

import { fetchParticipentSessions } from '../../actions/groupSessionsAction';
import { logout } from '../../actions/authAction';
import { uppercaseSurvey } from '../../helpers';

import { colors } from '../../theme';
import surveyTypes from '../../constants/surveyTypes';

import Header from '../common/Header';

const DashboardWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  padding-top: 3rem;
`;

const H3 = styled.h3`
  text-align: center;
  margin: 0 auto;
  padding-top: 3rem;
`;

const Content = styled.p`
  text-align: center;
  margin-top: 3rem;
`;

const Span = styled.span`
  text-align: center;
  display: block;
`;

const Pin = styled.span`
  text-align: center;
  font-weight: 600;
  font-size: 1.5rem;
  display: block;
  margin-top: 1.5rem;
  margin-bottom: 3rem;
`;

const LinkBtn = styled(Link)`
  background-color: ${colors.lightPrimary};
  border-radius: 28px;
  border: 1px solid ${colors.lightPrimary};
  width: 200px;
  display: block;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 2rem;
  cursor: pointer;
  color: ${colors.white};
  font-size: 1.2rem;
  padding: 14px 30px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #2f6627;

  &:hover {
    background-color: ${colors.white};
    color: ${colors.lightPrimary};
    border: 1px solid ${colors.lightPrimary};
  }

  &:active {
    position: relative;
    top: 1px;
  }
`;

const LogOut = styled.div`
  font-weight: 300;
  font-size: 14px;
  color: ${colors.profileFontColor};
  padding: 0.5rem 0;
  width: 100%;
  text-align: center;
  cursor: pointer;

  :hover {
    color: ${colors.red};
  }
`;

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
      this.props.fetchParticipentSessions(PIN);
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

        const [remainedSession] = surveyTypes[
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
    const { PIN, logout: logoutAction } = this.props;
    const {
      popupVisible,
      canGetCertivicate,
      remainedSessionCapital,
      dismissed,
    } = this.state;
    return (
      <DashboardWrapper>
        <Header type="home" />
        <Modal
          title={canGetCertivicate ? 'Congratulations: 🎉🎉' : 'Thank you!'}
          visible={popupVisible && !dismissed}
          onOk={this.handleOk}
          okText={canGetCertivicate ? 'Get the cirtificate' : 'Fill the survey'}
          cancelText="Skip"
          onCancel={this.handleCancel}
        >
          {canGetCertivicate ? (
            <p>You successfully completed the session{"'"}s surveys</p>
          ) : (
            <p>Fill the survey {remainedSessionCapital}</p>
          )}
        </Modal>
        <H3>Welcome back</H3>
        <Content>
          <Span>my PIN:</Span>
          <Pin>{PIN}</Pin>
        </Content>
        <LinkBtn to="/participant/behavioral-insight">Insights</LinkBtn>
        <LinkBtn to="/participant/progress">Progress</LinkBtn>
        <LinkBtn to="/sessions-files">Materials</LinkBtn>
        <LogOut onClick={logoutAction}>Log out</LogOut>
      </DashboardWrapper>
    );
  }
}

const mapStateToProps = state => ({
  PIN: state.auth.PIN,
  sessions: state.sessions.sessions,
});

export default connect(
  mapStateToProps,
  { fetchParticipentSessions, logout }
)(UserDashboard);
