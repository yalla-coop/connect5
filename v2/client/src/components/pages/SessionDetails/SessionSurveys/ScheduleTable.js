import React from 'react';
import { Icon, DatePicker, Empty } from 'antd';
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

const ViewEmailsList = ({
  handleDrawerOpen,
  scheduledEmails,
  handleSelectDate,
  loading,
}) => {
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
        />
      </FormWrapper>
      {scheduledEmails && scheduledEmails.length > 0 ? (
        <TableWrapper>
          <TableHeader>
            <Text>Date</Text>
          </TableHeader>
          {scheduledEmails.map((scheduledEmail, index) => (
            <SubDetails
              key={scheduledEmails._id}
              style={{ padding: '1rem 0', borderTop: '1px solid #80808059' }}
            >
              <Row
                onClick={handleDrawerOpen}
                data-key="emailTemplate"
                data-email-index={index}
              >
                <DrawerLink>
                  {moment(scheduledEmail.date).format('DD-MM-YYYY')}
                </DrawerLink>
                <Icon type="right" />
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
};

export default ViewEmailsList;
