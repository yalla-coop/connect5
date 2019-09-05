import React from 'react';

import UpdateAttendeesList from './UpdateAttendeesList';
import SendReminderEmails from './SendReminderEmails';
import ViewEmailsList from './ViewEmailsList';
import EmailTemplate from './EmailTemplate';
import SpecialRequirements from './SpecialRequirements';

const DrawerContent = ({
  sessionDetails,
  loading,
  drawerKey,
  onSelectBlur,
  onSelectFocus,
  onCopy,
  onClear,
  // update
  handleSubmitUpdateAttendees,
  confirmedAttendeesList,
  handleUpdateAttendees,
  // send emails
  handleAddEmailsClick,
  // emails list
  reminderEmails,
  handleDrawerOpen,
  // email template
  activeEmailTemplate,
  // special requirements
  specialRequirements,
}) => {
  switch (drawerKey) {
    case 'viewAttendeesList':
      return (
        <UpdateAttendeesList
          handleSubmitUpdateAttendees={handleSubmitUpdateAttendees}
          confirmedAttendeesList={confirmedAttendeesList}
          handleUpdateAttendees={handleUpdateAttendees}
          onSelectBlur={onSelectBlur}
          onSelectFocus={onSelectFocus}
          onCopy={onCopy}
          onClear={onClear}
          loading={loading}
        />
      );

    case 'sendEmails':
      return (
        <SendReminderEmails
          sessionDetails={sessionDetails}
          handleAddEmailsClick={handleAddEmailsClick}
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

    case 'specialRequirements':
      return <SpecialRequirements specialRequirements={specialRequirements} />;

    default:
      return null;
  }
};

export default DrawerContent;
