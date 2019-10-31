import React from 'react';

// ManageAttendees
import UpdateAttendeesList from './ManageAttendees/UpdateAttendeesList';
import SendReminderEmails from './ManageAttendees/SendReminderEmails';
import ViewEmailsList from './ManageAttendees/ViewEmailsList';
import EmailTemplate from './ManageAttendees/EmailTemplate';
import SpecialRequirements from './ManageAttendees/SpecialRequirements';
import SendSurveyLink from './SessionSurveys/SendSurveyLink';
import ScheduleEmailsList from './SessionSurveys/ScheduleEmailsList';

// InviteAndPromote
import SendInvitation from './InviteAndPromote/SendInvitation';
import InviteeList from './InviteAndPromote/InviteeList';
import EmailsList from '../../common/List/EmailsList';

import ScheduledEmailPreview from './SessionSurveys/ScheduledEmailPreview';

const DrawerContent = ({
  sessionDetails,
  loading,
  drawerKey,
  onSelectBlur,
  onSelectFocus,
  onCopy,
  onClear,
  name,
  handleCloseDrawer,
  surveyType,
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
  // manage
  newAndSentEmailsList,
  // feedback
  // schedule list
  handleCancelEmail,
  handleSubmitSchedule,
  emailId,
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
          name={name}
          drawerKey={drawerKey}
          onClose={handleCloseDrawer}
          surveyType={surveyType}
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

    // Invite And Promote
    case 'send-invitation':
      return (
        <SendInvitation
          sessionDetails={sessionDetails}
          handleAddEmailsClick={handleAddEmailsClick}
          drawerKey={drawerKey}
          onClose={handleCloseDrawer}
        />
      );

    case 'view-invitees':
      return (
        <InviteeList
          dataList={sessionDetails}
          handleSubmitUpdateAttendees={handleSubmitUpdateAttendees}
          handleUpdateAttendees={handleUpdateAttendees}
          participantsEmails={newAndSentEmailsList}
          onSelectBlur={onSelectBlur}
          onSelectFocus={onSelectFocus}
          onCopy={onCopy}
          onClear={onClear}
        />
      );
    case 'view-emails':
      return <EmailsList dataList={sessionDetails} />;

    // get feedback
    case 'sendSurveyLinkEmail':
      return (
        <SendSurveyLink
          sessionDetails={sessionDetails}
          handleAddEmailsClick={handleAddEmailsClick}
          name={name}
          drawerKey={drawerKey}
          onClose={handleCloseDrawer}
          surveyType={surveyType}
        />
      );

    case 'scheduleTable':
      return (
        <ScheduleEmailsList
          sessionDetails={sessionDetails}
          name={name}
          handleCancelEmail={handleCancelEmail}
          scheduledEmails={sessionDetails.scheduledEmails}
          surveyType={surveyType}
          handleDrawerOpen={handleDrawerOpen}
        />
      );

    case 'editScheduleEmail':
      return (
        <SendSurveyLink
          sessionDetails={sessionDetails}
          name={name}
          handleSubmitSchedule={handleSubmitSchedule}
          scheduledEmails={sessionDetails.scheduledEmails}
          surveyType={surveyType}
          handleDrawerOpen={handleDrawerOpen}
          handleAddEmailsClick={handleAddEmailsClick}
          drawerKey={drawerKey}
          onClose={handleCloseDrawer}
          isSchedule
        />
      );

    case 'viewScheduledEmail':
      return (
        <ScheduledEmailPreview
          emailId={emailId}
          sessionDetails={sessionDetails}
          scheduledEmails={sessionDetails.scheduledEmails}
        />
      );

    default:
      return null;
  }
};

export default DrawerContent;
