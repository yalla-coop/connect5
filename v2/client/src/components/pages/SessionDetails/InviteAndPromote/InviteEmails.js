import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { fetchSessionDetails } from '../../../../actions/groupSessionsAction';

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
} from './InviteAndPromote.style';

class SendInvitation extends Component {
  render() {
    const { sessionDetails, onClose, emailInfo } = this.props;
    const { startTime, endTime } = sessionDetails;
    const {
      date: emailDate,
      sessionDate,
      trainers,
      trainer,
      sessionType,
      location,
      recipients,
    } = emailInfo;

    return (
      <EmailInfoWrapper>
        <Header type="view" label="Invite Emails" />
        <BackContainer>
          <BackLink onClick={onClose}>{`< Back`}</BackLink>
        </BackContainer>
        <EmailInfo>
          <InfoTitle>
            Date:
            <span style={{ marginLeft: '.5rem', color: '#4f4f4f' }}>
              {moment(emailDate).format('DD/MM/YYYY')}
            </span>
          </InfoTitle>

          <InfoTitle>Message:</InfoTitle>
          <p>Dear course participants,</p>

          <p>
            {trainer} has invited you to register for an upcoming Connect 5
            training session.
          </p>
          <List>
            <li>- Session Date: {moment(sessionDate).format('DD/MM/YYYY')}</li>
            <li>- Session Type: {sessionType}</li>
            <li>- Location: {location}</li>
            <li>
              - time:{startTime} to {endTime}{' '}
            </li>
            <li>- Trainer(s): {trainers}</li>
          </List>
          <p>To confirm your attendance please click this link: </p>

          <p>Sincerely,</p>

          <p>your Connect 5 team.</p>

          <div>
            <InfoTitle>Sent to</InfoTitle>
            <List>
              {recipients &&
                recipients.map(recipient => (
                  <li key={recipient._id}>{recipient}</li>
                ))}
            </List>
          </div>
        </EmailInfo>
      </EmailInfoWrapper>
    );
  }
}

export default connect(
  null,
  { fetchSessionDetails }
)(SendInvitation);
