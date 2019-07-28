import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';
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
} from './InviteAndPromote.style';

const { Option } = Select;

class SendInvitation extends Component {
  state = {
    participantsEmails: [],
    sendingDate: Date.now(),
  };

  componentDidMount() {
    const { sessionDetails } = this.props;
    const { participantsEmails } = sessionDetails;

    const emails = participantsEmails.map(email => {
      return email.email;
    });
    this.setState({ participantsEmails: emails });
  }

  onEmailChange = value => {
    this.setState({
      participantsEmails: value,
    });
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { participantsEmails, sendingDate } = this.state;
    const {
      sessionDetails,
      SendEmailInvitation: SendEmailInvitationActionCreator,
    } = this.props;

    const emails = participantsEmails.map(email => {
      return {
        email: email.email,
        status: 'sent',
      };
    });

    const {
      date,
      type,
      trainers,
      region,
      _id,
      startTime,
      endTime,
      shortId,
    } = sessionDetails;

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
    };
    console.log(InviteData);
    SendEmailInvitationActionCreator(InviteData);
  };

  render() {
    const { participantsEmails } = this.state;
    const { onEmailChange, onFormSubmit } = this;
    const { onClose } = this.props;

    return (
      <InviteSectionWrapper>
        <Header type="view" label="Invite" />
        <BackContainer>
          <BackLink onClick={onClose}>{`< Back`}</BackLink>
        </BackContainer>
        <Form>
          <InputDiv>
            <Select
              mode="tags"
              size="large"
              placeholder="emails"
              onChange={onEmailChange}
              defaultValue={participantsEmails && participantsEmails[0]}
              style={{ width: '100%', height: '100%' }}
            >
              {participantsEmails &&
                participantsEmails.map(email => (
                  <Option key={email} value={email}>
                    {email}
                  </Option>
                ))}
            </Select>
          </InputDiv>
          <InputDiv>
            <Button
              onClick={onFormSubmit}
              type="primary"
              label="Send invitation"
              height="40px"
              width="100%"
            />
          </InputDiv>
        </Form>
      </InviteSectionWrapper>
    );
  }
}

const mapStateToProps = state => ({
  sessionDetails: state.sessions.sessionDetails[0],
});

export default connect(
  mapStateToProps,
  { SendEmailInvitation }
)(SendInvitation);
