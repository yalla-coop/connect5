/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

import {
  DatePicker,
  Select,
  Input,
  Icon,
  Divider,
  TimePicker,
  Popover,
} from 'antd';

import moment from 'moment';
import { connect } from 'react-redux';
import Button from '../../common/Button';
import Header from '../../common/Header';
import EditEmail from '../../common/EditEmail';

import { readableSessionNamePairs } from '../../../constants';

import { fetchAllTrainers } from '../../../actions/trainerAction';
import {
  fetchLocalLeads,
  fetchLocalLeadTrainersGroup,
} from '../../../actions/users';
import {
  createSessionAction,
  storeInputData,
  clearInputData,
} from '../../../actions/sessionAction';
import { regions } from './options';
import history from '../../../history';

import { validPostcode } from '../../../helpers';
import {
  Form,
  CreateSessionWrapper,
  InputDiv,
  SubmitBtn,
  Error,
  Warning,
  InputLabel,
  Label,
  RequiredMark,
  LabelDiv,
  BackContainer,
  BackLink,
} from './CreateSession.style';

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
  err: false,
  trainersNames: { partner1: '', partner2: '' },
  startTime: null,
  endTime: null,
  address: '',
  postcode: null,
  extraInfo: null,
  isPostcodeValid: true,
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
    this.setState(initialState);
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.fetchLocalLeadsAndTrainers();
    }
  }

  componentWillUnmount() {
    this.props.clearInputData();
  }

  fetchLocalLeadsAndTrainers = () => {
    const { id, role } = this.props.currentUser;
    if (role && role === 'localLead') {
      this.props.fetchLocalLeadTrainersGroup(id);
    } else {
      this.props.fetchAllTrainers();
      this.props.fetchLocalLeads();
    }
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

    if (name === 'postcode') {
      const isPostcodeValid = validPostcode(value);
      this.setState({ isPostcodeValid: !value || isPostcodeValid });
    }
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

  // partnerTrainer is the trianer selected in the another select
  // filer the trianers/local leads list to remove the trianer that has been selected
  renderTrainersList = partnerTrainer => {
    const { leadsAndTrainers, role, localLeadTrainersGroup, id } = this.props;

    if (role && role === 'localLead') {
      if (localLeadTrainersGroup) {
        return (
          localLeadTrainersGroup
            .filter(item =>
              partnerTrainer ? item._id !== partnerTrainer.key : true
            )
            // sort the the array to get the logged in user at the first of the array
            .sort(({ _id }) => (_id === id ? -1 : 1))
            .map(({ name, _id }) => {
              return (
                <Option
                  key={_id}
                  value={_id}
                  style={{ textTransform: 'capitalize' }}
                >
                  {`${name[0].toUpperCase()}${name.slice(1)}`}
                </Option>
              );
            })
        );
      }
    } else if (leadsAndTrainers) {
      return leadsAndTrainers

        .filter(({ _id }) =>
          partnerTrainer ? _id !== partnerTrainer.key : _id !== id
        )
        .map(({ name, _id }) => (
          <Option key={_id} value={_id} style={{ textTransform: 'capitalize' }}>
            {`${name[0].toUpperCase()}${name.slice(1)}`}
          </Option>
        ));
    }
    return null;
  };

  checkError = () => {
    const { inputData, role } = this.props;
    const {
      startDate,
      inviteesNumber,
      session,
      region,
      partnerTrainer1,
    } = inputData;

    const isError = !(
      !!startDate &&
      !!inviteesNumber &&
      !!session &&
      !!region &&
      ((['localLead', 'admin'].includes(role) && !!partnerTrainer1) ||
        role === 'trainer')
    );

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
      trainersNames,
      startTime,
      endTime,
      addressLine1,
      addressLine2,
      postcode,
    } = inputData;

    if (postcode) {
      const isPostcodeValid = validPostcode(postcode);
      if (!isPostcodeValid) {
        return this.setState({ isPostcodeValid: false });
      }
      this.setState({ isPostcodeValid: true });
    }

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
      trainersNames: trainersNamesArray,
      startTime,
      endTime,
      addressLine1,
      addressLine2,
      postcode,
    };
    // CHECK FOR ERRORS IF NOT THEN CALL ACTION CREATOR AND GIVE IT sessionData
    return (
      !this.checkError() &&
      this.props.createSessionAction(sessionData, this.done)
    );
  };

  // callback to set a flage in the state to know if session created successfully
  done = err => {
    if (!err) this.setState({ sessionCreated: true });
    // scroll the window to the top of the page
    window.scrollBy(-100000, -100000);
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
    const { sessionCreated, extraInfo, isPostcodeValid } = this.state;
    const { role, inputData, loading, createdSession, name, id } = this.props;

    const {
      inviteesNumber,
      err,
      session,
      partnerTrainer1,
      partnerTrainer2,
      startDate,
      region,
      endTime,
      startTime,
      addressLine1,
      addressLine2,
      postcode,
    } = inputData;

    const {
      onDateChange,
      onInputChange,
      onSelectSessionChange,
      onSelectRegionChange,
      onSelectPartner1Change,
      onSelectPartner2Change,
      onFormSubmit,
      onStartTimeChange,
      onEndTimeChange,
      onKeyPress,
    } = this;

    const content = (
      <div style={{ maxWidth: '250px', margin: '0 auto' }}>
        <p>
          this is where you can store the expected maximum attendance. This
          number can be changed later.
        </p>
      </div>
    );

    // to redirect user to the new session after sending emails or skipping
    const sendEmailsCallback = () =>
      history.push(`/session-details/${createdSession._id}`);

    if (sessionCreated) {
      return (
        <EditEmail
          successMessage="Session created!"
          participantsEmails={createdSession.participantsEmails}
          type="registration"
          trainer={name}
          sessionDate={createdSession.date}
          sessionType={createdSession.type}
          address={createdSession.address}
          trainers={createdSession.trainers}
          startTime={createdSession.startTime}
          endTime={createdSession.endTime}
          shortId={createdSession.shortId}
          sessionId={createdSession._id}
          extraInfo={extraInfo}
          backCallback={sendEmailsCallback}
          canAddParticipants
        />
      );
    }
    return (
      <CreateSessionWrapper>
        <Header type="section" label="Create New Session" />
        <BackContainer style={{ paddingTop: '0' }}>
          <BackLink onClick={history.goBack}>{`< Back`}</BackLink>
        </BackContainer>
        <Form onSubmit={onFormSubmit}>
          <InputDiv>
            <Label htmlFor="DatePicker">
              {!startDate && <RequiredMark>*</RequiredMark>}Session Date:
            </Label>
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
            <Label htmlFor="sessionType">
              {!session && <RequiredMark>*</RequiredMark>}Session Type:
            </Label>
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
              {Object.entries(readableSessionNamePairs).map(
                ([value, label]) => (
                  <Option key={value} value={value}>
                    {label}
                  </Option>
                )
              )}
            </Select>
            {session === null && <Warning>* required</Warning>}
          </InputDiv>

          <InputDiv>
            <LabelDiv>
              <Label htmlFor="sessionCapacity">
                {!inviteesNumber && <RequiredMark>*</RequiredMark>}Session
                Capacity:
              </Label>

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
              placeholder="Session Capacity"
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
            <Label htmlFor="region">
              {!region && <RequiredMark>*</RequiredMark>}Region:
            </Label>
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
              value={addressLine1}
              onChange={onInputChange}
              name="addressLine1"
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
              value={addressLine2}
              onChange={onInputChange}
              name="addressLine2"
              size="large"
              onKeyPress={e => onKeyPress(e)}
            />
          </InputDiv>
          <InputDiv>
            <Label htmlFor="Postcode">Post Code:</Label>
            <Input
              id="Postcode"
              type="text"
              placeholder="Post Code"
              value={postcode}
              onChange={onInputChange}
              name="postcode"
              size="large"
              onKeyPress={e => onKeyPress(e)}
            />
          </InputDiv>

          {!isPostcodeValid && (
            <Error style={{ margin: '-19px 0px 13px 24px' }}>
              invalid postcode format
            </Error>
          )}

          <InputDiv>
            {['localLead', 'admin'].includes(role) ? (
              <Label htmlFor="PartnerTrainer">
                {!partnerTrainer1 && <RequiredMark>*</RequiredMark>}
                Trainer:
              </Label>
            ) : (
              <Label htmlFor="PartnerTrainer">Partner Trainer:</Label>
            )}

            <Select
              id="PartnerTrainer"
              showSearch
              style={{ width: '100%' }}
              placeholder={
                ['localLead', 'admin'].includes(role)
                  ? 'Trainer'
                  : 'Partner Trainer'
              }
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
              {role !== 'trainer' && (
                <Option
                  key={id}
                  value={id}
                  style={{ textTransform: 'capitalize' }}
                >
                  {`${name[0].toUpperCase()}${name.slice(1)}`} (me)
                </Option>
              )}
              {this.renderTrainersList(partnerTrainer2)}
            </Select>
            {role === 'localLead' && partnerTrainer1 === null && (
              <Warning>* required</Warning>
            )}
          </InputDiv>
          {['localLead', 'admin'].includes(role) && (
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
                {role !== 'trainer' && (
                  <Option
                    key={id}
                    value={id}
                    style={{ textTransform: 'capitalize' }}
                  >
                    {`${name[0].toUpperCase()}${name.slice(1)}`} (me)
                  </Option>
                )}
                {this.renderTrainersList(partnerTrainer1)}
              </Select>
            </InputDiv>
          )}

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

          <div>{err}</div>

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
    name: state.auth.name,
    localLeadTrainersGroup: state.fetchedData.localLeadGroup,
    leadsAndTrainers,
    loading: state.session.loading,
    inputData,
    createdSession: state.session,
    userObj: state.auth,
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
    clearInputData,
  }
)(CreateSession);
