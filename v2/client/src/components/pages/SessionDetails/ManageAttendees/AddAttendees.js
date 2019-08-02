import React from 'react';
import { Select, Button as AntButton, Tooltip } from 'antd';

import Button from '../../../common/Button';

import {
  DrawerContentWrapper,
  SelecetWrapper,
  IconsWrapper,
} from '../SessionDetails.Style';

const { Option } = Select;

const AddAttendees = ({
  handleAddAttendees,
  addedAttendeesList,
  submitAddAttendeesList,
  onSelectBlur,
  onSelectFocus,
  onCopy,
  onClear,
  loading,
}) => {
  return (
    <DrawerContentWrapper>
      <h5 style={{ marginBottom: '1rem' }}>
        To add attendees, please enter their email address below. This will let
        you email session reminders, survey links and more.
      </h5>
      <SelecetWrapper>
        <IconsWrapper>
          <Tooltip placement="top" title="Copy">
            <AntButton
              type="primary"
              icon="copy"
              ghost
              onClick={onCopy}
              disabled={!addedAttendeesList.length}
            />
          </Tooltip>
          <Tooltip placement="top" title="Delete">
            <AntButton
              type="danger"
              icon="delete"
              ghost
              onClick={onClear}
              disabled={!addedAttendeesList.length}
            />
          </Tooltip>
        </IconsWrapper>
        <Select
          mode="tags"
          value={addedAttendeesList}
          placeholder="Select users"
          onChange={handleAddAttendees}
          style={{ width: '100%' }}
          size="large"
          onBlur={onSelectBlur}
          onFocus={onSelectFocus}
        >
          {addedAttendeesList.map(item => (
            <Option value={item}>{item}</Option>
          ))}
        </Select>
      </SelecetWrapper>

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
