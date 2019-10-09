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
    const { fetchTrainerFeedback, isTrainTrainersFeedback } = this.props;
    this.setState({ showCharts: false }, () => {
      fetchTrainerFeedback(
        filters,
        isTrainTrainersFeedback,
        this.setShowCharts
      );
    });
  };

  setShowCharts = () => {
    this.setState({ showCharts: true });
  };

  render() {
    const {
      loaded,
      trainerFeedback,
      trainTrainersFeedback,
      showFilters,
      role,
      defaultFilters,
      hiddenFields,
      surveyList,
      isTrainTrainersFeedback,
    } = this.props;
    const { showCharts } = this.state;

    const data = isTrainTrainersFeedback
      ? trainTrainersFeedback
      : trainerFeedback;

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
                {Object.keys(data).length > 0 ? (
                  <>
                    <Feedback
                      feedback={data}
                      surveyList={surveyList}
                      isTrainTrainersFeedback={isTrainTrainersFeedback}
                    />
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
  trainerFeedback: state.trainerFeedback.feedback,
  trainTrainersFeedback: state.trainerFeedback.trainTrainersFeedback,
  loaded: state.trainerFeedback.loaded,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { fetchTrainerFeedback: fetchTrainerFeedbackAction }
)(TrainerFeedbackOverall);
