import React from 'react';
import { Icon, Select, Button, Checkbox } from 'antd';
import moment from 'moment';

import {
  SubDetails,
  DrawerLink,
  Row,
  DrawerContentWrapper,
  CheckboxWrapper,
  TableWrapper,
  TableHeader,
  Text,
  EmailWrapper,
  EmailText,
  BoldSpan,
} from '../SessionDetails.Style';

const CheckboxGroup = Checkbox.Group;

const { Option } = Select;

const DrawerContent = ({
  drawerKey,
  // update
  handleSubmitUpdateAttendees,
  confirmedAttendeesList,
  handleUpdateAttendees,
  // add
  handleAddAttendees,
  addedAttendeesList,
  submitAddAttendeesList,
  // send emails
  changeSelectedEmails,
  checkedEmails,
  isCheckAll,
  onCheckAllChange,
  submitSendReminderEmail,
  // emails list
  reminderEmails,
  handleDrawerOpen,
  // email template
  activeEmailTemplate,
}) => {
  switch (drawerKey) {
    case 'viewAttendeesList':
      return (
        <UpdateAttendeesList
          handleSubmitUpdateAttendees={handleSubmitUpdateAttendees}
          confirmedAttendeesList={confirmedAttendeesList}
          handleUpdateAttendees={handleUpdateAttendees}
        />
      );
    case 'addAttendees':
      return (
        <AddAttendees
          addedAttendeesList={addedAttendeesList}
          handleAddAttendees={handleAddAttendees}
          submitAddAttendeesList={submitAddAttendeesList}
        />
      );

    case 'sendEmails':
      return (
        <SendReminderEmails
          confirmedAttendeesList={confirmedAttendeesList}
          changeSelectedEmails={changeSelectedEmails}
          checkedEmails={checkedEmails}
          isCheckAll={isCheckAll}
          onCheckAllChange={onCheckAllChange}
          submitSendReminderEmail={submitSendReminderEmail}
        />
      );

    case 'viewEmails':
      return (
        <ViewEmailsList
          reminderEmails={reminderEmails}
          handleDrawerOpen={handleDrawerOpen}
        />
      );

    case 'emailTemplate':
      return <EmailTemplate activeEmailTemplate={activeEmailTemplate} />;

    default:
      return null;
  }
};

const UpdateAttendeesList = ({
  handleSubmitUpdateAttendees,
  confirmedAttendeesList,
  handleUpdateAttendees,
}) => {
  return (
    <DrawerContentWrapper>
      <Select
        mode="tags"
        value={confirmedAttendeesList}
        placeholder="Select users"
        onChange={handleUpdateAttendees}
        style={{ width: '100%' }}
        size="large"
      >
        {confirmedAttendeesList.map(item => (
          <Option value={item}>{item}</Option>
        ))}
      </Select>

      <Button
        type="primary"
        style={{
          width: '100%',
          marginTop: '2rem',
          fontSize: '19px',
          fontWeight: 'bold',
          padding: '0.5rem 1rem',
          height: 'auto',
        }}
        onClick={handleSubmitUpdateAttendees}
      >
        Update
      </Button>
    </DrawerContentWrapper>
  );
};

const AddAttendees = ({
  handleAddAttendees,
  addedAttendeesList,
  submitAddAttendeesList,
}) => {
  return (
    <DrawerContentWrapper>
      <Select
        mode="tags"
        value={addedAttendeesList}
        placeholder="Select users"
        onChange={handleAddAttendees}
        style={{ width: '100%' }}
        size="large"
      >
        {addedAttendeesList.map(item => (
          <Option value={item}>{item}</Option>
        ))}
      </Select>

      <Button
        type="primary"
        style={{
          width: '100%',
          marginTop: '2rem',
          fontSize: '19px',
          fontWeight: 'bold',
          padding: '0.5rem 1rem',
          height: 'auto',
        }}
        onClick={submitAddAttendeesList}
      >
        Add Attendees
      </Button>
    </DrawerContentWrapper>
  );
};

const SendReminderEmails = ({
  confirmedAttendeesList,
  changeSelectedEmails,
  checkedEmails,
  isCheckAll,
  onCheckAllChange,
  submitSendReminderEmail,
}) => {
  return (
    <DrawerContentWrapper>
      <h5>Send Reminder Email</h5>
      <CheckboxWrapper>
        <div style={{ borderBottom: '1px solid #8080804d', padding: '1rem 0' }}>
          <Checkbox onChange={onCheckAllChange} checked={isCheckAll}>
            Check all
          </Checkbox>
        </div>

        <CheckboxGroup
          options={confirmedAttendeesList}
          value={checkedEmails}
          onChange={changeSelectedEmails}
        />
      </CheckboxWrapper>
      <Button
        type="primary"
        style={{
          width: '100%',
          marginTop: '2rem',
          fontSize: '19px',
          fontWeight: 'bold',
          padding: '0.5rem 1rem',
          height: 'auto',
        }}
        onClick={submitSendReminderEmail}
        disabled={checkedEmails.length < 1}
      >
        Send Reminder
      </Button>
    </DrawerContentWrapper>
  );
};

const ViewEmailsList = ({ reminderEmails, handleDrawerOpen }) => {
  return (
    <div>
      <TableWrapper>
        <TableHeader>
          <Text>Date</Text>
          <Text>Info</Text>
        </TableHeader>
        {reminderEmails &&
          reminderEmails.map((reminderEmail, index) => (
            <SubDetails
              style={{ padding: '1rem 0', borderTop: '1px solid #80808059' }}
            >
              <Row
                onClick={handleDrawerOpen}
                data-key="emailTemplate"
                data-email-index={index}
              >
                <DrawerLink>
                  {moment(reminderEmail.sendDate).format('DD-MM-YYYY')}
                </DrawerLink>
                <Icon type="right" />
              </Row>
            </SubDetails>
          ))}
      </TableWrapper>
    </div>
  );
};

const EmailTemplate = ({ activeEmailTemplate }) => {
  return (
    <div>
      <EmailWrapper>
        <div>
          <Text>
            Date:{' '}
            {activeEmailTemplate
              ? moment(activeEmailTemplate.sendDate).format('DD-MM-YYYY')
              : 'N/A'}
          </Text>
        </div>
        <div>
          <Text>Message:</Text>
        </div>
        <EmailText>Dear course participants,</EmailText>
        <EmailText>
          This is a friendly reminder related to the following Connect 5
          training session:
        </EmailText>
        <ul style={{ paddingLeft: '2rem', marginTop: '1rem' }}>
          <li>
            <EmailText>
              <BoldSpan>Session Date:</BoldSpan>{' '}
              {activeEmailTemplate.sessionDate || 'N/A'}
            </EmailText>
          </li>
          <li>
            <EmailText>
              <BoldSpan>Session Type:</BoldSpan>{' '}
              {activeEmailTemplate.sessionType || 'N/A'}
            </EmailText>
          </li>
          <li>
            <EmailText>
              <BoldSpan>Location: </BoldSpan>{' '}
              {activeEmailTemplate.location || 'N/A'}
            </EmailText>
          </li>
          <li>
            <EmailText>
              <BoldSpan>time: From</BoldSpan>{' '}
              {activeEmailTemplate.startTime || 'N/A'} <BoldSpan>To</BoldSpan>{' '}
              {activeEmailTemplate.endTime || 'N/A'}
            </EmailText>
          </li>
          <li>
            <EmailText>
              <BoldSpan>Trainer(s):</BoldSpan>{' '}
              {activeEmailTemplate.trainers || 'N/A'}
            </EmailText>
          </li>
        </ul>
        <EmailText>
          To track your own progress and to ensure that our trainings are
          effective we would rely on course participants to fill out surveys for
          each session. All the data is anonymised. After answering surveys you
          can immediately see your own progress and access certificates via the
          app.
        </EmailText>
        {activeEmailTemplate.preServeyLink && (
          <>
            <EmailText>
              Before starting the training session please follow this link and
              fill out the pre-survey. After the session please click this link
              and fill out the{' '}
              <a
                href={activeEmailTemplate.preServeyLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                post-survey
              </a>
              .
            </EmailText>
          </>
        )}
        <br />
        <EmailText>Sincerely,</EmailText>
        <EmailText>Your Connect 5 team</EmailText>
      </EmailWrapper>
    </div>
  );
};

export default DrawerContent;
