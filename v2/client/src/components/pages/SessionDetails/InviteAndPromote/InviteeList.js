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
    isSubmmiting: false,
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
    const {
      updateSentEmails: updateSentEmailsActionCreator,
      sessionDetails,
    } = this.props;

    const { _id: sessionId } = sessionDetails;

    try {
      this.setState({ isSubmmiting: true });
      await updateSentEmailsActionCreator({
        sessionId,
        inviteesEmailsList,
        newEmails,
        deletedEmails,
        sendByEmail,
      });
      this.setState({ isSubmmiting: false });
    } catch (err) {
      console.log('err', err);
      this.setState({ isSubmmiting: false });
    }
  };

  render() {
    const { err } = this.state;
    const { onUpdateEmailsChange, onFormSubmit } = this;
    const { inviteesEmailsList, emails, isSubmmiting } = this.state;

    if (!inviteesEmailsList) {
      return <Spin />;
    }

    return (
      <InviteSectionWrapper>
        <Header type="view" label="Invitee List" />
        <BackContainer>
          <BackLink onClick={history.goBack}>{`< Back`}</BackLink>
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
              onClick={onFormSubmit}
              type="primary"
              label="Update"
              height="40px"
              width="100%"
              disabled={isSubmmiting}
            />
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
  };
};

export default connect(
  mapStateToProps,
  { fetchSessionDetails, updateSentEmails }
)(InviteeList);
