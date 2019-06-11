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

    // whenever user click on save button call updateEmails action to update Emails List
    this.props.updateEmails(_id, participantsEmails);
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
    const surveyURL = `${window.location.host}/survey/${type}${_id}`;
    const preSurveyUrl = `${window.location.host}/survey/0${_id}`;
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
          {type === '1' || type === 'train-trainers' ? (
            <>
              <SurveyContent
                subId="1"
                type="Pre-survey"
                surveyURL={preSurveyUrl}
                id={_id}
              />
              <SurveyContent
                subId="2"
                type={type}
                surveyURL={surveyURL}
                id={_id}
              />
            </>
          ) : (
            <SurveyContent
              subId="3"
              type={type}
              surveyURL={surveyURL}
              id={_id}
            />
          )}
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
