import React, { Component } from 'react';
import { Spin } from 'antd';

import { connect } from 'react-redux';

import { fetchTrainerBehavioral as fetchTrainerBehavioralAction } from '../../../actions/behavioralInsight';
import Explanation from './Explanation';
import BehavioralInsight from '../D3Charts/BehavioralInsight';

import { Wrapper, ContentWrapper } from './BehavioralInsight.style';

class BehavioralSurveyResults extends Component {
  componentDidMount() {
    const { sessionId, surveyType, fetchTrainerBehavioral } = this.props;
    const filters = { sessionId, surveyType: [surveyType] };
    fetchTrainerBehavioral(`/api/behavioral-insight/`, filters);
  }

  render() {
    const { data, loaded } = this.props;
    const { categorized, nonCategorized } = data;
    return (
      <Wrapper>
        <Explanation />
        <ContentWrapper>
          {loaded ? (
            <>
              <BehavioralInsight
                categorized={categorized}
                nonCategorized={nonCategorized}
              />
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
});

export default connect(
  mapStateToProps,
  { fetchTrainerBehavioral: fetchTrainerBehavioralAction }
)(BehavioralSurveyResults);
