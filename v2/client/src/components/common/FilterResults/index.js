import React, { Component } from 'react';

import { Select, Icon } from 'antd';

import { connect } from 'react-redux';
import { FilterHeader } from '../BehavioralInsight/BehavioralInsight.style';
import {
  setFilters as setFiltersAction,
  resetFilters as resetFiltersAction,
} from '../../../actions/filters';

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

class FilterResults extends Component {
  state = {
    showFilter: false,
  };

  componentDidMount() {
    const {
      fetchLocalLeads,
      fetchAllTrainers,
      fetchLocalLeadTrainersGroup: fetchLocalLeadTrainersGroupAction,
      setFilters,
    } = this.props;
    const { id, role, defaultFilters } = this.props;

    if (role === 'localLead') {
      fetchLocalLeadTrainersGroupAction(id);
    } else {
      fetchAllTrainers();
      fetchLocalLeads();
    }

    if (defaultFilters) {
      Object.entries(defaultFilters).forEach(([key, value]) => {
        setFilters(value, key);
      });
    }
  }

  clearAllFilter = () => {
    const {
      resetFilters,
      defaultFilters,
      setFilters,
      handleFilteredData,
    } = this.props;

    resetFilters();
    if (defaultFilters) {
      Object.entries(defaultFilters).forEach(([key, value]) => {
        setFilters(value, key);
      });
    }

    handleFilteredData(defaultFilters);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.getData();
  };

  getData = () => {
    const {
      sessionType,
      region,
      localLead,
      trainer,
      age,
      gender,
      ethnicity,
      workforce,
      sessionId,
    } = this.props;

    const filteredData = {
      sessionType,
      region,
      localLead,
      trainer,
      age,
      gender,
      ethnicity,
      workforce,
      sessionId,
    };

    const filters = {};
    Object.entries(filteredData).forEach(([key, array]) => {
      if (array && array.length > 0) {
        filters[key] = array;
      }
    });

    const { handleFilteredData } = this.props;
    handleFilteredData(filters);
  };

  isFilterActive = () => {
    const { showFilter } = this.state;
    this.setState({ showFilter: !showFilter });
  };

  render() {
    const { showFilter } = this.state;

    const {
      localLeadsList,
      trainers,
      localLeadTrainersGroup,
      role,
      hiddenFields = [],
      setFilters,
      // filters
      sessionType,
      region,
      localLead,
      trainer,
      age,
      gender,
      ethnicity,
      workforce,
    } = this.props;

    return (
      <FilterWrapper>
        <FilterHeader onClick={this.isFilterActive}>
          FILTER RESULTS
          <Icon
            type={`caret-${showFilter ? 'up' : 'down'}`}
            style={{ color: '#fff', fontSize: '25px', paddingLeft: '5px' }}
          />
        </FilterHeader>

        {showFilter && (
          <Form onSubmit={this.handleSubmit}>
            {!hiddenFields.includes('sessionType') && (
              <InputDiv>
                <Label htmlFor="sessionType">Session Type(s):</Label>
                <Select
                  mode="multiple"
                  id="sessionType"
                  style={{ width: '100%' }}
                  placeholder="Click to select session No."
                  optionFilterProp="children"
                  onChange={values => setFilters(values, 'sessionType')}
                  size="large"
                  value={sessionType}
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
            )}

            {role === 'admin' && !hiddenFields.includes('localLead') && (
              <InputDiv>
                <Label htmlFor="localLead">Local lead(s):</Label>
                <Select
                  mode="multiple"
                  id="localLead"
                  style={{ width: '100%' }}
                  placeholder="localLeads"
                  onChange={values => setFilters(values, 'localLead')}
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

            {role !== 'trainer' && !hiddenFields.includes('trainer') && (
              <InputDiv>
                <Label htmlFor="region">Trainer(s):</Label>
                <Select
                  mode="multiple"
                  id="region"
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="trainer"
                  optionFilterProp="children"
                  onChange={values => setFilters(values, 'trainer')}
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

            {!hiddenFields.includes('region') && (
              <InputDiv>
                <Label htmlFor="region">Region(s):</Label>
                <Select
                  mode="multiple"
                  id="region"
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Region"
                  optionFilterProp="children"
                  onChange={values => setFilters(values, 'region')}
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
            )}

            {!hiddenFields.includes('age') && (
              <InputDiv>
                <Label htmlFor="age">Age(s):</Label>
                <Select
                  mode="multiple"
                  id="age"
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Ages"
                  optionFilterProp="children"
                  onChange={values => setFilters(values, 'age')}
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
            )}

            {!hiddenFields.includes('gender') && (
              <InputDiv>
                <Label htmlFor="gender">Gender:</Label>
                <Select
                  mode="multiple"
                  id="gender"
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Gender"
                  optionFilterProp="children"
                  onChange={values => setFilters(values, 'gender')}
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
            )}

            {!hiddenFields.includes('ethnics') && (
              <InputDiv>
                <Label htmlFor="ethnics">Ethnicity:</Label>
                <Select
                  mode="multiple"
                  id="ethnics"
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Ethnicity"
                  optionFilterProp="children"
                  onChange={values => setFilters(values, 'ethnicity')}
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
            )}

            {!hiddenFields.includes('workforce') && (
              <InputDiv>
                <Label htmlFor="workforce">Workforce:</Label>
                <Select
                  mode="multiple"
                  id="workforce"
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Workforce"
                  optionFilterProp="children"
                  onChange={values => setFilters(values, 'workforce')}
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
            )}

            <InputDiv>
              <ClearBtn type="button" onClick={this.clearAllFilter}>
                <i className="fas fa-times" style={{ marginRight: '10px' }} />
                Clear all filters
              </ClearBtn>
            </InputDiv>

            <InputDiv>
              <Button
                onClick={this.handleSubmit}
                type="primary"
                label="Apply filters"
                height="40px"
                width="100%"
              />
            </InputDiv>
          </Form>
        )}
      </FilterWrapper>
    );
  }
}

const mapStateToProps = state => {
  const {
    sessionType,
    region,
    localLead,
    trainer,
    age,
    gender,
    ethnicity,
    workforce,
    sessionId,
  } = state.filters;

  return {
    id: state.auth.id,
    currentUser: state.auth,
    localLeadTrainersGroup: state.fetchedData.localLeadGroup,
    localLeadsList: state.fetchedData.localLeadsList,
    trainers: state.trainers.trainers,
    sessionType,
    region,
    localLead,
    trainer,
    age,
    gender,
    ethnicity,
    workforce,
    sessionId,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchLocalLeadTrainersGroup,
    fetchLocalLeads: fetchLocalLeadsAction,
    fetchAllTrainers: fetchAllTrainersAction,
    setFilters: setFiltersAction,
    resetFilters: resetFiltersAction,
  }
)(FilterResults);
