import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../../../history';
import { fetchSessionDetails } from '../../../../actions/groupSessionsAction';
// ANTD COMPONENTS

// COMMON COMPONENTS
import Spin from '../../../common/Spin';
import Header from '../../../common/Header';

// STYLE
import {
  EmailInfoWrapper,
  BackLink,
  BackContainer,
  EmailInfo,
  InfoTitle,
  List,
} from './Invite&Promote.style';

class SendInvitation extends Component {
  // recieve id of session then fetch it's data to display

  render() {
    return (
      <EmailInfoWrapper>
        <Header type="view" label="Invite Emails" />
        <BackContainer>
          <BackLink onClick={history.goBack}>{`< Back`}</BackLink>
        </BackContainer>
        <EmailInfo>
          <InfoTitle>
            Date:
            <span style={{ marginLeft: '.5rem', color: '#4f4f4f' }}>
              12/3/2019
            </span>
          </InfoTitle>

          <InfoTitle>Message:</InfoTitle>
          <p>Dear course participants,</p>

          <p>
            Max has invited you to register for an upcoming Connect 5 training
            session.
          </p>
          <List>
            <li>- Session Date</li>
            <li>- Session Type</li>
            <li>- location</li>
            <li>- time</li>
            <li>- trainer names</li>
          </List>
          <p>To confirm your attendance please click this link: </p>

          <p>Sincerely,</p>

          <p>your Connect 5 team.</p>

          <div>
            <InfoTitle>Sent to</InfoTitle>
            <List>
              <li>joseph.s.friel@gmail.com</li>
              <li> dupreenator@gmail.com</li>
              <li> marwa@gmail.com,</li>
              <li>ramy@gmail.com,</li>
              <li> abdalsamad@gmail.com, </li>
            </List>
          </div>
        </EmailInfo>
      </EmailInfoWrapper>
    );
  }
}

const mapStateToProps = state => ({
  sessionDetails: state.sessions.sessionDetails[0],
});

export default connect(
  mapStateToProps,
  { fetchSessionDetails }
)(SendInvitation);
