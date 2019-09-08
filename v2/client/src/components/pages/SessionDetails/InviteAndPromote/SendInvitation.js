import React, { Component } from 'react';
import { connect } from 'react-redux';

// COMMON COMPONENTS
import EditEmail from '../../../common/EditEmail';

class SendInvitation extends Component {
  state = {
    participantsEmails: [],
  };

  componentDidMount() {
    const { sessionDetails } = this.props;
    const { participantsEmails } = sessionDetails;
    const emails = [];

    participantsEmails.forEach(email => {
      if (email.status === 'new' || email.status === 'sent') {
        emails.push({ email: email.email, status: email.status });
      }
    });

    this.setState({ participantsEmails: emails });
  }

  render() {
    const { participantsEmails } = this.state;
    const { onClose, sessionDetails, name, handleAddEmailsClick } = this.props;

    return (
      <>
        <EditEmail
          participantEmails={participantsEmails}
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
