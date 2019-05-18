import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { sessions, regions } from './options';
// import swal from 'sweet-alert';

import {
  Form,
  CreateSessionWrapper,
  Input,
  SelectComponent,
  Date,
  Heading,
  Button,
  Error,
} from './create-session.style';

class CreateSession extends Component {
  state = {
    session: '',
    startDate: null,
    inviteesNumber: '',
    region: null,
    partner: '',
    err: false,
  };

  onDateChange = date => {
    this.setState({
      startDate: date,
    });
  };

  onInputChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  onSelectSessionChange = session => {
    this.setState({
      session,
    });
  };

  onSelectRegionChange = region => {
    this.setState({
      region,
    });
  };

  onSelectPartnerChange = partner => {
    this.setState({
      partner,
    });
  };

  checkError = () => {
    const { startDate, inviteesNumber, session, region, partner } = this.state;
    const isError = !(
      !!startDate &&
      !!inviteesNumber &&
      !!session &&
      !!region &&
      !!partner
    );

    this.setState({
      err: isError,
    });
    return isError;
  };

  fetch = () => {
    const { startDate, inviteesNumber, session, region, partner } = this.state;
    const sessionData = {
      sessionType: session.value,
      startDate: moment(startDate).format('YYYY,MM,DD'),
      inviteesNumber,
      region: region.value,
      partner: partner.value,
    };
    axios
      .post('/api/session', sessionData)
      .then(res => console.log(res))

      .catch(err => console.log(err));
  };

  onFormSubmit = event => {
    event.preventDefault();
    return !this.checkError() && this.fetch();
  };

  render() {
    const {
      startDate,
      inviteesNumber,
      session,
      region,
      partner,
      err,
    } = this.state;
    const {
      onDateChange,
      onInputChange,
      onSelectSessionChange,
      onSelectRegionChange,
      onSelectPartnerChange,
      onFormSubmit,
    } = this;
    return (
      <CreateSessionWrapper>
        <Heading>Create New Session</Heading>

        <Form onSubmit={onFormSubmit}>
          <Date
            selected={startDate}
            placeholderText="Click to select a date"
            onChange={onDateChange}
            name="startDate"
            dateFormat="YYYY-MM-DD"
          />

          <SelectComponent
            options={sessions}
            onChange={onSelectSessionChange}
            placeholder="Click to select session No."
            selected={session}
          />

          <Input
            type="number"
            placeholder="Number of session invitees"
            value={inviteesNumber}
            onChange={onInputChange}
            name="inviteesNumber"
            min="0"
          />

          <SelectComponent
            options={regions}
            onChange={onSelectRegionChange}
            placeholder="Region"
            selected={region}
          />

          <SelectComponent
            options={regions}
            onChange={onSelectPartnerChange}
            placeholder="Partner Trainer"
            selected={partner}
          />
          <div>
            <input
              type="checkbox"
              id="sendEmail"
              name="sendEmail"
              value="value"
            />
            <label htmlFor="sendEmail">
              Send the survey to participants by email
            </label>
          </div>
          <Button type="submit">Submit</Button>
          {err && <Error>All inputs are required</Error>}
        </Form>
      </CreateSessionWrapper>
    );
  }
}

export default CreateSession;
