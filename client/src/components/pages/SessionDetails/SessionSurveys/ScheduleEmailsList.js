import React from 'react';

import { Empty, Popconfirm } from 'antd';
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

import { readableSurveysNamePairs } from '../../../../constants/index';

const ScheduleEmailsList = ({
  handleDrawerOpen,
  scheduledEmails,
  handleCancelEmail,
  surveyType,
}) => {
  const filteredScheduledEmails = scheduledEmails.filter(scheduledEmail =>
    scheduledEmail.surveyType.includes(surveyType)
  );

  return (
    <div>
      <FormWrapper>
        <Button
          type="primary"
          label="Schedule New Email"
          style={{ width: '100%' }}
          onClick={handleDrawerOpen}
          data-key="editScheduleEmail"
          data-survey-type={surveyType}
        />
      </FormWrapper>
      {filteredScheduledEmails && filteredScheduledEmails.length > 0 ? (
        <TableWrapper>
          <TableHeader>
            <Text style={{ fontWeight: 500 }}>
              Currently scheduled{' '}
              <span style={{ fontWeight: 700, textDecoration: 'underline' }}>
                {readableSurveysNamePairs[surveyType]}
              </span>{' '}
              Survey Email
            </Text>
          </TableHeader>
          {filteredScheduledEmails.map(scheduledEmail => (
            <SubDetails
              key={scheduledEmail._id}
              style={{
                padding: '1rem 0',
                borderTop: '1px solid #80808059',
              }}
            >
              <Row enabled>
                {moment(scheduledEmail.date).format('DD-MM-YYYY')}
                <Popconfirm
                  title="Are you sure you want to cancel this email?"
                  onConfirm={() => handleCancelEmail(scheduledEmail._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <DrawerLink style={{ cursor: 'pointer' }}>Cancel</DrawerLink>
                </Popconfirm>
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

export default ScheduleEmailsList;
