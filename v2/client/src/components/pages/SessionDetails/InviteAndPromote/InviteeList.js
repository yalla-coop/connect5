/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Checkbox } from 'antd';
import history from '../../../../history';
import { fetchSessionDetails } from '../../../../actions/groupSessionsAction';
import { updateSentEmails } from '../../../../actions/InviteAndPromoteAction';
// import { pattern } from '../../../../constants/regex';
// ANTD COMPONENTS

// COMMON COMPONENTS
import Spin from '../../../common/Spin';
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

class InviteeList extends Component {
  state = {
    sendByEmail: false,
    sendingDate: Date.now(),
    err: '',
    inviteesEmailsList: [],
    emails: [],
    newEmails: [],
    deletedEmails: [],
  };

  componentDidMount() {
    const { inviteesEmailsList } = this.props;
    const emailsString = inviteesEmailsList.map(emailObj => emailObj.email);

    this.setState({
      inviteesEmailsList,
      emails: emailsString,
    });
  }

  onUpdateEmailsChange = values => {
    const {
      emails,
      deletedEmails: oldDeletedEmails,
      newEmails: prevNewEmails,
    } = this.state;

    const deletedEmails = [...oldDeletedEmails];
    let newEmails = [...prevNewEmails];
    if (values.length < emails.length) {
      emails.forEach(email => {
        if (!values.includes(email)) {
          if (!newEmails.includes(email)) {
            deletedEmails.push(email);
          } else {
            newEmails = newEmails.filter(newEmail => newEmail !== email);
          }
        }
      });

      this.setState({ emails: values, deletedEmails, newEmails });
    } else if (values.length > emails.length) {
      values.forEach(val => {
        if (!emails.includes(val)) {
          newEmails.push(val);
        }
      });
      this.setState({ emails: values, newEmails });
    }
  };

  onCheckboxChange = e => {
    this.setState({ sendByEmail: e.target.checked });
  };

  onFormSubmit = async e => {
    e.preventDefault();
    const {
      inviteesEmailsList,
      sendByEmail,
      newEmails,
      deletedEmails,
    } = this.state;

    this.setState({ err: '' });

    if (sendByEmail && newEmails.length === 0) {
      return this.setState({
        err: 'You must insert a new email to send a message',
      });
    }
    const {
      updateSentEmails: updateSentEmailsActionCreator,
      sessionDetails,
    } = this.props;

    const { _id: sessionId } = sessionDetails;

    try {
      await updateSentEmailsActionCreator({
        sessionId,
        inviteesEmailsList,
        newEmails,
        deletedEmails,
        sendByEmail,
      });
      // this.props.onClose();
    } catch (err) {
      console.log('err', err);
    }
  };

  render() {
    const { err } = this.state;
    const { onUpdateEmailsChange, onFormSubmit } = this;
    const { inviteesEmailsList, emails } = this.state;
    const { loading, onClose } = this.props;

    if (!inviteesEmailsList) {
      return <Spin />;
    }

    return (
      <InviteSectionWrapper>
        <Header type="view" label="Invitee List" />
        <BackContainer>
          <BackLink onClick={onClose}>{`< Back`}</BackLink>
        </BackContainer>
        <Form>
          <InputDiv>
            <Select
              mode="tags"
              size="large"
              placeholder="emails"
              onChange={onUpdateEmailsChange}
              value={emails}
              style={{ width: '100%', height: '100%' }}
            >
              {inviteesEmailsList &&
                inviteesEmailsList.map(obj => (
                  <Option key={obj.email} value={obj.email}>
                    {obj.email}
                  </Option>
                ))}
            </Select>
          </InputDiv>
          <div>{err}</div>
          <InputDiv>
            <Checkbox onChange={this.onCheckboxChange}>
              Email invitation to new emails I have just added
            </Checkbox>
          </InputDiv>
          <InputDiv>
            <Button
              type="primary"
              style={{
                width: '100%',
                marginTop: '2rem',
                fontSize: '19px',
                fontWeight: 'bold',
                padding: '0.5rem 1rem',
                height: 'auto',
              }}
              onClick={onFormSubmit}
              disabled={loading}
              loading={loading}
              label="Update"
            >
              Update
            </Button>
          </InputDiv>
        </Form>
      </InviteSectionWrapper>
    );
  }
}

const mapStateToProps = state => {
  const {
    sessionDetails: [sessionDetails],
  } = state.sessions;
  const inviteesEmailsList = sessionDetails.participantsEmails.filter(email => {
    return email.status === 'new' || email.status === 'sent';
  });
  return {
    sessionDetails: state.sessions.sessionDetails[0],
    inviteesEmailsList,
    loading: state.session.loading,
  };
};

export default connect(
  mapStateToProps,
  { fetchSessionDetails, updateSentEmails }
)(InviteeList);
