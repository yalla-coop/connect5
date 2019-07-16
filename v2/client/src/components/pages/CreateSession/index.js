/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { DatePicker, Select, Input, Checkbox, Icon, Divider } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import Button from '../../common/Button';
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
  Heading,
  SubmitBtn,
  Error,
} from './create-session.style';

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i += 1) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const initialState = {
  session: '',
  startDate: null,
  inviteesNumber: '',
  region: null,
  partnerTrainer1: '',
  partnerTrainer2: '',
  emails: [],
  sendByEmail: false,
  err: false,
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
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.fetchLocalLeadsAndTrainers();
    }
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
    const {
      startDate,
      inviteesNumber,
      session,
      region,
      partnerTrainer1,
      emails,
    } = this.state;
    const isError = !(
      !!startDate &&
      !!inviteesNumber &&
      !!session &&
      !!region &&
      !!emails &&
      !!partnerTrainer1
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
    } = this.state;
    const sessionData = {
      session,
      startDate,
      inviteesNumber,
      region,
      partnerTrainer1,
      partnerTrainer2,
      emails,
      sendByEmail,
    };

    // CHECK FOR ERRORS IF NOT THEN CALL ACTION CREATOR AND GIVE IT sessionData
    return !this.checkError() && this.props.createSessionAction(sessionData);
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
    } = this;

    return (
      <CreateSessionWrapper>
        <Heading>Create New Session</Heading>
        <Form onSubmit={onFormSubmit}>
          <InputDiv>
            <DatePicker
              onChange={onDateChange}
              name="startDate"
              size="large"
              style={{ width: '100%' }}
            />
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
          </InputDiv>

          <InputDiv>
            <Input
              type="number"
              placeholder="Number of session invitees"
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
              placeholder="Region"
              optionFilterProp="children"
              onChange={onSelectRegionChange}
              size="large"
              value={this.state.region ? this.state.region : undefined}
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
              value={partnerTrainer1 || undefined}
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
                value={partnerTrainer2 || undefined}
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
              placeholder="participants Emails"
              onChange={onEmailChange}
              style={{ width: '100%', height: '100%' }}
              value={emails}
            />
            <div>{err}</div>
          </InputDiv>
          <InputDiv>
            <Checkbox onChange={this.onChangeCheckbox}>
              Send the survey to participants by email
            </Checkbox>
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
