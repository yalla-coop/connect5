/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import {
  DatePicker,
  Select,
  Input,
  TimePicker,
  Tooltip,
  Popover,
  Button as AntButton,
  message,
} from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import history from '../../../../history';
import Button from '../../../common/Button';
import InfoPopUp from '../../../common/InfoPopup';
import { fetchAllTrainers } from '../../../../actions/trainerAction';
import { fetchLocalLeads } from '../../../../actions/users';
import {
  fetchSessionDetails,
  sessionUpdateAction,
} from '../../../../actions/groupSessionsAction';
import { sessions, regions, pattern } from '../../CreateSession/options';
import {
  Form,
  InputDiv,
  SubmitBtn,
  Error,
} from '../../CreateSession/create-session.style';

import { SelecetWrapper, IconsWrapper } from '../SessionDetails.Style';

import {
  EditSessionWrapper,
  InputLabel,
  BackLink,
  BackContainer,
  EmailError,
  Label,
  LabelDiv,
} from './SessionActions.Style';

import Header from '../../../common/Header';

const { Option } = Select;

class EditSession extends Component {
  state = {
    session: '',
    startDate: null,
    inviteesNumber: '',
    region: null,
    partnerTrainer1: '',
    partnerTrainer2: '',
    emails: [],
    startTime: null,
    endTime: null,
    location: null,
    addressLine1: null,
    addressLine2: null,
    err: null,
    emailErr: null,
    stateLoaded: false,
  };

  componentDidMount() {
    const { id } = this.props.match.params;

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

    // call action and pass it the id of session to fetch it's details
    this.props.fetchSessionDetails(id);

    this.props.fetchAllTrainers();
    this.props.fetchLocalLeads();
  }

  componentDidUpdate() {
    const { loaded, sessionDetails } = this.props;
    const { stateLoaded } = this.state;

    if (loaded !== stateLoaded) {
      const {
        date,
        type,
        numberOfAttendees,
        region,
        participantsEmails,
        trainers,
        startTime,
        endTime,
        address,
      } = sessionDetails;
      const { location, addressLine1, addressLine2 } = address;
      if (sessionDetails) {
        this.setState({
          session: type,
          startDate: date,
          inviteesNumber: numberOfAttendees,
          region,
          partnerTrainer1: trainers[0]._id,
          emails: participantsEmails,
          startTime,
          endTime,
          location,
          addressLine1,
          addressLine2,
          stateLoaded: true,
        });

        if (trainers[1]) {
          this.setState({
            partnerTrainer2: trainers[1]._id,
            stateLoaded: true,
          });
        }
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('paste', this.pasteEmails);
  }

  onSelectBlur = () => {
    this.setState({ focused: false });
  };

  onSelectFocus = () => {
    this.setState({ focused: true });
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

      this.onEmailChange([...emails.map(item => item.email), ...emailsArray]);
    }
  };

  onDateChange = defaultValue => {
    this.setState({
      startDate: defaultValue,
    });
  };

  onStartTimeChange = (time, timeString) => {
    this.setState({
      startTime: timeString,
    });
  };

  onEndTimeChange = (time, timeString) => {
    this.setState({
      endTime: timeString,
    });
  };

  getDisabledStartTime = () => {
    const { endTime } = this.state;
    if (endTime) {
      const hour = endTime.split(':')[0];
      const unavailableHours = [];
      for (let i = Number(hour); i < 24; i += 1) {
        unavailableHours.push(i);
      }
      return unavailableHours;
    }
    return null;
  };

  getDisabledEndTime = () => {
    const { startTime } = this.state;
    if (startTime) {
      const hour = startTime.split(':')[0];
      const unavailableHours = [];
      for (let i = 0; i < Number(hour); i += 1) {
        unavailableHours.push(i);
      }
      return unavailableHours;
    }
    return null;
  };

  onKeyPress = e => {
    return e.key === 'Enter' && e.preventDefault();
  };

  onInputChange = ({ target: { value, name } }) => {
    const newValue = value.replace(/^\s*\s*$/, '');
    this.setState({
      [name]: newValue,
    });
  };

  onSelectSessionChange = value => {
    this.setState({
      session: value,
    });
  };

  onSelectRegionChange = value => {
    this.setState({
      region: value,
    });
  };

  onSelectPartner1Change = value => {
    this.setState({
      partnerTrainer1: value,
    });
  };

  onSelectPartner2Change = value => {
    this.setState({
      partnerTrainer2: value,
    });
  };

  onEmailChange = value => {
    const { emails } = this.state;
    // remove emailError
    this.setState({ emailErr: null });

    // check if any emails have been removed
    const remainingEmails = emails.filter(item => value.includes(item.email));

    // check if there's a new email
    const justEmails = remainingEmails.map(email => email && email.email);
    const newEmails = value.filter(item => justEmails.indexOf(item) === -1);

    // check valid new email
    const incorrectEmails = newEmails.filter(item => !pattern.test(item));

    if (incorrectEmails.length > 0) {
      this.setState({
        emailErr: '* Please enter a valid email',
      });
    } else if (newEmails.length > 0) {
      const newEmailObjs = newEmails.map(email => ({ email, status: 'new' }));
      this.setState({ emails: [...remainingEmails, ...newEmailObjs] });
    } else {
      this.setState({ emails: remainingEmails });
    }

    // if (!pattern.test(value.email)) {
    //   this.setState({
    //     err: '*please enter valid email',
    //   });
    // }
    // this.setState({
    //   emails: value,
    // });
  };

  onCopy = () => {
    const { emails } = this.state;

    if (emails.length) {
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

  onFormSubmit = event => {
    event.preventDefault();
    const { id } = this.props.match.params;
    const {
      session,
      startDate,
      inviteesNumber,
      region,
      partnerTrainer1,
      partnerTrainer2,
      emails,
      startTime,
      endTime,
      location,
      addressLine1,
      addressLine2,
    } = this.state;

    const sessionData = {
      session,
      startDate,
      inviteesNumber,
      region,
      partnerTrainer1,
      partnerTrainer2,
      emails,
      startTime,
      endTime,
      location: location || 'N/A',
      addressLine1: addressLine1 || 'N/A',
      addressLine2: addressLine2 || 'N/A',
    };

    this.props.sessionUpdateAction(sessionData, id);
  };

  render() {
    const { trainers, role, localLeads, sessionDetails, loading } = this.props;
    if (!sessionDetails) {
      return null;
    }

    const {
      date,
      type,
      startTime,
      endTime,
      region,
      participantsEmails,
    } = sessionDetails;

    const {
      startDate,
      inviteesNumber,
      err,
      emailErr,
      emails,
      session,
      partnerTrainer1,
      location,
      addressLine1,
      addressLine2,
    } = this.state;

    const {
      onDateChange,
      onInputChange,
      onSelectSessionChange,
      onSelectRegionChange,
      onSelectPartner1Change,
      onSelectPartner2Change,
      onEmailChange,
      onFormSubmit,
      onStartTimeChange,
      onEndTimeChange,
      onKeyPress,
    } = this;

    const details =
      'Email addresses of invitees can be either added one by one or copied from a list separated by commas, spaces etc. This list is not required to set up sessions. It can be created/updated in continuation.';
    const content = (
      <div style={{ maxWidth: '250px', margin: '0 auto' }}>
        <p>
          this is where you can store the expected maximum attendance. This
          number can be changed later.
        </p>
      </div>
    );

    return (
      <>
        <BackContainer>
          <BackLink onClick={history.goBack}>{`< Back`}</BackLink>
        </BackContainer>
        <EditSessionWrapper>
          <Header type="view" label="Edit Session" />
          <Form onSubmit={onFormSubmit}>
            <InputDiv>
              <Label htmlFor="DatePicker">Session Date:</Label>
              {date && startDate && (
                <DatePicker
                  id="DatePicker"
                  onChange={onDateChange}
                  name="startDate"
                  defaultValue={moment(date, 'YYYY-MM-DD')}
                  size="large"
                  style={{ width: '100%' }}
                />
              )}
            </InputDiv>

            <InputDiv>
              <Label htmlFor="sessionType">Session Type:</Label>
              <Select
                id="sessionType"
                showSearch
                style={{ width: '100%' }}
                placeholder={type}
                value={session}
                optionFilterProp="children"
                onChange={onSelectSessionChange}
                size="large"
              >
                {sessions.map(({ value, label }) => (
                  <Option key={value} value={value}>
                    {label}
                  </Option>
                ))}
              </Select>
            </InputDiv>

            <InputDiv>
              <LabelDiv>
                <Label htmlFor="sessionCapacity">Session Capacity:</Label>
                <Popover content={content} style={{ marginRight: '2rem' }}>
                  <button
                    type="button"
                    style={{ background: 'none', border: 'none' }}
                  >
                    <i
                      className="fas fa-question-circle"
                      style={{ color: '#9FCE67' }}
                    />
                  </button>
                </Popover>
              </LabelDiv>
              <Input
                id="sessionCapacity"
                type="number"
                placeholder="Enter number of attendees"
                value={inviteesNumber}
                onChange={onInputChange}
                name="inviteesNumber"
                size="large"
                min="0"
                onKeyPress={e => onKeyPress(e)}
              />
            </InputDiv>

            <InputDiv>
              <Label htmlFor="region">Region:</Label>
              <Select
                id="region"
                showSearch
                style={{ width: '100%' }}
                placeholder={region}
                optionFilterProp="children"
                onChange={onSelectRegionChange}
                value={this.state.region}
                size="large"
              >
                {regions.map(_region => (
                  <Option key={_region} value={_region}>
                    {_region}
                  </Option>
                ))}
              </Select>
            </InputDiv>

            <InputDiv>
              <Label htmlFor="addressLine1">Address Line1:</Label>
              <Input
                id="addressLine1"
                type="text"
                placeholder="Address line1"
                value={location}
                onChange={onInputChange}
                name="location"
                size="large"
                onKeyPress={e => onKeyPress(e)}
              />
            </InputDiv>

            <InputDiv>
              <Label htmlFor="addressLine2">Address Line2:</Label>
              <Input
                id="addressLine2"
                type="text"
                placeholder="address line2"
                value={addressLine1}
                onChange={onInputChange}
                name="addressLine1"
                size="large"
                onKeyPress={e => onKeyPress(e)}
              />
            </InputDiv>

            <InputDiv>
              <Label htmlFor="PostCode">Post Code:</Label>
              <Input
                id="PostCode"
                type="text"
                placeholder="Post Code"
                value={addressLine2}
                onChange={onInputChange}
                name="addressLine2"
                size="large"
                onKeyPress={e => onKeyPress(e)}
              />
            </InputDiv>
            <InputDiv>
              {role === 'localLead' ? (
                <Label htmlFor="PartnerTrainer">Trainer:</Label>
              ) : (
                <Label htmlFor="PartnerTrainer">Partner Trainer:</Label>
              )}
              <Select
                id="PartnerTrainer"
                showSearch
                style={{ width: '100%' }}
                placeholder={
                  role === 'localLead' ? 'Trainer' : 'Partner Trainer'
                }
                optionFilterProp="children"
                onChange={onSelectPartner1Change}
                value={partnerTrainer1}
                size="large"
              >
                {trainers &&
                  trainers.map(({ name, _id }) => (
                    <Option key={_id} value={_id}>
                      {name}
                    </Option>
                  ))}
                {role === 'localLead' &&
                  localLeads.map(({ name, _id }) => (
                    <Option key={_id} value={_id}>
                      {name}
                    </Option>
                  ))}
              </Select>
            </InputDiv>
            {role === 'localLead' && (
              <InputDiv>
                <Label htmlFor="PartnerTrainer2">Second Partner Trainer:</Label>
                <Select
                  id="PartnerTrainer2"
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Trainer 2"
                  optionFilterProp="children"
                  onChange={onSelectPartner2Change}
                  size="large"
                >
                  {trainers &&
                    trainers.map(({ name, _id }) => (
                      <Option key={_id} value={_id}>
                        {name}
                      </Option>
                    ))}
                  {role === 'localLead' &&
                    localLeads.map(({ name, _id }) => (
                      <Option key={_id} value={_id}>
                        {name}
                      </Option>
                    ))}
                </Select>
              </InputDiv>
            )}
            <InputDiv>
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
                <Label htmlFor="EmailsToInvite">Emails To Invite:</Label>
                <Select
                  id="EmailsToInvite"
                  mode="tags"
                  size="large"
                  placeholder="emails"
                  onChange={onEmailChange}
                  defaultValue={participantsEmails.map(item => item.email)}
                  value={emails.map(item => item.email)}
                  style={{ width: '100%', height: '100%' }}
                  onBlur={this.onSelectBlur}
                  onFocus={this.onSelectFocus}
                >
                  {participantsEmails.map(item => (
                    <Option key={item.email} value={item.email}>
                      {item.email}
                    </Option>
                  ))}
                </Select>
              </SelecetWrapper>
            </InputDiv>
            <div
              id="emails"
              style={{
                opacity: '0',
                position: 'absolute',
                width: '0',
                hieght: '0',
              }}
            >
              {emails && emails.map(email => email.email).join(';')}
            </div>
            <EmailError>{emailErr}</EmailError>

            <InputDiv
              style={{
                marginTop: '1rem',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              <InputLabel>Session Start:</InputLabel>
              <TimePicker
                onChange={onStartTimeChange}
                name="startTime"
                defaultValue={startTime && moment(startTime, 'HH:mm')}
                size="large"
                format="HH:mm"
                disabledHours={this.getDisabledStartTime}
              />
            </InputDiv>
            <InputDiv
              style={{
                marginTop: '1rem',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              <InputLabel>Session Finish:</InputLabel>
              <TimePicker
                onChange={onEndTimeChange}
                name="startTime"
                defaultValue={endTime && moment(endTime, 'HH:mm')}
                size="large"
                format="HH:mm"
                disabledHours={this.getDisabledEndTime}
              />
            </InputDiv>

            <SubmitBtn>
              <Button
                onClick={onFormSubmit}
                type="primary"
                label="Update"
                height="40px"
                width="100%"
                loading={loading}
              />
            </SubmitBtn>
            {err && <Error>All inputs are required</Error>}
          </Form>
        </EditSessionWrapper>
      </>
    );
  }
}

const mapStateToProps = state => ({
  trainers: state.trainers.trainers,
  role: state.auth.role,
  localLeads: state.fetchedData.localLeadsList,
  sessionDetails: state.sessions.sessionDetails[0],
  loaded: state.sessions.loaded,
  msg: state.session.msg,
  loading: state.loading.sessionEditLoading,
});

export default connect(
  mapStateToProps,
  {
    fetchAllTrainers,
    fetchLocalLeads,
    fetchSessionDetails,
    sessionUpdateAction,
  }
)(EditSession);
