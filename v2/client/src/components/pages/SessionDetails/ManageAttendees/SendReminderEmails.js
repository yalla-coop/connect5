import React from 'react';
import { Checkbox } from 'antd';

import Button from '../../../common/Button';
import EditEmail from '../../../common/EditEmail';

import { DrawerContentWrapper, CheckboxWrapper } from '../SessionDetails.Style';

const CheckboxGroup = Checkbox.Group;

const SendReminderEmails = ({
  confirmedAttendeesList,
  changeSelectedEmails,
  checkedEmails,
  isCheckAll,
  onCheckAllChange,
  submitSendReminderEmail,
  sessionDetails,
  loading,
}) => {
  // <DrawerContentWrapper>
  //   <h5>Send Reminder Email</h5>
  //   <CheckboxWrapper>
  //     <div style={{ borderBottom: '1px solid #8080804d', padding: '1rem 0' }}>
  //       <Checkbox onChange={onCheckAllChange} checked={isCheckAll}>
  //         Check all
  //       </Checkbox>
  //     </div>

  //     <CheckboxGroup
  //       options={confirmedAttendeesList}
  //       value={checkedEmails}
  //       onChange={changeSelectedEmails}
  //     />
  //   </CheckboxWrapper>
  //   <Button
  //     type="primary"
  //     style={{
  //       width: '100%',
  //       marginTop: '2rem',
  //       fontSize: '19px',
  //       fontWeight: 'bold',
  //       padding: '0.5rem 1rem',
  //       height: 'auto',
  //     }}
  //     onClick={submitSendReminderEmail}
  //     disabled={checkedEmails.length < 1}
  //     loading={loading}
  //     label="Send Reminder"
  //     >
  //     Send Reminder
  //   </Button>
  //     </DrawerContentWrapper>

  const surveyType = {
    1: ['pre-day-1', 'post-day-1'],
    2: ['post-day-2'],
    3: ['post-day-3'],
    'special-2-days': ['pre-special', 'post-special'],
    'train-trainers': ['pre-train-trainers', 'post-train-trainers'],
  };

  const links = surveyType[sessionDetails.type].map(item => {
    const surveyURL = `${window.location.host}/survey/${item}&${sessionDetails.shortId}`;
    let url = `https://${surveyURL}`;

    if (process.env.NODE_ENV === 'development') {
      url = `http://${surveyURL}`;
    }

    return url;
  });

  const preSurveyLink = links.find(item => item.includes('pre'));
  const postSurveyLink = links.find(item => item.includes('post'));

  return (
    <EditEmail
      participantEmails={sessionDetails.participantsEmails}
      // registration == invitation
      type="reminder"
      trainer="name"
      sessionDate={sessionDetails.date}
      sessionType={sessionDetails.type}
      address={sessionDetails.address}
      trainers={sessionDetails.trainers.map(item => item.name).join(' & ')}
      startTime={sessionDetails.startTime}
      endTime={sessionDetails.endTime}
      shortId={sessionDetails.shortId}
      sessionId={sessionDetails._id}
      extraInfo="extraInfo"
      backCallback="onClose"
      preSurveyLink={preSurveyLink}
      postSurveyLink={postSurveyLink}
    />
  );
};

export default SendReminderEmails;
