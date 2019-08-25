/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

import {
  DatePicker,
  Select,
  Input,
  Checkbox,
  Icon,
  Divider,
  TimePicker,
} from 'antd';

import moment from 'moment';
import { connect } from 'react-redux';
import Button from '../../common/Button';
import Header from '../../common/Header';
import { fetchAllTrainers } from '../../../actions/trainerAction';
import {
  fetchLocalLeads,
  fetchLocalLeadTrainersGroup,
} from '../../../actions/users';
import {
  createSessionAction,
  storeInputData,
} from '../../../actions/sessionAction';
import { sessions, regions, pattern } from './options';
import history from '../../../history';

import {
  Form,
  CreateSessionWrapper,
  InputDiv,
  SubmitBtn,
  Error,
  Warning,
  InputLabel,
  Label,
} from './create-session.style';

import { BackContainer, BackLink } from '../AddTrainer/AddTrainer.style';

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i += 1) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const initialState = {
  session: null,
  startDate: null,
  inviteesNumber: null,
  region: null,
  partnerTrainer1: { key: '', label: '' },
  partnerTrainer2: { key: '', label: '' },
  emails: [],
  sendByEmail: false,
  err: false,
  trainersNames: { partner1: '', partner2: '' },
  startTime: null,
  endTime: null,
  address: '',
};

class CreateSession extends Component {
  state = initialState;

  componentDidMount() {
    const { id, role } = this.props;
    if (this.props.location.state) {
      this.setState({
        ...this.props.location.state,
        startDate: moment(this.props.location.state.startDate),
      });
    }

    if (role === 'localLead') {
      this.props.fetchLocalLeadTrainersGroup(id);
    } else {
      this.props.fetchAllTrainers();
      this.props.fetchLocalLeads();
    }

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

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.fetchLocalLeadsAndTrainers();
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

      this.onEmailChange([...emails, ...emailsArray]);
    }
  };

  fetchLocalLeadsAndTrainers = () => {
    const { id, role } = this.props.currentUser;
    if (role && role === 'localLead') {
      this.props.fetchLocalLeadTrainersGroup(id);
    } else {
      this.props.fetchAllTrainers();
      this.props.fetchLocalLeads();
    }
  };

  onChangeCheckbox = e => {
    this.props.storeInputData({ sendByEmail: e.target.checked });
  };

  onDateChange = defaultValue => {
    this.props.storeInputData({ startDate: defaultValue });
  };

  onKeyPress = e => {
    return e.key === 'Enter' && e.preventDefault();
  };

  onInputChange = ({ target: { value, name } }) => {
    const newValue = value.replace(/^\s*\s*$/, '');
    this.props.storeInputData({ [name]: newValue });
  };

  onSelectSessionChange = value => {
    this.props.storeInputData({ session: value });
  };

  onSelectRegionChange = value => {
    this.props.storeInputData({ region: value });
  };

  onSelectPartner1Change = item => {
    const { trainersNames } = this.state;

    this.props.storeInputData({
      partnerTrainer1: item,
      trainersNames: { ...trainersNames, partner1: item.label },
    });
  };

  onSelectPartner2Change = item => {
    const { trainersNames } = this.state;

    this.props.storeInputData({
      partnerTrainer2: item,
      trainersNames: { ...trainersNames, partner2: item.label },
    });
  };

  onEmailChange = value => {
    let err = '';
    const valuesToBeStored = [];
    // check for email validation
    value.forEach(item => {
      if (pattern.test(item)) {
        valuesToBeStored.push(item);
      } else {
        err = '*please enter valid email';
      }
    });

    this.props.storeInputData({
      emails: valuesToBeStored,
      err,
    });
  };

  renderTrainersList = () => {
    const { leadsAndTrainers, role, localLeadTrainersGroup, id } = this.props;
    if (role && role === 'localLead') {
      if (localLeadTrainersGroup) {
        return localLeadTrainersGroup
          .filter(({ _id }) => _id !== id)
          .map(({ name, _id }) => {
            return (
              <Option
                key={_id}
                value={_id}
                style={{ textTransform: 'capitalize' }}
              >
                {name}
              </Option>
            );
          });
      }
    } else if (leadsAndTrainers) {
      return leadsAndTrainers
        .filter(({ _id }) => _id !== id)
        .map(({ name, _id }) => (
          <Option key={_id} value={_id} style={{ textTransform: 'capitalize' }}>
            {name}
          </Option>
        ));
    }
    return null;
  };

  checkError = () => {
    const { inputData } = this.props;
    const { startDate, inviteesNumber, session, region } = inputData;
    const isError = !(!!startDate && !!inviteesNumber && !!session && !!region);

    this.props.storeInputData({
      err: isError,
    });
    return isError;
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { inputData } = this.props;
    const {
      session,
      startDate,
      inviteesNumber,
      region,
      partnerTrainer1,
      partnerTrainer2,
      emails,
      sendByEmail,
      trainersNames,
      startTime,
      endTime,
      location,
      addressLine1,
      addressLine2,
    } = inputData;

    const trainersNamesArray = [];
    if (partnerTrainer1) {
      trainersNamesArray.push(trainersNames.partner1);
    }

    if (partnerTrainer2) {
      trainersNamesArray.push(trainersNames.partner2);
    }

    const sessionData = {
      session,
      startDate,
      inviteesNumber,
      region,
      partnerTrainer1: partnerTrainer1 && partnerTrainer1.key,
      partnerTrainer2: partnerTrainer2 && partnerTrainer2.key,
      emails,
      sendByEmail,
      trainersNames: trainersNamesArray,
      startTime,
      endTime,
      location: location || 'N/A',
      addressLine1: addressLine1 || 'N/A',
      addressLine2: addressLine2 || 'N/A',
    };
    // CHECK FOR ERRORS IF NOT THEN CALL ACTION CREATOR AND GIVE IT sessionData
    return !this.checkError() && this.props.createSessionAction(sessionData);
  };

  onStartTimeChange = (time, timeString) => {
    this.props.storeInputData({ startTime: timeString });
  };

  onEndTimeChange = (time, timeString) => {
    this.props.storeInputData({ endTime: timeString });
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

  render() {
    const { role, inputData, loading } = this.props;

    const {
      inviteesNumber,
      err,
      session,
      partnerTrainer1,
      partnerTrainer2,
      emails,
      startDate,
      region,
      endTime,
      startTime,
      location,
      addressLine1,
      addressLine2,
    } = inputData;

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

    return (
      <CreateSessionWrapper>
        <Header type="section" label="Create New Session" />
        <BackContainer style={{ paddingTop: '0' }}>
          <BackLink onClick={history.goBack}>{`< Back`}</BackLink>
        </BackContainer>
        <Form onSubmit={onFormSubmit}>
          <InputDiv>
            <Label htmlFor="DatePicker">Session Date:</Label>
            <DatePicker
              id="DatePicker"
              onChange={onDateChange}
              name="startDate"
              size="large"
              style={{ width: '100%' }}
            />
            {startDate === null && <Warning>* required</Warning>}
          </InputDiv>

          <InputDiv>
            <Label htmlFor="sessionType">Session Type:</Label>
            <Select
              showSearch
              id="sessionType"
              style={{ width: '100%' }}
              placeholder="Click to select session No."
              optionFilterProp="children"
              onChange={onSelectSessionChange}
              size="large"
              value={session || undefined}
            >
              {sessions.map(({ value, label }) => (
                <Option key={value} value={value}>
                  {label}
                </Option>
              ))}
            </Select>
            {session === null && <Warning>* required</Warning>}
          </InputDiv>

          <InputDiv>
            <Label htmlFor="attendees">Attendees Number:</Label>
            <Input
              id="attendees"
              type="number"
              placeholder="Number of attendees (this can be an estimate)"
              value={inviteesNumber}
              onChange={onInputChange}
              name="inviteesNumber"
              size="large"
              min="0"
              onKeyPress={e => onKeyPress(e)}
            />
            {inviteesNumber === null && <Warning>* required</Warning>}
          </InputDiv>

          <InputDiv>
            <Label htmlFor="region">Region:</Label>
            <Select
              id="region"
              showSearch
              style={{ width: '100%' }}
              placeholder="Region"
              optionFilterProp="children"
              onChange={onSelectRegionChange}
              size="large"
              value={region || undefined}
            >
              {regions.map(reg => (
                <Option key={reg} value={reg}>
                  {reg}
                </Option>
              ))}
            </Select>
            {region === null && <Warning>* required</Warning>}
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
              name="AddressLine2"
              size="large"
              onKeyPress={e => onKeyPress(e)}
            />
          </InputDiv>
          <InputDiv>
            <Label htmlFor="PostCode">Post Code:</Label>
            <Input
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
            <Label htmlFor="PartnerTrainer">Partner Trainer:</Label>
            <Select
              id="PartnerTrainer"
              showSearch
              style={{ width: '100%' }}
              placeholder="Partner Trainer"
              optionFilterProp="children"
              onChange={onSelectPartner1Change}
              labelInValue
              size="large"
              value={
                partnerTrainer1 && partnerTrainer1.key
                  ? partnerTrainer1
                  : undefined
              }
              dropdownRender={menu => (
                <div
                  onMouseDown={e => {
                    e.preventDefault();
                    return false;
                  }}
                >
                  {role === 'localLead' && (
                    <>
                      <div
                        onClick={() => {
                          this.props.history.push({
                            pathname: '/add-trainer',
                            state: {
                              ...this.state,
                              startDate:
                                this.state.startDate &&
                                this.state.startDate.valueOf(),
                            },
                          });
                        }}
                        style={{
                          padding: '8px',
                          cursor: 'pointer',
                          textDecoration: 'none',
                          display: 'block',
                        }}
                      >
                        <Icon type="plus" /> Register New Trainer
                      </div>
                      <Divider style={{ margin: '4px 0' }} />{' '}
                    </>
                  )}
                  {menu}
                </div>
              )}
            >
              {this.renderTrainersList()}
            </Select>
          </InputDiv>
          {role === 'localLead' && (
            <InputDiv>
              <Label htmlFor="PartnerTrainer2">Second Partner Trainer:</Label>
              <Select
                id="PartnerTrainer2"
                placeholder="Second Partner Trainer"
                optionFilterProp="children"
                onChange={onSelectPartner2Change}
                size="large"
                showSearch
                style={{ width: '100%' }}
                value={
                  partnerTrainer2 && partnerTrainer2.key
                    ? partnerTrainer2
                    : undefined
                }
                labelInValue
                dropdownRender={menu => (
                  <div
                    onMouseDown={e => {
                      e.preventDefault();
                      return false;
                    }}
                  >
                    <div
                      onClick={() => {
                        this.props.history.push({
                          pathname: '/add-trainer',
                          state: {
                            ...this.state,
                            startDate:
                              this.state.startDate &&
                              this.state.startDate.valueOf(),
                          },
                        });
                      }}
                      style={{
                        padding: '8px',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        display: 'block',
                      }}
                    >
                      <Icon type="plus" /> Register New Trainer
                    </div>
                    <Divider style={{ margin: '4px 0' }} />
                    {menu}
                  </div>
                )}
              >
                {this.renderTrainersList()}
              </Select>
            </InputDiv>
          )}

          <InputDiv>
            <Label htmlFor="EmailsToInvite">Emails To Invite:</Label>
            <Select
              id="EmailsToInvite"
              mode="tags"
              size="large"
              placeholder="Enter emails for people to invite"
              onChange={onEmailChange}
              style={{ width: '100%', height: '100%' }}
              value={emails}
              onBlur={this.onSelectBlur}
              onFocus={this.onSelectFocus}
            />

            <InputDiv>
              <Checkbox onChange={this.onChangeCheckbox}>
                Automatically send an invite to these emails
              </Checkbox>
            </InputDiv>

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

            <div>{err}</div>
          </InputDiv>

          <SubmitBtn>
            <Button
              onClick={onFormSubmit}
              type="primary"
              label="Submit"
              height="40px"
              width="100%"
              loading={loading}
              disabled={loading}
            />
          </SubmitBtn>
          {err && <Error>Please fill in all required inputs</Error>}
        </Form>
      </CreateSessionWrapper>
    );
  }
}

const mapStateToProps = state => {
  const { trainers } = state.trainers;
  const localLeads = state.fetchedData.localLeadsList;
  const inputData = state.storeSessionData;

  const leadsAndTrainers = [...localLeads, ...trainers];
  return {
    id: state.auth.id,
    role: state.auth.role,
    currentUser: state.auth,
    localLeadTrainersGroup: state.fetchedData.localLeadGroup,
    leadsAndTrainers,
    loading: state.session.loading,
    inputData,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchAllTrainers,
    createSessionAction,
    fetchLocalLeads,
    fetchLocalLeadTrainersGroup,
    storeInputData,
  }
)(CreateSession);
