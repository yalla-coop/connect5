import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Drawer } from 'antd';

import SendInvitation from './SendInvitation';
import InviteeList from './InviteeList';
import EmailsList from '../../../common/List/EmailsList';

import {
  SessionTopDetailsWrapper,
  SubDetails,
  SubDetailsContent,
  DrawerLink,
  Row,
} from '../SessionDetails.Style';

class InviteAndPromote extends Component {
  state = { visible: false, drawerKey: null };

  onClose = () => {
    this.setState({ visible: false, drawerKey: null });
  };

  DrawerOpen = e => {
    const { key } = e.target.dataset;
    this.setState({ visible: true, drawerKey: key });
  };

  render() {
    const { visible, drawerKey } = this.state;
    const { sessionDetails } = this.props;
    const { id } = sessionDetails;
    return (
      <SessionTopDetailsWrapper>
        <SubDetails>
          <DrawerLink>Registration Link</DrawerLink>
          <SubDetailsContent to="/"> link</SubDetailsContent>
        </SubDetails>
        <SubDetails>
          <Row onClick={this.DrawerOpen} data-key="send-invitation">
            <DrawerLink>Send Email Invitation</DrawerLink>
            <Icon type="right" />
          </Row>
        </SubDetails>
        <SubDetails>
          <Row onClick={this.DrawerOpen} data-key="view-invitees">
            <DrawerLink>View invitees</DrawerLink>
            <Icon type="right" />
          </Row>
        </SubDetails>
        <SubDetails>
          <Row onClick={this.DrawerOpen} data-key="view-emails">
            <DrawerLink>View emails you have sent</DrawerLink>
            <Icon type="right" />
          </Row>
        </SubDetails>
        <Drawer
          title={<span>Hello</span>}
          placement="left"
          width="100%"
          height="100%"
          onClose={this.onClose}
          visible={visible}
          closable
          getContainer
        >
          <DrawerContent
            drawerKey={drawerKey}
            id={id}
            sessionDetails={sessionDetails}
          />
        </Drawer>
      </SessionTopDetailsWrapper>
    );
  }
}
export default connect(null)(InviteAndPromote);

const DrawerContent = ({ drawerKey, id, sessionDetails, onClose }) => {
  switch (drawerKey) {
    case 'send-invitation':
      return <SendInvitation onClose={onClose} id={id} />;
    case 'view-invitees':
      return <InviteeList onClose={onClose} dataList={sessionDetails} />;
    case 'view-emails':
      return <EmailsList onClose={onClose} dataList={sessionDetails} />;

    default:
      return <h1>hi</h1>;
  }
};
