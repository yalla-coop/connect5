import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SendEmailInvitation } from '../../../../actions/InviteAndPromoteAction';

// COMMON COMPONENTS
import Header from '../../../common/Header';
import Button from '../../../common/Button';

// STYLE
import {
  InviteSectionWrapper,
  BackLink,
  BackContainer,
  Form,
  InputDiv,
  EmailsList,
} from './InviteAndPromote.style';

class SendInvitation extends Component {
  state = {
    emails: [],
    sendingDate: Date.now(),
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
    const { emails, sendingDate } = this.state;
    const {
      sessionDetails,
      SendEmailInvitation: SendEmailInvitationActionCreator,
    } = this.props;

    const {
      date,
      type,
      trainers,
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
    const trainerName = trainers
      .map(trainer => {
        return trainer.name;
      })
      .join(' & ');

    // send participantsEmails + date.now +session details form props + registration link
    const InviteData = {
      _id,
      emails,
      sendingDate,
      date,
      type,
      trainerName,
      region,
      startTime,
      endTime,
      shortId,
      address,
      confirmedEmails,
    };
    SendEmailInvitationActionCreator(InviteData);
  };

  render() {
    const { emails } = this.state;
    const { onFormSubmit } = this;
    const { onClose, loading } = this.props;
    if (!emails) {
      return <h3>No emails to sent</h3>;
    }
    return (
      <>
        <BackContainer>
          <BackLink onClick={onClose}>{`< Back`}</BackLink>
        </BackContainer>
        <InviteSectionWrapper>
          <Header type="view" label="Invite" />
          <Form>
            <EmailsList>
              {emails &&
                emails.map(email => <p key={email.email}>{email.email}</p>)}
            </EmailsList>

            <InputDiv>
              <Button
                onClick={onFormSubmit}
                type="primary"
                label="Send invitation"
                height="40px"
                width="100%"
                loading={loading}
                disabled={loading}
              />
            </InputDiv>
          </Form>
        </InviteSectionWrapper>
      </>
    );
  }
}

const mapStateToProps = state => ({
  sessionDetails: state.sessions.sessionDetails[0],
  loading: state.session.loading,
});

export default connect(
  mapStateToProps,
  { SendEmailInvitation }
)(SendInvitation);
