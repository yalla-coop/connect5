import React from 'react';

import { DatePicker, Empty, Popconfirm, TimePicker } from 'antd';
import moment from 'moment';

import EditEmail from '../../../common/EditEmail';
import Button from '../../../common/Button';
import UpdateAttendeesList from '../ManageAttendees/UpdateAttendeesList';
import {
  SubDetails,
  DrawerLink,
  Row,
  TableWrapper,
  TableHeader,
  Text,
  FormWrapper,
} from '../SessionDetails.Style';

const format = 'HH:mm';

const DrawerContent = ({
  loading,
  handleSelectDate,
  handleSubmitSchedule,
  scheduledEmails,
  type,
  handleCancelEmail,
  handleSelectTime,
  drawerKey,
  sessionDetails,
  handleAddEmailsClick,
}) => {
  const filteredScheduledEmails = scheduledEmails.filter(scheduledEmail =>
    scheduledEmail.surveyType.includes(type)
  );

  switch (drawerKey) {
    case 'scheduleTable':
      return (
        <div>
          <FormWrapper>
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <DatePicker
                onChange={handleSelectDate}
                placeholder="Select date"
                size="large"
                style={{ width: '60%', marginBottom: '1rem' }}
              />
              <TimePicker
                onChange={handleSelectTime}
                style={{ width: '35%', marginBottom: '1rem' }}
                format={format}
                minuteStep="60"
                size="large"
              />
            </div>

            <Button
              type="primary"
              label="Schedule"
              style={{ width: '100%' }}
              loading={loading}
              disabled={loading}
              onClick={handleSubmitSchedule}
            />
          </FormWrapper>
          {filteredScheduledEmails && filteredScheduledEmails.length > 0 ? (
            <TableWrapper>
              <TableHeader>
                <Text>
                  Currently scheduled{' '}
                  {type.includes('pre') ? 'Pre-Session' : 'Post-Session'} Survey
                  Email
                </Text>
              </TableHeader>
              {filteredScheduledEmails.map(scheduledEmail => (
                <SubDetails
                  key={scheduledEmail._id}
                  style={{
                    padding: '1rem 0',
                    borderTop: '1px solid #80808059',
                  }}
                >
                  <Row enabled>
                    {moment(scheduledEmail.date).format('DD-MM-YYYY')}
                    <Popconfirm
                      title="Are you sure you want to cancel this email?"
                      onConfirm={() => handleCancelEmail(scheduledEmail._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DrawerLink style={{ cursor: 'pointer' }}>
                        Cancel
                      </DrawerLink>
                    </Popconfirm>
                  </Row>
                </SubDetails>
              ))}
            </TableWrapper>
          ) : (
            <Empty
              description="No Emails Scheduled"
              style={{ marginTop: '5rem' }}
            />
          )}
        </div>
      );

    case 'sendSurveyLinkEmail':
      return (
        <EditEmail
          participantEmails={[]}
          type="surveyLink"
          trainer="name"
          sessionDate={sessionDetails.date}
          sessionType={sessionDetails.type}
          address={sessionDetails.address}
          trainers={sessionDetails.trainers}
          startTime={sessionDetails.startTime}
          endTime={sessionDetails.endTime}
          shortId={sessionDetails.shortId}
          sessionId={sessionDetails._id}
          backCallback="onClose"
          handleAddEmailsClick={handleAddEmailsClick}
        />
      );

    case 'addAttendees':
    // return (
    //   <UpdateAttendeesList
    //     handleSubmitUpdateAttendees={handleSubmitUpdateAttendees}
    //     confirmedAttendeesList={confirmedAttendeesList}
    //     handleUpdateAttendees={handleUpdateAttendees}
    //     onSelectBlur={onSelectBlur}
    //     onSelectFocus={onSelectFocus}
    //     onCopy={onCopy}
    //     onClear={onClear}
    //     loading={loading}
    //   />
    // );
    default:
      return null;
  }
};

export default DrawerContent;
