/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Button, Modal as AntdModal } from 'antd';

import SurveyContent from './SurveyContent';
import Modal from '../../../common/modal';
import {
  updateEmails,
  sendEmails,
} from '../../../../actions/groupSessionsAction';
import { ModalStyle } from '../../../common/List/List.style';
import AntdInfoModal from '../../../common/AntdModal';
import {
  SessionSurveysWrapper,
  SessionSurveyContainer,
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

  handleEmailing = (surveyURL, surveyType) => {
    const { sessionDetails } = this.props;
    const { sendEmails } = this.props;

    const { participantsEmails } = sessionDetails;

    if (participantsEmails.length < 1) {
      return AntdModal.error({
        title: 'No participants in this session',
        content:
          'You may need to add participants to be able to send the survey',
      });
    }

    return AntdModal.info({
      title:
        'Do you want to send the survey link to all participants by emails?',
      content: (
        <div>
          <p>click on {'Ok'} to send the survey link to all the participants</p>
        </div>
      ),
      onOk() {
        sendEmails({
          surveyURL,
          participantsList: participantsEmails,
          surveyType,
        });
      },
    });
  };

  render() {
    const { modalOpen } = this.state;
    const { sessionDetails } = this.props;
    const { type, _id, shortId, participantsEmails } = sessionDetails;
    const { toggleModal, onEmailChange, saveEmails } = this;
    const links = surveyType[type].map(item => {
      return `${window.location.host}/survey/${item}&${shortId}`;
    });

    const modalContent = participantsEmails && (
      <>
        <Select
          mode="tags"
          size="large"
          placeholder="emails"
          onChange={onEmailChange}
          defaultValue={participantsEmails.map(item => item.email)}
          style={{ width: '100%', height: '100%' }}
        >
          {participantsEmails.map(item => (
            <Option key={item.email} value={item.email}>
              {item.email}
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

    const content =
      'To share the surveys for this session please share the link with your attendees. You can send it directly via email clicking on "Email surveys to attendees" or schedule emails using the "Schedule emails" option.';
    return (
      <SessionSurveysWrapper>
        <AntdInfoModal
          title="About this section"
          content={content}
          btnStyle={{ margin: '1.5rem' }}
          style={{ top: '20' }}
        />
        <SessionSurveyContainer>
          {surveyType[type].map((survey, index) => {
            return (
              <SurveyContent
                subId={survey}
                type={survey}
                surveyURL={links[index]}
                id={_id}
                handleEmailing={this.handleEmailing}
                key={survey}
              />
            );
          })}
        </SessionSurveyContainer>
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

const mapStateToProps = state => ({
  emailSuccess: state.groups.emailSuccess,
});

export default connect(
  mapStateToProps,
  { updateEmails, sendEmails }
)(SessionSurveys);
