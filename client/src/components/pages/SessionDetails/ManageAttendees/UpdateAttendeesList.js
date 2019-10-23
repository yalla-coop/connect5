import React from 'react';
import { Select, Tooltip, Button as AntButton } from 'antd';

import Button from '../../../common/Button';

import {
  DrawerContentWrapper,
  SelecetWrapper,
  IconsWrapper,
} from '../SessionDetails.Style';

import UserManual from '../UserManual';

const { Option } = Select;

const UpdateAttendeesList = ({
  handleSubmitUpdateAttendees,
  confirmedAttendeesList,
  handleUpdateAttendees,
  onSelectBlur,
  onSelectFocus,
  loading,
  onCopy,
  onClear,
}) => {
  return (
    <>
      <UserManual />
      <DrawerContentWrapper>
        <SelecetWrapper>
          <IconsWrapper>
            <Tooltip placement="top" title="Copy">
              <AntButton
                type="primary"
                icon="copy"
                ghost
                onClick={() => onCopy('confirmed')}
                disabled={!confirmedAttendeesList.length}
              />
            </Tooltip>
            <Tooltip placement="top" title="Delete">
              <AntButton
                type="danger"
                icon="delete"
                ghost
                onClick={() => onClear('confirmed')}
                disabled={!confirmedAttendeesList.length}
              />
            </Tooltip>
          </IconsWrapper>

          <Select
            mode="tags"
            value={confirmedAttendeesList}
            placeholder="Select users"
            onChange={values => handleUpdateAttendees(values, 'confirmed')}
            style={{ width: '100%' }}
            size="large"
            onBlur={onSelectBlur}
            onFocus={onSelectFocus}
          >
            {confirmedAttendeesList.map(item => (
              <Option value={item} key={item}>
                {item}
              </Option>
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
          onClick={() => handleSubmitUpdateAttendees('confirmed')}
          loading={loading}
          label="Update"
        >
          Update
        </Button>
      </DrawerContentWrapper>
    </>
  );
};

export default UpdateAttendeesList;
