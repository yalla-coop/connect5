/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
import React, { Component } from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import FilterResults from '../FilterResults';

import { fetchTrainerBehavioral as fetchbehavioralInsightAction } from '../../../actions/behavioralInsight';
import Explanation from './Explanation';

import BehavioralInsight from '../D3Charts/BehavioralInsight';

import { Wrapper, ContentWrapper } from './BehavioralInsight.style';

class BehavioralTrainerResults extends Component {
  state = {
    showCharts: true,
  };

  componentDidMount() {
    const { defaultFilters = {} } = this.props;
    this.getData(defaultFilters);
  }

  getData = filters => {
    const { fetchTrainerBehavioral } = this.props;
    this.setState({ showCharts: false }, () => {
      fetchTrainerBehavioral(filters, this.setShowCharts);
    });
  };

  handleFilteredData = filters => {
    this.getData(filters);
  };

  setShowCharts = () => {
    this.setState({ showCharts: true });
  };

  render() {
    const {
      data,
      loaded,
      defaultFilters,
      hiddenFields,
      role,
      showFilters,
      surveyList,
    } = this.props;

    const { showCharts } = this.state;

    const { categorized, nonCategorized } = data;

    return (
      <Wrapper>
        <ContentWrapper>
          {loaded ? (
            <>
              {showFilters && (
                <FilterResults
                  role={role}
                  handleFilteredData={this.handleFilteredData}
                  defaultFilters={defaultFilters}
                  hiddenFields={hiddenFields}
                />
              )}
              <Explanation />

              {showCharts ? (
                <BehavioralInsight
                  categorized={categorized}
                  nonCategorized={nonCategorized}
                  surveyList={surveyList}
                />
              ) : (
                <Spin style={{ width: '100%', padding: '40px' }} />
              )}
            </>
          ) : (
            <Spin style={{ width: '100%', padding: '40px' }} />
          )}
        </ContentWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  data: state.behavioralInsight.data,
  loaded: state.behavioralInsight.loaded,
  role: state.auth.role,
});

export default connect(
  mapStateToProps,
  { fetchTrainerBehavioral: fetchbehavioralInsightAction }
)(BehavioralTrainerResults);
