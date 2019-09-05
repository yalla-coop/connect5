import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';

// ANTD COMPONENTS
import { Select, message, Tooltip, Button as AntButton, Modal } from 'antd';
// Actions
import { fetchSessionDetails } from '../../../../actions/groupSessionsAction';
import { updateSessionAttendeesList } from '../../../../actions/sessionAction';

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

const emailSchema = Yup.string()
  .email()
  .required();

class InviteeList extends Component {
  state = {
    err: '',
    focused: false,
  };

  componentDidMount() {
    const { inviteesEmailsList } = this.props;
    const participantsEmails = inviteesEmailsList.map(
      emailObj => emailObj.email
    );

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
      participantsEmails,
    });
  }

  componentWillUnmount() {
    document.removeEventListener('paste', this.pasteEmails);
  }

  pasteEmails = event => {
    const { focused, participantsEmails } = this.state;

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
        .filter(item => !participantsEmails.includes(item));

      this.onUpdateEmailsChange([...participantsEmails, ...emailsArray]);
    }
  };

  onCopy = () => {
    const { participantsEmails } = this.state;

    if (participantsEmails.length) {
      navigator.clipboard.writeText(participantsEmails.join(';'));
      message.success('Copied');
    }
  };

  onClear = () => {
    this.setState({ participantsEmails: [] });
    this.onUpdateEmailsChange([]);
  };

  onSelectBlur = () => {
    this.setState({ focused: false });
  };

  onSelectFocus = () => {
    this.setState({ focused: true });
  };

  onUpdateEmailsChange = values => {
    const validEmails = [];

    values.forEach(item => {
      if (!validEmails.some(_item => _item === item)) {
        try {
          const validEmail = emailSchema.validateSync(item);

          if (validEmail) {
            validEmails.push(item);
          }
        } catch (err) {
          Modal.error({
            title: 'Invalid!',
            content: err.errors[0],
          });
        }
      }
    });

    this.setState({ participantsEmails: validEmails });
  };

  onFormSubmit = e => {
    e.preventDefault();
    const { participantsEmails } = this.state;

    this.setState({ err: '' });

    const {
      updateSessionAttendeesList: updateSessionAttendeesListAction,
      sessionDetails,
    } = this.props;

    const { _id: sessionId } = sessionDetails;

    return updateSessionAttendeesListAction({
      sessionId,
      participantsEmails: participantsEmails.map(item => ({
        email: item,
        status: 'new',
      })),
      status: 'new',
      isPartial: false,
    });
  };

  render() {
    const { err } = this.state;
    const { onUpdateEmailsChange, onFormSubmit } = this;
    const { participantsEmails } = this.state;
    const { loading, onClose } = this.props;

    if (!participantsEmails) {
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
                      disabled={!participantsEmails.length}
                    />
                  </Tooltip>
                  <Tooltip placement="top" title="Delete">
                    <AntButton
                      type="danger"
                      icon="delete"
                      ghost
                      onClick={this.onClear}
                      disabled={!participantsEmails.length}
                    />
                  </Tooltip>
                </IconsWrapper>
                <Select
                  mode="tags"
                  size="large"
                  placeholder="emails"
                  onChange={onUpdateEmailsChange}
                  value={participantsEmails}
                  style={{ width: '100%', height: '100%' }}
                  onBlur={this.onSelectBlur}
                  onFocus={this.onSelectFocus}
                >
                  {participantsEmails &&
                    participantsEmails.map(email => (
                      <Option key={email} value={email}>
                        {email}
                      </Option>
                    ))}
                </Select>
              </SelecetWrapper>
            </InputDiv>
            <div>{err}</div>

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
  { fetchSessionDetails, updateSessionAttendeesList }
)(InviteeList);
