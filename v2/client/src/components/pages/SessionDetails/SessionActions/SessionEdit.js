/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { DatePicker, Select, Input, TimePicker } from 'antd';
import moment from 'moment';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import history from '../../../../history';
import Button from '../../../common/Button';
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

import {
  EditSessionWrapper,
  InputLabel,
  BackLink,
  BackContainer,
  EmailError,
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
    address: null,
    err: null,
    emailErr: null,
    stateLoaded: false,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
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
          address,
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

  onFormSubmit = event => {
    event.preventDefault();
    const { id } = this.props.match.params;
    const { msg } = this.props;
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
      address,
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
      address,
    };

    this.props.sessionUpdateAction(sessionData, id);
    if (msg === 'success') {
      Swal.fire({
        title: 'success',
        text: 'session has been successfully edited',
        type: 'success',
        confirmButtonText: 'Ok',
      });
      history.push(`/session-details/${id}`);
    }
  };

  render() {
    const { trainers, role, localLeads, sessionDetails } = this.props;
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
      address,
      err,
      emailErr,
      emails,
      session,
      partnerTrainer1,
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
    } = this;
    return (
      <EditSessionWrapper>
        <Header type="view" label="Edit Session" />
        <BackContainer>
          <BackLink onClick={history.goBack}>{`< Back`}</BackLink>
        </BackContainer>
        <Form onSubmit={onFormSubmit}>
          <InputDiv>
            {date && startDate && (
              <DatePicker
                onChange={onDateChange}
                name="startDate"
                defaultValue={moment(date, 'YYYY-MM-DD')}
                size="large"
                style={{ width: '100%' }}
              />
            )}
          </InputDiv>

          <InputDiv>
            <Select
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
            <Input
              type="number"
              placeholder="Enter number of attendees"
              value={inviteesNumber}
              onChange={onInputChange}
              name="inviteesNumber"
              size="large"
              min="0"
            />
          </InputDiv>

          <InputDiv>
            <Select
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
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder={
                role === 'localLead' ? 'Trainer 1' : 'Partner Trainer'
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
              <Select
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
            <Select
              mode="tags"
              size="large"
              placeholder="emails"
              onChange={onEmailChange}
              defaultValue={participantsEmails.map(item => item.email)}
              value={emails.map(item => item.email)}
              style={{ width: '100%', height: '100%' }}
            >
              {participantsEmails.map(item => (
                <Option key={item.email} value={item.email}>
                  {item.email}
                </Option>
              ))}
            </Select>
            <EmailError>{emailErr}</EmailError>
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
            <InputLabel>Session Start:</InputLabel>
            <TimePicker
              onChange={onStartTimeChange}
              name="startTime"
              defaultValue={startTime && moment(startTime, 'HH:mm')}
              size="large"
              style={{ width: '50%' }}
              format="HH:mm"
            />
          </InputDiv>
          <InputDiv>
            <InputLabel>Session Finish:</InputLabel>
            <TimePicker
              onChange={onEndTimeChange}
              name="startTime"
              defaultValue={endTime && moment(endTime, 'HH:mm')}
              size="large"
              style={{ width: '50%' }}
              format="HH:mm"
            />
          </InputDiv>

          <SubmitBtn>
            <Button
              onClick={onFormSubmit}
              type="primary"
              label="Update"
              height="40px"
              width="100%"
            />
          </SubmitBtn>
          {err && <Error>All inputs are required</Error>}
        </Form>
      </EditSessionWrapper>
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
