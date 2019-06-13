/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Button } from 'antd';
import SurveyContent from './SurveyContent';
import Modal from '../../../common/modal';
import { updateEmails } from '../../../../actions/groupSessionsAction';
import { ModalStyle } from '../../../common/List/List.style';
import {
  SessionSurveysWrapper,
  SessionSurveyContainer,
  Buttons,
  AttendeeBtn,
  ModalButtonsDiv,
} from './SessionSurveys.Style';

const { Option } = Select;

const surveyType = {
  1: ['pre-day-1', 'post-day-1'],
  2: ['post-day-2'],
  3: ['post-day-3'],
  'special-2-days': ['pre-special', 'post-special'],
  'train-trainers': ['pre-train-trainers', 'post-train-trainers'],
};

class SessionSurveys extends Component {
  state = {
    modalOpen: false,
    participantsEmails: null,
  };

  toggleModal = participantsEmails => {
    const { modalOpen } = this.state;
    this.setState({ modalOpen: !modalOpen, participantsEmails });
  };

  saveEmails = _id => {
    const { participantsEmails } = this.state;
    const { updateEmails } = this.props;

    // whenever user click on save button call updateEmails action to update Emails List
    updateEmails(_id, participantsEmails);
    this.toggleModal();
  };

  onEmailChange = value => {
    this.setState({
      participantsEmails: value,
    });
  };

  render() {
    const { modalOpen } = this.state;
    const { sessionDetails } = this.props;
    const { type, _id, participantsEmails } = sessionDetails;
    const { toggleModal, onEmailChange, saveEmails } = this;
    const links = surveyType[type].map(item => {
      return `${window.location.host}/survey/${item}&${_id}`;
    });

    const modalContent = participantsEmails && (
      <>
        <Select
          mode="tags"
          size="large"
          placeholder="emails"
          onChange={onEmailChange}
          defaultValue={participantsEmails}
          style={{ width: '100%', height: '100%' }}
        >
          {participantsEmails.map(email => (
            <Option key={email} value={email}>
              {email}
            </Option>
          ))}
        </Select>
        <ModalButtonsDiv>
          <Button
            type="primary"
            size="large"
            style={{ display: 'inline-block', marginRight: '1rem' }}
            onClick={() => saveEmails(_id)}
          >
            save
          </Button>
          <Button
            type="default"
            size="large"
            style={{ display: 'inline-block' }}
            onClick={toggleModal}
          >
            cancel
          </Button>
        </ModalButtonsDiv>
      </>
    );

    return (
      <SessionSurveysWrapper>
        <SessionSurveyContainer>
          {surveyType[type].map(survey => {
            return (
              <SurveyContent
                subId="1"
                type={survey}
                surveyURL={links[0]}
                id={_id}
              />
            );
          })}
        </SessionSurveyContainer>
        <Buttons>
          <AttendeeBtn onClick={() => toggleModal(participantsEmails)}>
            View Attendees List
          </AttendeeBtn>
        </Buttons>
        <Modal
          isOpen={modalOpen}
          onClose={toggleModal}
          content={modalContent}
          extraModalStyle={ModalStyle}
        />
      </SessionSurveysWrapper>
    );
  }
}

export default connect(
  null,
  { updateEmails }
)(SessionSurveys);
