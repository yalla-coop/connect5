// renders chart js graphs for trainer feedback

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Empty } from 'antd';

import Spin from '../Spin';
import { Container } from './Feedback.style';

import Feedback from '../D3Charts/Feedback';

import FilterResults from '../FilterResults';

import { fetchTrainerFeedback as fetchTrainerFeedbackAction } from '../../../actions/users';
import { WhiteWrapper } from '../BehavioralInsight/BehavioralInsight.style';

class TrainerFeedbackOverall extends Component {
  state = {
    showCharts: true,
  };

  componentDidMount() {
    const { defaultFilters } = this.props;
    this.getData(defaultFilters);
  }

  componentDidUpdate(prevProps) {
    const { role: oldRole } = prevProps;
    const { role, defaultFilters } = this.props;
    if (role !== oldRole) {
      this.getData(defaultFilters);
    }
  }

  handleFilteredData = filters => {
    this.getData(filters);
  };

  getData = filters => {
    const { fetchTrainerFeedback } = this.props;
    this.setState({ showCharts: false }, () => {
      fetchTrainerFeedback(filters, this.setShowCharts);
    });
  };

  setShowCharts = () => {
    this.setState({ showCharts: true });
  };

  render() {
    const {
      loaded,
      feedbackData,
      showFilters,
      role,
      defaultFilters,
      hiddenFields,
      surveyList,
    } = this.props;
    const { showCharts } = this.state;

    if (loaded) {
      return (
        <Container>
          <WhiteWrapper>
            {showFilters && (
              <FilterResults
                role={role}
                handleFilteredData={this.handleFilteredData}
                defaultFilters={defaultFilters}
                hiddenFields={hiddenFields}
              />
            )}
            {showCharts ? (
              <>
                {Object.keys(feedbackData).length > 0 ? (
                  <>
                    <Feedback feedback={feedbackData} surveyList={surveyList} />
                  </>
                ) : (
                  <div>
                    <Empty description="No results matched" />
                  </div>
                )}
              </>
            ) : (
              <Spin style={{ width: '100%', padding: '40px' }} />
            )}
          </WhiteWrapper>
        </Container>
      );
    }
    return <Spin />;
  }
}

const mapStateToProps = state => ({
  feedbackData: state.trainerFeedback.feedback,
  loaded: state.trainerFeedback.loaded,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { fetchTrainerFeedback: fetchTrainerFeedbackAction }
)(TrainerFeedbackOverall);
