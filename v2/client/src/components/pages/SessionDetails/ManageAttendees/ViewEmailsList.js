import React, { Component } from 'react';
import { Icon, Empty, Drawer } from 'antd';
import moment from 'moment';
import EmailTemplate from './EmailTemplate';

import {
  SubDetails,
  DrawerLink,
  Row,
  TableWrapper,
  TableHeader,
  Text,
  BackWrapper,
} from '../SessionDetails.Style';

class ViewEmailsList extends Component {
  state = {
    visible: false,
    activeEmailIndex: null,
  };

  onClose = () => {
    this.setState({ visible: false, activeEmailIndex: null });
  };

  handleDrawerOpen = e => {
    const { emailIndex } = e.target.dataset;
    this.setState({ visible: true, activeEmailIndex: emailIndex });
  };

  render() {
    const { visible, activeEmailIndex } = this.state;

    const { reminderEmails } = this.props;

    const activeEmailTemplate =
      reminderEmails && reminderEmails[activeEmailIndex];
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
                  style={{
                    padding: '1rem 0',
                    borderTop: '1px solid #80808059',
                  }}
                >
                  <Row onClick={this.handleDrawerOpen} data-email-index={index}>
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
        <Drawer
          placement="left"
          width="100%"
          height="100%"
          onClose={this.onClose}
          visible={visible}
          closable
        >
          {activeEmailTemplate ? (
            <>
              <BackWrapper onClick={this.onClose}>
                <Icon type="left" />
                <p
                  style={{
                    marginLeft: '1rem',
                    marginBottom: '0',
                  }}
                >
                  Back
                </p>
              </BackWrapper>
              <EmailTemplate
                activeEmailTemplate={activeEmailTemplate}
                onClose={this.onClose}
              />
            </>
          ) : null}
        </Drawer>
      </div>
    );
  }
}

export default ViewEmailsList;
