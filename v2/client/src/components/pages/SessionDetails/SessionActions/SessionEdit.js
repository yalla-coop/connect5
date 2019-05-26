import React, { Component } from 'react';
import { DatePicker, Select, Input } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import Button from '../../../common/Button';
import { fetchAllTrainers } from '../../../../actions/trainerAction';
import { fetchLocalLeads } from '../../../../actions/users';
import { fetchSessionDetails } from '../../../../actions/groupSessionsAction';
import { sessions, regions, pattern } from '../../CreateSession/options';
import {
  Form,
  CreateSessionWrapper,
  InputDiv,
  Heading,
  SubmitBtn,
  Error,
} from '../../CreateSession/create-session.style';

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
    err: false,
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    // call action and pass it the id of session to fetch it's details
    this.props.fetchSessionDetails(id);

    this.props.fetchAllTrainers();
    this.props.fetchLocalLeads();
  }

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
    // check for email validation

    if (!pattern.test(value)) {
      this.setState({
        err: '*please enter valid email',
      });
    }
    this.setState({
      emails: value,
    });
  };

  onFormSubmit = event => {
    event.preventDefault();
    console.log('hellllllo');
    // const {
    //   session,
    //   startDate,
    //   inviteesNumber,
    //   region,
    //   partnerTrainer1,
    //   partnerTrainer2,
    //   emails,
    // } = this.state;
    // const sessionData = {
    //   session,
    //   startDate,
    //   inviteesNumber,
    //   region,
    //   partnerTrainer1,
    //   partnerTrainer2,
    //   emails,
    // };
  };

  render() {
    console.log(this.props.sessionDetails, 'detttttttttttttttalis');
    const { trainers, role, localLeads, sessionDetails } = this.props;
    const {
      date,
      type,
      numberOfAttendees,
      region,
      participantsEmails,
    } = sessionDetails;
    const { startDate, inviteesNumber, err } = this.state;
    const {
      onDateChange,
      onInputChange,
      onSelectSessionChange,
      onSelectRegionChange,
      onSelectPartner1Change,
      onSelectPartner2Change,
      onEmailChange,
      onFormSubmit,
    } = this;
    return (
      <CreateSessionWrapper>
        <Heading>Edit Session</Heading>
        <Form onSubmit={onFormSubmit}>
          <InputDiv>
            <DatePicker
              placeholder={moment(date).format('DD/MM/YYYY')}
              onChange={onDateChange}
              name="startDate"
              defaultValue={moment('2019-01-01', 'YYYY-MM-DD')}
              size="large"
              style={{ width: '100%' }}
              value={startDate}
            />
          </InputDiv>

          <InputDiv>
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder={type}
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
              placeholder={numberOfAttendees}
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
              size="large"
            >
              {regions.map(region => (
                <Option key={region} value={region}>
                  {region}
                </Option>
              ))}
            </Select>
          </InputDiv>

          <InputDiv>
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Partner Trainer"
              optionFilterProp="children"
              onChange={onSelectPartner1Change}
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
                placeholder="Second Partner Trainer"
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
              defaultValue="example"
              style={{ width: '100%', height: '100%' }}
            />
            <div>{err}</div>
          </InputDiv>

          <SubmitBtn>
            <Button
              onClick={onFormSubmit}
              type="primary"
              label="Submit"
              height="40px"
              width="100%"
            />
          </SubmitBtn>
          {err && <Error>All inputs are required</Error>}
        </Form>
      </CreateSessionWrapper>
    );
  }
}

const mapStateToProps = state => ({
  trainers: state.trainers.trainers,
  role: state.auth.role,
  localLeads: state.fetchedData.localLeadsList,
  sessionDetails: state.sessions.sessionDetails,
});

export default connect(
  mapStateToProps,
  { fetchAllTrainers, fetchLocalLeads, fetchSessionDetails }
)(EditSession);
