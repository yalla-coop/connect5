/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

import { Select } from 'antd';

import { connect } from 'react-redux';
import Button from '../Button';
import {
  regions,
  readableSessionNamePairs,
  ages,
  genders,
  ethnics,
  workforces,
} from '../../../constants/index';
import {
  fetchLocalLeads as fetchLocalLeadsAction,
  fetchLocalLeadTrainersGroup,
} from '../../../actions/users';
import { fetchAllTrainers as fetchAllTrainersAction } from '../../../actions/trainerAction';

import {
  Form,
  FilterWrapper,
  InputDiv,
  Label,
  ClearBtn,
} from './FilterResults.style';

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i += 1) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const initialState = {
  session: [],
  region: [],
  localLead: [],
  trainer: [],
  age: [],
  gender: [],
  ethnicity: [],
  workforce: [],
};

class FilterResults extends Component {
  state = initialState;

  componentDidMount() {
    const {
      fetchLocalLeads,
      fetchAllTrainers,
      fetchLocalLeadTrainersGroup: fetchLocalLeadTrainersGroupAction,
    } = this.props;
    const { id, role } = this.props;

    if (role === 'localLead') {
      fetchLocalLeadTrainersGroupAction(id);
    } else {
      fetchAllTrainers();
      fetchLocalLeads();
    }
  }

  clearAllFilter = () => {
    this.setState(initialState);
  };

  onSelectSessionChange = value => {
    this.setState({ session: value });
  };

  onSelectRegionChange = value => {
    this.setState({ region: value });
  };

  onSelectLocalleadChange = value => {
    this.setState({ localLead: value });
  };

  onSelectTrainerChange = value => {
    this.setState({ trainer: value });
  };

  onSelectAgeChange = value => {
    this.setState({ age: value });
  };

  onSelectGenderChange = value => {
    this.setState({ gender: value });
  };

  onSelectEthnicityChange = value => {
    this.setState({ ethnicity: value });
  };

  onSelectWorkforceChange = value => {
    this.setState({ workforce: value });
  };

  handleSubmit = () => {
    const {
      session,
      region,
      localLead,
      trainer,
      age,
      gender,
      ethnicity,
      workforce,
    } = this.state;

    const filteredData = {
      session,
      region,
      localLead,
      trainer,
      age,
      gender,
      ethnicity,
      workforce,
    };

    const { handleFilteredData } = this.props;
    handleFilteredData(filteredData);
  };

  render() {
    const {
      session,
      region,
      localLead,
      trainer,
      age,
      gender,
      ethnicity,
      workforce,
    } = this.state;
    const {
      localLeadsList,
      trainers,
      localLeadTrainersGroup,
      role,
    } = this.props;

    return (
      <FilterWrapper>
        <Form onFormSubmit={this.handleSubmit}>
          <InputDiv>
            <Label htmlFor="sessionType">Session Type(s):</Label>
            <Select
              mode="multiple"
              id="sessionType"
              style={{ width: '100%' }}
              placeholder="Click to select session No."
              optionFilterProp="children"
              onChange={this.onSelectSessionChange}
              size="large"
              value={session}
            >
              {Object.entries(readableSessionNamePairs).map(
                ([value, label]) => (
                  <Option key={value} value={value}>
                    {label}
                  </Option>
                )
              )}
            </Select>
          </InputDiv>

          {role === 'admin' && (
            <InputDiv>
              <Label htmlFor="localLead">Local lead(s):</Label>
              <Select
                mode="multiple"
                id="localLead"
                style={{ width: '100%' }}
                placeholder="localLeads"
                onChange={this.onSelectLocalleadChange}
                size="large"
                value={localLead}
              >
                {localLeadsList.map(loLead => (
                  <Option key={loLead._id} value={loLead._id}>
                    {loLead.name}
                  </Option>
                ))}
              </Select>
            </InputDiv>
          )}

          {role !== trainer && (
            <InputDiv>
              <Label htmlFor="region">Trainer(s):</Label>
              <Select
                mode="multiple"
                id="region"
                showSearch
                style={{ width: '100%' }}
                placeholder="trainer"
                optionFilterProp="children"
                onChange={this.onSelectTrainerChange}
                size="large"
                value={trainer}
              >
                {role === 'admin' &&
                  trainers.map(tra => (
                    <Option key={tra._id} value={tra._id}>
                      {tra.name}
                    </Option>
                  ))}
                {role === 'localLead' &&
                  localLeadTrainersGroup.map(tra => (
                    <Option key={tra._id} value={tra._id}>
                      {tra.name}
                    </Option>
                  ))}
              </Select>
            </InputDiv>
          )}

          <InputDiv>
            <Label htmlFor="region">Region(s):</Label>
            <Select
              mode="multiple"
              id="region"
              showSearch
              style={{ width: '100%' }}
              placeholder="Region"
              optionFilterProp="children"
              onChange={this.onSelectRegionChange}
              size="large"
              value={region}
            >
              {regions.map(reg => (
                <Option key={reg} value={reg}>
                  {reg}
                </Option>
              ))}
            </Select>
          </InputDiv>

          <InputDiv>
            <Label htmlFor="age">Age(s):</Label>
            <Select
              mode="multiple"
              id="age"
              showSearch
              style={{ width: '100%' }}
              placeholder="Ages"
              optionFilterProp="children"
              onChange={this.onSelectAgeChange}
              size="large"
              value={age}
            >
              {ages.map(a => (
                <Option key={a} value={a}>
                  {a}
                </Option>
              ))}
            </Select>
          </InputDiv>

          <InputDiv>
            <Label htmlFor="gender">Gender:</Label>
            <Select
              mode="multiple"
              id="gender"
              showSearch
              style={{ width: '100%' }}
              placeholder="Gender"
              optionFilterProp="children"
              onChange={this.onSelectGenderChange}
              size="large"
              value={gender}
            >
              {genders.map(gen => (
                <Option key={gen} value={gen}>
                  {gen}
                </Option>
              ))}
            </Select>
          </InputDiv>

          <InputDiv>
            <Label htmlFor="ethnics">Ethnicity:</Label>
            <Select
              mode="multiple"
              id="ethnics"
              showSearch
              style={{ width: '100%' }}
              placeholder="Ethnicity"
              optionFilterProp="children"
              onChange={this.onSelectEthnicityChange}
              size="large"
              value={ethnicity}
            >
              {ethnics.map(ethnic => (
                <Option key={ethnic} value={ethnic}>
                  {ethnic}
                </Option>
              ))}
            </Select>
          </InputDiv>

          <InputDiv>
            <Label htmlFor="workforce">Workforce:</Label>
            <Select
              mode="multiple"
              id="workforce"
              showSearch
              style={{ width: '100%' }}
              placeholder="Workforce"
              optionFilterProp="children"
              onChange={this.onSelectWorkforceChange}
              size="large"
              value={workforce}
            >
              {workforces.map(wforce => (
                <Option key={wforce} value={wforce}>
                  {wforce}
                </Option>
              ))}
            </Select>
          </InputDiv>

          <InputDiv>
            <ClearBtn type="button" onClick={this.clearAllFilter}>
              <i className="fas fa-times" style={{ marginRight: '10px' }} />
              Clear all filters
            </ClearBtn>
          </InputDiv>

          <InputDiv>
            <Button
              type="primary"
              label="Apply filters"
              height="40px"
              width="100%"
            />
          </InputDiv>
        </Form>
      </FilterWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    id: state.auth.id,
    role: state.auth.role,
    currentUser: state.auth,
    localLeadTrainersGroup: state.fetchedData.localLeadGroup,
    localLeadsList: state.fetchedData.localLeadsList,
    trainers: state.trainers.trainers,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchLocalLeadTrainersGroup,
    fetchLocalLeads: fetchLocalLeadsAction,
    fetchAllTrainers: fetchAllTrainersAction,
  }
)(FilterResults);
