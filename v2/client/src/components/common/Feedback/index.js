// renders chart js graphs for trainer feedback

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spin from '../Spin';
import { Container } from './Feedback.style';

import Feedback from '../D3Charts/Feedback';

import FilterResults from '../FilterResults';

import { fetchTrainerFeedback as fetchTrainerFeedbackAction } from '../../../actions/users';
import { WhiteWrapper } from '../BehavioralInsight/BehavioralInsight.style';

class TrainerFeedbackOverall extends Component {
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
    fetchTrainerFeedback(filters);
  };

  render() {
    const {
      loaded,
      feedbackData,
      showFilters,
      role,
      defaultFilters,
      hiddenFields,
    } = this.props;

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
            <Feedback feedback={feedbackData} />
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
