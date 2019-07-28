import React from 'react';
import { Select } from 'antd';

import Button from '../../../common/Button';

import { DrawerContentWrapper } from '../SessionDetails.Style';

const { Option } = Select;

const AddAttendees = ({
  handleAddAttendees,
  addedAttendeesList,
  submitAddAttendeesList,
  loading,
}) => {
  return (
    <DrawerContentWrapper>
      <h5 style={{ marginBottom: '1rem' }}>
        To add attendees, please enter their email address below. This will let
        you email session reminders, survey links and more.
      </h5>
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
        loading={loading}
        label="Add Attendees"
      >
        Add Attendees
      </Button>
    </DrawerContentWrapper>
  );
};

export default AddAttendees;
