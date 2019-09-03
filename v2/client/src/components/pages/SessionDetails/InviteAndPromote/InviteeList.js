/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Checkbox, message, Tooltip, Button as AntButton } from 'antd';
import { fetchSessionDetails } from '../../../../actions/groupSessionsAction';
import { updateSentEmails } from '../../../../actions/InviteAndPromoteAction';
// import { pattern } from '../../../../constants/regex';
// ANTD COMPONENTS

// COMMON COMPONENTS
import Spin from '../../../common/Spin';
import Header from '../../../common/Header';
import Button from '../../../common/Button';

import { SelecetWrapper, IconsWrapper } from '../SessionDetails.Style';

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
    focused: false,
  };

  componentDidMount() {
    const { inviteesEmailsList } = this.props;
    const emailsString = inviteesEmailsList.map(emailObj => emailObj.email);

    let dT = null;
    try {
      dT = new DataTransfer();
    } catch (e) {
      // ignore the error
    }
    const evt = new ClipboardEvent('paste', { clipboardData: dT });
    (evt.clipboardData || window.clipboardData).setData('text/plain', '');

    document.addEventListener('paste', this.pasteEmails);

    document.dispatchEvent(evt);

    this.setState({
      inviteesEmailsList,
      emails: emailsString,
    });
  }

  componentWillUnmount() {
    document.removeEventListener('paste', this.pasteEmails);
  }

  pasteEmails = event => {
    const { focused, emails } = this.state;

    let emailsArray;

    if (focused) {
      event.preventDefault();
      const pastedString = event.clipboardData.getData('text/plain');
      const splittedEmails = pastedString.split(';');
      if (pastedString === splittedEmails) {
        emailsArray = pastedString.split(';');
      }
      emailsArray = splittedEmails
        .map(item => item.trim())
        .filter(item => !emails.includes(item));

      this.onUpdateEmailsChange([...emails, ...emailsArray]);
    }
  };

  onCopy = () => {
    const { emails } = this.state;

    if (emails.length) {
      navigator.clipboard.writeText(emails.join(';'));
      message.success('Copied');
    }
  };

  onClear = () => {
    this.setState({ emails: [] });
    this.onUpdateEmailsChange([]);
  };

  onSelectBlur = () => {
    this.setState({ focused: false });
  };

  onSelectFocus = () => {
    this.setState({ focused: true });
  };

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

  onFormSubmit = e => {
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

    const { _id: sessionId, address } = sessionDetails;

    return updateSentEmailsActionCreator({
      sessionId,
      inviteesEmailsList,
      newEmails,
      deletedEmails,
      sendByEmail,
      address,
    });
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
      <>
        <BackContainer>
          <BackLink onClick={onClose}>{`< Back`}</BackLink>
        </BackContainer>
        <InviteSectionWrapper>
          <Header type="view" label="Invitee List" />
          <Form>
            <InputDiv>
              <SelecetWrapper>
                <IconsWrapper>
                  <Tooltip placement="top" title="Copy">
                    <AntButton
                      type="primary"
                      icon="copy"
                      ghost
                      onClick={this.onCopy}
                      disabled={!emails.length}
                    />
                  </Tooltip>
                  <Tooltip placement="top" title="Delete">
                    <AntButton
                      type="danger"
                      icon="delete"
                      ghost
                      onClick={this.onClear}
                      disabled={!emails.length}
                    />
                  </Tooltip>
                </IconsWrapper>
                <Select
                  mode="tags"
                  size="large"
                  placeholder="emails"
                  onChange={onUpdateEmailsChange}
                  value={emails}
                  style={{ width: '100%', height: '100%' }}
                  onBlur={this.onSelectBlur}
                  onFocus={this.onSelectFocus}
                >
                  {inviteesEmailsList &&
                    inviteesEmailsList.map(obj => (
                      <Option key={obj.email} value={obj.email}>
                        {obj.email}
                      </Option>
                    ))}
                </Select>
              </SelecetWrapper>
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
      </>
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
