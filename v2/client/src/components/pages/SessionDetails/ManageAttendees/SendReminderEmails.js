import React from 'react';
import { Checkbox } from 'antd';

import Button from '../../../common/Button';

import { DrawerContentWrapper, CheckboxWrapper } from '../SessionDetails.Style';

const CheckboxGroup = Checkbox.Group;

const SendReminderEmails = ({
  confirmedAttendeesList,
  changeSelectedEmails,
  checkedEmails,
  isCheckAll,
  onCheckAllChange,
  submitSendReminderEmail,
  loading,
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
        loading={loading}
        label="Send Reminder"
      >
        Send Reminder
      </Button>
    </DrawerContentWrapper>
  );
};

export default SendReminderEmails;
