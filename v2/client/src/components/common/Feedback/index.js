// renders chart js graphs for trainer feedback

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import Spin from '../Spin';
import { Wrapper, Description, Container } from './Feedback.style';

import Feedback from '../D3Charts/Feedback';

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
    const { showFilter } = this.state;
    this.setState({ showFilter: !showFilter });
  };

  renderData = () => {
    const { showFilter } = this.state;
    const { loaded, feedbackData } = this.props;
    if (!feedbackData || !Object.keys(feedbackData).length) {
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
            <Feedback feedback={feedbackData} />
          </WhiteWrapper>
        </Container>
      );
    }
    return <Spin />;
  };

  getData = () => {
    const { fetchTrainerFeedback, filters } = this.props;

    fetchTrainerFeedback(filters);
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
  feedbackData: state.trainerFeedback.feedback,
  loaded: state.trainerFeedback.loaded,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { fetchTrainerFeedback: fetchTrainerFeedbackAction }
)(TrainerFeedbackOverall);
