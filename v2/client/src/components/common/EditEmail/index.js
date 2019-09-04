import React, { Component } from 'react';
import {
  Alert,
  Select,
  Icon,
  Input,
  Modal,
  message,
  Tooltip,
  Button as AntButton,
} from 'antd';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import { MY_SESSIONS_URL } from '../../../constants/navigationRoutes';
import Header from '../Header';
import InfoPopUp from '../InfoPopup';

import history from '../../../history';

import EmailTemplate from '../EmailTemplate';
import Button from '../Button';

import { sendEmailInvitation as sendEmailInvitationAction } from '../../../actions/InviteAndPromoteAction';

import {
  Wrapper,
  SuccessMessageDiv,
  SubHeader,
  StyledLink,
  Paragraph,
  Label,
  SelecetWrapper,
  IconsWrapper,
} from './EditEmail.style';

const emailSchema = Yup.string()
  .email()
  .required();

const { TextArea } = Input;

const { Option } = Select;
const details =
  'Email addresses of invitees can be either added one by one or copied from a list separated by commas, spaces etc. This list is not required to set up sessions. It can be created/updated in continuation.';

class EditEmail extends Component {
  state = {
    isEditView: false,
    participantEmails: [],
  };

  componentDidMount() {
    window.scrollBy(-1000, -1000);
    const { participantEmails } = this.props;
    this.setState({ participantEmails });
  }

  componentWillUnmount() {
    document.removeEventListener('paste', this.pasteEmails);
  }

  toggleEditView = visible => {
    this.setState({ isEditView: visible });
  };

  handleExtraInformation = e => {
    const { value } = e.target;
    this.setState({ extraInformation: value });
  };

  handleUpdateEmails = values => {
    const validEmails = [];
    values.forEach(item => {
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
    });
    this.setState({ participantEmails: validEmails });
  };

  handleSendEmail = () => {
    const { participantEmails, extraInformation } = this.state;
    const {
      sessionId: _id,
      sessionDate,
      sessionType,
      trainers,
      startTime,
      endTime,
      shortId,
      address,
      sendEmailInvitation,
    } = this.props;

    const recipients = participantEmails.map(email => {
      return { email, status: 'new' };
    });

    const InviteData = {
      _id,
      recipients,
      sendDate: new Date(),
      sessionDate,
      sessionType,
      // string of trainers' names
      trainers,
      startTime,
      endTime,
      shortId,
      address,
      extraInformation,
      confirmedEmails: [],
    };

    sendEmailInvitation(InviteData, this.done);
  };

  done = () => {
    Modal.success({
      title: 'Done!',
      content: 'Invitation Email successfully sent',
      onOk: () => history.push(MY_SESSIONS_URL),
    });
  };

  onSelectBlur = () => {
    this.setState({ focused: false });
  };

  onSelectFocus = () => {
    this.setState({ focused: true });
  };

  onCopy = () => {
    const { stateEmails } = this.state;

    if (stateEmails.length) {
      const copyText = document.getElementById('emails');
      let range;
      let selection;
      if (document.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(copyText);

        range.select();
      } else if (window.getSelection) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(copyText);
        selection.removeAllRanges();
        selection.addRange(range);
      }

      try {
        document.execCommand('copy');
        message.success('copied');
      } catch (err) {
        console.log(err);
      }
    }
  };

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

      this.onEmailChange([...emails, ...emailsArray]);
    }
  };

  render() {
    window.scrollBy(-1000, -1000);
    const {
      successMessage,
      sessionId,

      // registration
      shortId,

      // template details
      type,
      trainer,
      sessionDate,
      sessionType,
      address,
      trainers,
      startTime,
      endTime,
    } = this.props;

    const { isEditView, extraInformation, participantEmails } = this.state;

    return (
      <>
        <Header label="Edit Session" type="view" />
        <Wrapper>
          {isEditView ? (
            <>
              <SubHeader>Extra information:</SubHeader>
              <Paragraph>
                Write below any extra information you would like to add to the
                email before you send out
              </Paragraph>
              <TextArea
                placeholder="Type here"
                autosize={{ minRows: 4, maxRows: 6 }}
                style={{ marginBottom: '20px' }}
                onChange={this.handleExtraInformation}
              />

              <SubHeader>Core information:</SubHeader>
              <Paragraph>
                This information cannot be edited. To make changes{' '}
                <StyledLink to={`/session-edit/${sessionId}`}>
                  click here
                </StyledLink>{' '}
                to edit the session directly.
              </Paragraph>
            </>
          ) : (
            <>
              <SuccessMessageDiv>
                <Alert
                  message={
                    <span>
                      <Icon
                        type="check-circle"
                        theme="filled"
                        style={{ color: '#52c41a', marginRight: '1rem' }}
                      />
                      {successMessage}
                    </span>
                  }
                  type="success"
                />
              </SuccessMessageDiv>
              <>
                <SubHeader>Registration Link:</SubHeader>
                <StyledLink
                  to={`/confirm/${shortId}`}
                >{`${window.location.host}/confirm/${shortId}`}</StyledLink>
                <Paragraph>
                  Copy the link above to share with potential participants so
                  they can register and let you know about any special
                  requirements.
                </Paragraph>
              </>
              <>
                <SubHeader>Invite Participants via email: </SubHeader>
                <Paragraph>
                  Send a session invite to participants via email, providing
                  them a link to register and let you know about any special
                  requirements.
                </Paragraph>
              </>
              <>
                <SelecetWrapper>
                  <IconsWrapper>
                    <Tooltip placement="top" title="Copy">
                      <AntButton
                        type="primary"
                        icon="copy"
                        ghost
                        onClick={this.onCopy}
                      />
                    </Tooltip>
                    <InfoPopUp details={details} />
                  </IconsWrapper>

                  <Label>Email addresses:</Label>

                  <Select
                    mode="tags"
                    id="participantEmails"
                    value={participantEmails}
                    placeholder="Type or paste the email addresses here"
                    onChange={this.handleUpdateEmails}
                    style={{ width: '100%' }}
                    size="large"
                    onBlur={this.onSelectBlur}
                    onFocus={this.onSelectFocus}
                  >
                    {participantEmails.map(item => (
                      <Option value={item} key={item}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </SelecetWrapper>
              </>
            </>
          )}
          <>
            <EmailTemplate
              type={type}
              trainer={trainer}
              sessionDate={sessionDate}
              sessionType={sessionType}
              address={address}
              trainers={trainers}
              startTime={startTime}
              endTime={endTime}
              extraInformation={extraInformation}
            />
          </>
          {isEditView ? (
            <Button
              onClick={() => this.toggleEditView(false)}
              type="primary"
              label="Save changes"
              height="40px"
              width="100%"
              style={{ marginBottom: '1.5rem' }}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {' '}
              <Button
                onClick={() => this.toggleEditView(true)}
                type="primary"
                label="Edit email"
                height="40px"
                width="100%"
                style={{ marginBottom: '1.5rem' }}
              />
              <Button
                onClick={this.handleSendEmail}
                type="primary"
                label="Send email"
                height="40px"
                width="100%"
                style={{ marginBottom: '1.5rem' }}
              />
              <SubHeader
                as="button"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  margin: '0 auto 2rem',
                }}
                onClick={() => {
                  history.push(MY_SESSIONS_URL);
                }}
              >
                Skip and view my session
              </SubHeader>
            </div>
          )}
        </Wrapper>
      </>
    );
  }
}

export default connect(
  null,
  { sendEmailInvitation: sendEmailInvitationAction }
)(EditEmail);
