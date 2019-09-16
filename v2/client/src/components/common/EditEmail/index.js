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
  Collapse,
  Checkbox,
  Row,
  Col,
  DatePicker,
  TimePicker,
} from 'antd';
import moment from 'moment';
import 'moment-timezone';
import Swal from 'sweetalert2';

import { connect } from 'react-redux';
import * as Yup from 'yup';

import { getPostSurveyLink, getPreSurveyLink } from '../../../helpers';

import { MY_SESSIONS_URL } from '../../../constants/navigationRoutes';
import Header from '../Header';
import InfoPopUp from '../InfoPopup';

import history from '../../../history';

import EmailTemplate from '../EmailTemplate';
import Button from '../Button';

import {
  sendEmailReminder as sendEmailReminderAction,
  scheduleNewEmail as scheduleNewEmailAction,
} from '../../../actions/sessionAction';

import {
  Wrapper,
  SuccessMessageDiv,
  SubHeader,
  StyledLink,
  Paragraph,
  Label,
  SelecetWrapper,
  IconsWrapper,
  AddEmailsButton,
  BackLink,
} from './EditEmail.style';

import('moment-timezone');

const format = 'HH:mm';

const customPanelStyle = {
  // background: '#f7f7f7',
  background: '#fff',
  borderRadius: 4,
  // marginBottom: 24,
  border: 0,
  overflow: 'hidden',
  padding: '0.5rem',
};

const { Panel } = Collapse;

const defaultCheckedList = ['Apple', 'Orange'];

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
    // plain text if canAddParticipants = true
    // {email, status} if canAddParticipants = false
    participantsEmails: [],
    checkedList: defaultCheckedList,
    indeterminateAll: false,
    isAllChecked: true,
    isNewChecked: true,
  };

  topElementRef = React.createRef();

  componentDidMount() {
    const {
      participantsEmails,
      canAddParticipants,
      sessionType,
      shortId,
      trainers: trainersArrayOfObject,
    } = this.props;

    const preSurveyLink = getPreSurveyLink(sessionType, shortId);
    const postSurveyLink = getPostSurveyLink(sessionType, shortId);

    const trainers = trainersArrayOfObject
      .map(
        trainer => `${trainer.name[0].toUpperCase()}${trainer.name.slice(1)}`
      )
      .join(' & ');

    // set emails into state
    const plainAllEmails = participantsEmails.map(item => item.email);
    const plainNewEmails = participantsEmails
      .filter(item => item.status === 'new')
      .map(item => item.email);

    // plain text if canAddParticipants = true
    // {email, status} if canAddParticipants = false
    let newparticipantsEmails;

    if (canAddParticipants) {
      newparticipantsEmails = plainAllEmails;
    } else {
      newparticipantsEmails = participantsEmails;
    }
    this.setState({
      participantsEmails: newparticipantsEmails,
      plainAllEmails,
      plainNewEmails,
      checkedList: plainAllEmails,
      preSurveyLink,
      postSurveyLink,
      trainers,
    });

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
  }

  componentWillUnmount() {
    document.removeEventListener('paste', this.pasteEmails);
  }

  toggleEditView = visible => {
    this.setState({ isEditView: visible });
    const drawerWrapper = document.querySelector('.ant-drawer-wrapper-body');
    if (drawerWrapper) {
      drawerWrapper.scrollBy(-1000, -1000);
    } else {
      window.scrollBy(-1000, -1000);
    }
  };

  handleExtraInformation = e => {
    const { value } = e.target;
    this.setState({ extraInformation: value });
  };

  handleUpdateEmails = values => {
    const validEmails = [];

    values.forEach(email => {
      if (!validEmails.some(_item => _item === email)) {
        try {
          const validEmail = emailSchema.validateSync(email);
          if (validEmail) {
            validEmails.push(email);
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

  handleSendEmail = () => {
    const {
      extraInformation,
      checkedList,
      participantsEmails,
      trainers,
    } = this.state;

    const {
      sessionId,
      sessionDate,
      sessionType,
      startTime,
      endTime,
      shortId,
      address,
      sendEmailReminder,
      type,
      canAddParticipants,
      // trainer name
      name,
    } = this.props;

    const emailsToSend = canAddParticipants ? participantsEmails : checkedList;
    if (emailsToSend.length < 1) {
      return message.error('You should add recipients emails');
    }
    const emailData = {
      sessionId,
      // should be sent plain
      recipients: emailsToSend,
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
      type,
      trainer: `${name[0].toUpperCase()}${name.slice(1)}`,
    };

    return sendEmailReminder(emailData, this.done);
  };

  done = () => {
    const { backCallback } = this.props;

    Modal.success({
      title: 'Done!',
      content: 'Emails have been sent successfully',
      onOk: () => {
        if (typeof backCallback === 'function') return backCallback();
        return history.push(MY_SESSIONS_URL);
      },
    });
  };

  onSelectBlur = () => {
    this.setState({ focused: false });
  };

  onSelectFocus = () => {
    this.setState({ focused: true });
  };

  onCopy = () => {
    const { participantsEmails } = this.state;

    if (participantsEmails.length) {
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
    const { focused, participantsEmails } = this.state;

    let emailsArray;

    if (focused) {
      event.preventDefault();
      const pastedString = event.clipboardData.getData('text/plain');
      // split on "," & ";" and " "
      const splittedEmails = pastedString.split(/[, ;]/);

      emailsArray = splittedEmails
        .filter(item => !!item)
        .map(item => item.trim());

      this.handleUpdateEmails([...participantsEmails, ...emailsArray]);
    }
  };

  // to handle individual emails checkboxes changes
  onChangeCheckbox = checkedList => {
    const { plainAllEmails, plainNewEmails } = this.state;
    const isAllChecked = checkedList.length === plainAllEmails.length;
    const isNewChecked =
      plainNewEmails.length > 0 &&
      checkedList.length > 0 &&
      plainNewEmails.every(item => checkedList.includes(item));

    this.setState({
      checkedList,
      indeterminateAll:
        !!checkedList.length && checkedList.length < plainAllEmails.length,
      isAllChecked,
      isNewChecked,
    });
  };

  // to handle toggle the checkbox for "seslect all" checbox
  onCheckAllChange = e => {
    const { plainAllEmails } = this.state;

    this.setState({
      checkedList: e.target.checked ? plainAllEmails : [],
      indeterminateAll: false,
      isAllChecked: e.target.checked,
      isNewChecked: e.target.checked,
    });
  };

  // to handle toggle the checkbox for "seslect new" checbox
  onCheckNewChange = e => {
    const { plainNewEmails } = this.state;

    this.setState({
      checkedList: e.target.checked ? plainNewEmails : [],
      isNewChecked: e.target.checked,
      isAllChecked: false,
    });
  };

  handleSelectDate = (date, dateString) => {
    this.setState({ scheduledDate: dateString });
  };

  handleSelectTime = (time, timeString) => {
    this.setState({ selectedTime: timeString });
  };

  handleSubmitSchedule = () => {
    const {
      scheduledDate,
      selectedTime,
      extraInformation,
      checkedList,
    } = this.state;
    const { scheduleNewEmail, sessionId, surveyType } = this.props;
    if (scheduledDate && selectedTime) {
      const date = moment(`${scheduledDate} ${selectedTime}`);
      scheduleNewEmail(
        {
          date,
          sessionId,
          surveyType,
          extraInformation,
          recipients: checkedList,
        },
        this.handleCloseDrawer
      );
    } else {
      this.setState({ error: 'Select schedule date and time' });
    }
  };

  handleAddEmailsClick = () => {
    const { handleAddEmailsClick, type, drawerKey } = this.props;
    switch (type) {
      case 'registration':
        return handleAddEmailsClick('view-invitees', drawerKey);

      case 'reminder':
      case 'surveyLink':
        return handleAddEmailsClick('viewAttendeesList', drawerKey);

      default:
        return null;
    }
  };

  copyRegistrationLink = () => {
    const copyText = document.getElementById('registration-link');
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
      Swal.fire({
        title: 'Success',
        text: 'Link copied!',
        type: 'success',
        timer: 2000,
        confirmButtonText: 'Ok',
      });
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: 'Unable to cop the Link',
        type: 'error',
        timer: 2000,
        confirmButtonText: 'Ok',
      });
    }
  };

  render() {
    const {
      successMessage,
      sessionId,
      loading,
      // Boolean
      canAddParticipants,
      // registration
      shortId,

      // template details
      type,
      trainer,
      sessionDate,
      sessionType,
      address,
      startTime,
      endTime,
      backCallback,
      isSchedule,
    } = this.props;

    const {
      isEditView,
      extraInformation,
      participantsEmails,
      checkedList,
      indeterminateAll,
      isAllChecked,
      isNewChecked,
      preSurveyLink,
      postSurveyLink,
      error,
      trainers,
    } = this.state;
    return (
      <>
        <div ref={this.myRef} />
        <Header label="Edit Session" type="view" />
        <Wrapper>
          <BackLink onClick={history.goBack}>{`< Back`}</BackLink>
          {isEditView ? (
            <>
              <SubHeader>Extra information:</SubHeader>
              <Paragraph>
                Write below any extra information you would like to add to the
                email before you send out
              </Paragraph>
              <TextArea
                placeholder="Type here extra information to be sent in the email"
                autosize={{ minRows: 4, maxRows: 6 }}
                style={{ marginBottom: '20px' }}
                onChange={this.handleExtraInformation}
                value={extraInformation}
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
              {successMessage && (
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
              )}
              {type === 'registration' && (
                <>
                  <SubHeader>Registration Link:</SubHeader>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <StyledLink
                      id="registration-link"
                      to={`/confirm/${shortId}`}
                    >{`${window.location.host}/confirm/${shortId}`}</StyledLink>
                    <div style={{ cursor: 'pointer' }}>
                      <Icon
                        type="copy"
                        onClick={this.copyRegistrationLink}
                        style={{ color: '#5965fe' }}
                      />
                    </div>
                  </div>
                  <Paragraph>
                    Copy the link above to share with potential participants so
                    they can register and let you know about any special
                    requirements.
                  </Paragraph>
                </>
              )}
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
                  {canAddParticipants && (
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
                  )}

                  {isSchedule && (
                    <div
                      style={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                      }}
                    >
                      <DatePicker
                        onChange={this.handleSelectDate}
                        placeholder="Select date"
                        size="large"
                        style={{ width: '60%', marginBottom: '1rem' }}
                      />
                      <TimePicker
                        onChange={this.handleSelectTime}
                        style={{ width: '35%', marginBottom: '1rem' }}
                        format={format}
                        minuteStep="60"
                        size="large"
                      />
                    </div>
                  )}

                  <Label>Email addresses:</Label>
                  {canAddParticipants ? (
                    <>
                      <Select
                        mode="tags"
                        id="participantsEmails"
                        // get emails string array
                        value={participantsEmails}
                        placeholder="Type or paste the email addresses here"
                        onChange={this.handleUpdateEmails}
                        style={{ width: '100%' }}
                        size="large"
                        onBlur={this.onSelectBlur}
                        onFocus={this.onSelectFocus}
                      >
                        {participantsEmails.map(email => (
                          <Option value={email} key={email}>
                            {email}
                          </Option>
                        ))}
                      </Select>
                      <div
                        id="emails"
                        style={{
                          opacity: '0',
                          position: 'absolute',
                          width: '0',
                          hieght: '0',
                          // to prevent Y scroll
                          left: '-100000rem',
                        }}
                      >
                        {participantsEmails && participantsEmails.join(';')}
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ width: '100%' }}>
                        <Collapse
                          bordered={false}
                          defaultActiveKey={['1']}
                          expandIcon={({ isActive }) => (
                            <Icon
                              type="caret-right"
                              rotate={isActive ? 90 : 0}
                            />
                          )}
                          style={{ border: '2px solid' }}
                          expandIconPosition="right"
                        >
                          <Panel
                            header={<div>Select from your invitees list</div>}
                            key="1"
                            style={customPanelStyle}
                          >
                            <div
                              style={{
                                borderBottom: '1px solid #E9E9E9',
                                display: 'flex',
                                width: '100%',
                                justifyContent: 'space-between',
                              }}
                            >
                              <Checkbox
                                indeterminate={indeterminateAll}
                                onChange={this.onCheckAllChange}
                                checked={isAllChecked}
                              >
                                Select all
                              </Checkbox>
                              {type === 'registration' && (
                                <Checkbox
                                  onChange={this.onCheckNewChange}
                                  checked={isNewChecked}
                                >
                                  Select New
                                </Checkbox>
                              )}
                            </div>
                            <br />

                            <Checkbox.Group
                              style={{ width: '100%' }}
                              onChange={this.onChangeCheckbox}
                              value={checkedList}
                            >
                              <Row id="selectGroup">
                                {participantsEmails.map(item => (
                                  <Col
                                    span={24}
                                    style={{ marginBottom: '0.5rem' }}
                                    key={item.email}
                                  >
                                    <Checkbox value={item.email}>
                                      <span
                                        style={{
                                          width: '80%',
                                          display: 'inline-flex',
                                          justifyContent: 'space-between',
                                        }}
                                      >
                                        {item.email}
                                        <span>{item.status}</span>
                                      </span>
                                    </Checkbox>
                                  </Col>
                                ))}
                              </Row>
                            </Checkbox.Group>
                            <div
                              style={{
                                width: '90%',
                                borderTop: '1px solid #E9E9E9',
                                margin: '0.5rem auto',
                              }}
                            >
                              <AddEmailsButton
                                onClick={this.handleAddEmailsClick}
                              >
                                Add new email(s)
                              </AddEmailsButton>
                            </div>
                          </Panel>
                        </Collapse>
                      </div>
                    </>
                  )}
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
              preSurveyLink={preSurveyLink}
              postSurveyLink={postSurveyLink}
              confirmLink={`${window.location.host}/confirm/${shortId}`}
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
                onClick={
                  isSchedule ? this.handleSubmitSchedule : this.handleSendEmail
                }
                type="primary"
                label={isSchedule ? 'Schedule Email' : 'Send Email'}
                height="40px"
                width="100%"
                style={{ marginBottom: '1.5rem' }}
                loading={loading}
              />
              <BackLink onClick={() => history.push(MY_SESSIONS_URL)}>
              Invite people later and go back to session overview
              </BackLink>
              {error}
              {isEditView && (
                <SubHeader
                  as="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    margin: '0 auto 2rem',
                  }}
                  onClick={() => {
                    if (typeof backCallback === 'function')
                      return backCallback();
                    return history.push(MY_SESSIONS_URL);
                  }}
                >
                  Skip and view my session
                </SubHeader>
              )}
            </div>
          )}
        </Wrapper>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.auth.name,
    loading: state.loading.sendEmail,
  };
};

export default connect(
  mapStateToProps,
  {
    sendEmailReminder: sendEmailReminderAction,
    scheduleNewEmail: scheduleNewEmailAction,
  }
)(EditEmail);
