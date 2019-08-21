// renders chart js graphs for trainer feedback

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';
import Spin from '../Spin';

import { Wrapper, Description, Container, ButtonDiv } from './Feedback.style';

import HorizontalBarComponent from './HorizontalBarComponent';

import { fetchTrainerFeedback as fetchTrainerFeedbackAction } from '../../../actions/users';
import { WhiteWrapper } from '../BehavioralInsight/BehavioralInsight.style';

class TrainerFeedbackOverall extends Component {
  state = { visible: false };

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

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { feedbackData, loaded } = this.props;
    const { visible } = this.state;

    return (
      <Wrapper>
        {loaded ? (
          <Container>
            <ButtonDiv>
              <Button onClick={this.showModal}>
                Find out more about this section
              </Button>
            </ButtonDiv>
            <Modal
              title="About this section"
              visible={visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              This section shows a break down of answers given by your course
              participants stemming from surveys responses (categories: about
              your way of teaching (train the trainer) and about your trainer
              (other session types). The numbers show the count of each answer
              related to a particular survey type).
            </Modal>

            {feedbackData.length === 0 ? (
              <Description>no data collected yet :( </Description>
            ) : (
              <WhiteWrapper>
                <HorizontalBarComponent feedbackData={feedbackData} />
              </WhiteWrapper>
            )}
          </Container>
        ) : (
          <Spin />
        )}
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
