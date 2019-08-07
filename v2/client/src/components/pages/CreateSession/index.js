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
import { createSessionAction } from '../../../actions/sessionAction';
import { sessions, regions, pattern } from './options';

import {
  Form,
  CreateSessionWrapper,
  InputDiv,
  SubmitBtn,
  Error,
  Warning,
  InputLabel,
} from './create-session.style';

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
    this.setState({ sendByEmail: e.target.checked });
  };

  onDateChange = defaultValue => {
    this.setState({
      startDate: defaultValue,
    });
  };

  onInputChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
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

  onSelectPartner1Change = item => {
    const { trainersNames } = this.state;

    this.setState({
      partnerTrainer1: item,
      trainersNames: { ...trainersNames, partner1: item.label },
    });
  };

  onSelectPartner2Change = item => {
    const { trainersNames } = this.state;

    this.setState({
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

    this.setState({
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
    const { startDate, inviteesNumber, session, region, emails } = this.state;
    const isError = !(
      !!startDate &&
      !!inviteesNumber &&
      !!session &&
      !!region &&
      !!emails
    );

    this.setState({
      err: isError,
    });
    return isError;
  };

  onFormSubmit = event => {
    event.preventDefault();
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
      address,
    } = this.state;

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
      partnerTrainer1: partnerTrainer1.key,
      partnerTrainer2: partnerTrainer2.key,
      emails,
      sendByEmail,
      trainersNames: trainersNamesArray,
      startTime,
      endTime,
      address,
    };
    // CHECK FOR ERRORS IF NOT THEN CALL ACTION CREATOR AND GIVE IT sessionData
    return !this.checkError() && this.props.createSessionAction(sessionData);
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

  render() {
    const { role } = this.props;

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
      address,
    } = this.state;

    const { loading } = this.props;

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
    } = this;

    return (
      <CreateSessionWrapper>
        <Header type="section" label="Create New Session" />
        <Form onSubmit={onFormSubmit}>
          <InputDiv>
            <DatePicker
              onChange={onDateChange}
              name="startDate"
              size="large"
              style={{ width: '100%' }}
            />
            {startDate === null && <Warning>* required</Warning>}
          </InputDiv>

          <InputDiv>
            <Select
              showSearch
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
            <Input
              type="number"
              placeholder="Number of attendees (this can be an estimate)"
              value={inviteesNumber}
              onChange={onInputChange}
              name="inviteesNumber"
              size="large"
              min="0"
            />
            {inviteesNumber === null && <Warning>* required</Warning>}
          </InputDiv>

          <InputDiv>
            <Select
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
            <Input
              type="text"
              placeholder="Type the venue's address"
              value={address}
              onChange={onInputChange}
              name="address"
              size="large"
            />
          </InputDiv>

          <InputDiv>
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Partner Trainer"
              optionFilterProp="children"
              onChange={onSelectPartner1Change}
              labelInValue
              size="large"
              value={partnerTrainer1.key ? partnerTrainer1 : undefined}
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
              <Select
                placeholder="Second Partner Trainer"
                optionFilterProp="children"
                onChange={onSelectPartner2Change}
                size="large"
                showSearch
                style={{ width: '100%' }}
                value={partnerTrainer2.key ? partnerTrainer2 : undefined}
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
            <Select
              mode="tags"
              size="large"
              placeholder="Enter emails for people to invite"
              onChange={onEmailChange}
              style={{ width: '100%', height: '100%' }}
              value={emails}
              onBlur={this.onSelectBlur}
              onFocus={this.onSelectFocus}
            />

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
          <InputDiv>
            <Checkbox onChange={this.onChangeCheckbox}>
              Send a session invite to potential participants by email
            </Checkbox>
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

  const leadsAndTrainers = [...localLeads, ...trainers];
  return {
    id: state.auth.id,
    role: state.auth.role,
    currentUser: state.auth,
    localLeadTrainersGroup: state.fetchedData.localLeadGroup,
    leadsAndTrainers,
    loading: state.session.loading,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchAllTrainers,
    createSessionAction,
    fetchLocalLeads,
    fetchLocalLeadTrainersGroup,
  }
)(CreateSession);
