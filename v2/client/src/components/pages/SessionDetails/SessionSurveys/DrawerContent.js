import React from 'react';

import { DatePicker, Empty } from 'antd';
import moment from 'moment';

import Button from '../../../common/Button';

import {
  SubDetails,
  DrawerLink,
  Row,
  TableWrapper,
  TableHeader,
  Text,
  FormWrapper,
} from '../SessionDetails.Style';

const DrawerContent = ({
  loading,
  drawerKey,
  handleSelectDate,
  handleSubmitSchedule,
  scheduledEmails,
  type,
}) => {
  switch (drawerKey) {
    case 'scheduleTable':
      return (
        <div>
          <FormWrapper>
            <DatePicker
              onChange={handleSelectDate}
              placeholder="Select month"
              size="large"
              style={{ width: '100%', marginBottom: '1rem' }}
            />
            <Button
              type="primary"
              label="Schedule"
              style={{ width: '100%' }}
              loading={loading}
              disabled={loading}
              onClick={handleSubmitSchedule}
            />
          </FormWrapper>
          {scheduledEmails && scheduledEmails.length > 0 ? (
            <TableWrapper>
              <TableHeader>
                <Text>
                  Currently scheduled{' '}
                  {type.includes('pre') ? 'Pre-Session' : 'Post-Session'} Survey
                  Email
                </Text>
              </TableHeader>
              {scheduledEmails.map(scheduledEmail => (
                <SubDetails
                  key={scheduledEmail._id}
                  style={{
                    padding: '1rem 0',
                    borderTop: '1px solid #80808059',
                  }}
                >
                  <Row>
                    {moment(scheduledEmail.date).format('DD-MM-YYYY')}
                    <DrawerLink>Cancel</DrawerLink>
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

    default:
      return null;
  }
};

export default DrawerContent;
