import React from 'react';

import { Empty, Popconfirm, Button as AntdButton } from 'antd';
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
                <DrawerLink as="span">
                  {moment(scheduledEmail.date).format('DD-MM-YYYY')}
                </DrawerLink>
                <div style={{ display: 'flex' }}>
                  <AntdButton
                    type="link"
                    onClick={handleDrawerOpen}
                    data-key="viewScheduledEmail"
                    data-survey-type={surveyType}
                    data-email-id={scheduledEmail._id}
                  >
                    View
                  </AntdButton>
                  <Popconfirm
                    title="Are you sure you want to cancel this email?"
                    onConfirm={() => handleCancelEmail(scheduledEmail._id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <span style={{ display: 'flex' }}>
                      <AntdButton type="link" style={{ color: 'red' }}>
                        cancel
                      </AntdButton>
                    </span>
                  </Popconfirm>
                </div>
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
