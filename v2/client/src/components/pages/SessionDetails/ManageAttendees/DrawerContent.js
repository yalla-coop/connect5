import React from 'react';

import UpdateAttendeesList from './UpdateAttendeesList';
import AddAttendees from './AddAttendees';
import SendReminderEmails from './SendReminderEmails';
import ViewEmailsList from './ViewEmailsList';
import EmailTemplate from './EmailTemplate';

const DrawerContent = ({
  loading,
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
          loading={loading}
        />
      );
    case 'addAttendees':
      return (
        <AddAttendees
          addedAttendeesList={addedAttendeesList}
          handleAddAttendees={handleAddAttendees}
          submitAddAttendeesList={submitAddAttendeesList}
          loading={loading}
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
          loading={loading}
        />
      );

    case 'viewEmails':
      return (
        <ViewEmailsList
          reminderEmails={reminderEmails}
          handleDrawerOpen={handleDrawerOpen}
          loading={loading}
        />
      );

    case 'emailTemplate':
      return <EmailTemplate activeEmailTemplate={activeEmailTemplate} />;

    default:
      return null;
  }
};

export default DrawerContent;
