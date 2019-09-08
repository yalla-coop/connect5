import React, { Component } from 'react';
import { connect } from 'react-redux';

// COMMON COMPONENTS
import EditEmail from '../../../common/EditEmail';

class SendInvitation extends Component {
  state = {};

  render() {
    const { onClose, sessionDetails, name, handleAddEmailsClick } = this.props;

    const emails = [];

    sessionDetails.participantsEmails.forEach(email => {
      if (email.status === 'new' || email.status === 'sent') {
        emails.push({ email: email.email, status: email.status });
      }
    });
    return (
      <>
        <EditEmail
          participantsEmails={emails}
          // registration == invitation
          type="registration"
          trainer={name}
          sessionDate={sessionDetails.date}
          sessionType={sessionDetails.type}
          address={sessionDetails.address}
          trainers={sessionDetails.trainers}
          startTime={sessionDetails.startTime}
          endTime={sessionDetails.endTime}
          shortId={sessionDetails.shortId}
          sessionId={sessionDetails._id}
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
  {}
)(SendInvitation);
