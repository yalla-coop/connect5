import React from 'react';
import { Icon, Empty } from 'antd';

import moment from 'moment';
import {
  SubDetails,
  DrawerLink,
  Row,
  TableWrapper,
  TableHeader,
  Text,
} from '../SessionDetails.Style';

const ViewEmailsList = ({ reminderEmails, handleDrawerOpen }) => {
  return (
    <div>
      {reminderEmails && reminderEmails.length ? (
        <TableWrapper>
          <TableHeader>
            <Text>Date</Text>
            <Text>Info</Text>
          </TableHeader>
          {reminderEmails &&
            reminderEmails.map((reminderEmail, index) => (
              <SubDetails
                key={reminderEmail._id}
                style={{ padding: '1rem 0', borderTop: '1px solid #80808059' }}
              >
                <Row
                  onClick={handleDrawerOpen}
                  data-key="emailTemplate"
                  data-email-index={index}
                >
                  <DrawerLink>
                    {moment(reminderEmail.sendDate).format('DD-MM-YYYY')}
                  </DrawerLink>
                  <Icon type="right" />
                </Row>
              </SubDetails>
            ))}
        </TableWrapper>
      ) : (
        <Empty
          description="No reminder Emails have been sent!"
          style={{ marginTop: '5rem' }}
        />
      )}
    </div>
  );
};

export default ViewEmailsList;
