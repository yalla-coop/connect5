// renders chart js graphs for trainer feedback

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import Spin from '../Spin';
import { Wrapper, Description, Container } from './Feedback.style';

import HorizontalBarComponent from './HorizontalBarComponent';
import FilterResults from '../FilterResults';

import { fetchTrainerFeedback as fetchTrainerFeedbackAction } from '../../../actions/users';
import {
  WhiteWrapper,
  FilterHeader,
} from '../BehavioralInsight/BehavioralInsight.style';

class TrainerFeedbackOverall extends Component {
  state = {
    showFilter: false,
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    const { role: oldRole } = prevProps;
    const { role } = this.props;
    if (role !== oldRole) {
      this.getData();
    }
  }

  isFilterActive = () => {
    this.setState({ showFilter: !this.state.showFilter });
  };

  renderData = () => {
    const { showFilter } = this.state;
    const { loaded, feedbackData } = this.props;
    if (feedbackData.length === 0) {
      return <Description>no data collected yet :( </Description>;
    }
    if (loaded) {
      if (showFilter) {
        return (
          <Container>
            <FilterResults />
          </Container>
        );
      }
      return (
        <Container>
          <WhiteWrapper>
            <HorizontalBarComponent feedbackData={feedbackData} />
          </WhiteWrapper>
        </Container>
      );
    }
    return <Spin />;
  };

  getData = () => {
    const {
      fetchTrainerFeedback,
      trainerId,
      sessionId,
      surveyType,
      role,
    } = this.props;
    fetchTrainerFeedback({ trainerId, sessionId, surveyType, role });
  };

  render() {
    const { showFilter } = this.state;
    return (
      <Wrapper>
        <FilterHeader onClick={this.isFilterActive}>
          FILTER RESULTS
          <Icon
            type={`caret-${showFilter ? 'up' : 'down'}`}
            style={{ color: '#fff', fontSize: '25px', paddingLeft: '5px' }}
          />
        </FilterHeader>
        {this.renderData()}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  feedbackData: state.trainerFeedback.trainer.data,
  loaded: state.trainerFeedback.trainer.loaded,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { fetchTrainerFeedback: fetchTrainerFeedbackAction }
)(TrainerFeedbackOverall);
