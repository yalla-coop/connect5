import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sendEmailInvitation } from '../../../../actions/InviteAndPromoteAction';

// COMMON COMPONENTS
import EditEmail from '../../../common/EditEmail';

// STYLE
import { BackLink, BackContainer } from './InviteAndPromote.style';

class SendInvitation extends Component {
  state = {
    emails: [],
    sendDate: Date.now(),
  };

  componentDidMount() {
    const { sessionDetails } = this.props;
    const { participantsEmails } = sessionDetails;
    const emails = [];

    // eslint-disable-next-line array-callback-return
    participantsEmails.map(email => {
      if (email.status === 'new' || email.status === 'sent') {
        emails.push({ email: email.email, status: email.status });
      }
    });
    this.setState({ emails });
  }

  onFormSubmit = event => {
    event.preventDefault();
    const { emails, sendDate } = this.state;
    const {
      sessionDetails,
      sendEmailInvitation: sendEmailInvitationActionCreator,
    } = this.props;

    const {
      date,
      type,
      // array of trainers object
      trainers: trainersArray,
      region,
      _id,
      startTime,
      endTime,
      shortId,
      address,
    } = sessionDetails;
    const confirmedEmails = sessionDetails.participantsEmails.filter(
      item => item.status === 'confirmed'
    );
    const trainers = trainersArray
      .map(trainer => {
        return trainer.name;
      })
      .join(' & ');

    // send participantsEmails + date.now +session details form props + registration link
    const InviteData = {
      _id,
      recipients: emails,
      sendDate,
      sessionDate: date,
      sessionType: type,
      // string of trainers' names
      trainers,
      region,
      startTime,
      endTime,
      shortId,
      address,
      confirmedEmails,
    };
    sendEmailInvitationActionCreator(InviteData);
  };

  render() {
    const { emails } = this.state;
    const { onClose, sessionDetails, name, handleAddEmailsClick } = this.props;
    if (!emails) {
      return <h3>No emails to sent</h3>;
    }
    return (
      <>
        <BackContainer>
          <BackLink onClick={onClose}>{`< Back`}</BackLink>
        </BackContainer>

        <EditEmail
          participantEmails={sessionDetails.participantsEmails}
          // registration == invitation
          type="registration"
          trainer={name}
          sessionDate={sessionDetails.date}
          sessionType={sessionDetails.type}
          address={sessionDetails.address}
          trainers={sessionDetails.trainers.map(item => item.name).join(' & ')}
          startTime={sessionDetails.startTime}
          endTime={sessionDetails.endTime}
          shortId={sessionDetails.shortId}
          sessionId={sessionDetails._id}
          extraInfo="extraInfo"
          backCallback={onClose}
          handleAddEmailsClick={handleAddEmailsClick}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  sessionDetails: state.sessions.sessionDetails[0],
  loading: state.session.loading,
  name: state.auth.name,
});

export default connect(
  mapStateToProps,
  { sendEmailInvitation }
)(SendInvitation);
