import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Drawer } from 'antd';
import Swal from 'sweetalert2';

import SendInvitation from './SendInvitation';
import InviteeList from './InviteeList';
import EmailsList from '../../../common/List/EmailsList';

import {
  SessionTopDetailsWrapper,
  SubDetails,
  RegistrationDiv,
  RegistrationLink,
  DrawerLink,
  CopyLink,
  CopyIcon,
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

  // Copy the link of the survey and fire pop up for success
  onCopyClick = () => {
    const copyText = document.getElementById('registration-link');
    let range;
    let selection;
    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(copyText);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(copyText);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    try {
      document.execCommand('copy');
      Swal.fire({
        title: 'Success',
        text: 'Link copied!',
        type: 'success',
        timer: 2000,
        confirmButtonText: 'Ok',
      });
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: 'Unable to cop the Link',
        type: 'error',
        timer: 2000,
        confirmButtonText: 'Ok',
      });
    }
  };

  render() {
    const { visible, drawerKey } = this.state;
    const { sessionDetails } = this.props;
    const { onCopyClick } = this;
    const { id, shortId } = sessionDetails;

    return (
      <SessionTopDetailsWrapper>
        <SubDetails style={{ display: 'flex', flexDirection: 'column' }}>
          <DrawerLink>Registration Link</DrawerLink>
          <RegistrationDiv>
            <RegistrationLink
              href={`${
                process.env.NODE_ENV === 'prodcution' ? 'https://' : 'http://'
              }${window.location.host}/confirm/${shortId}`}
              target="_blank"
              id="registration-link"
              rel="noopener noreferrer"
            >
              {`${
                process.env.NODE_ENV === 'prodcution' ? 'https://' : 'http://'
              }${window.location.host}/confirm/${shortId}`}
            </RegistrationLink>
            <CopyLink onClick={onCopyClick}>
              <CopyIcon className="far fa-copy" />
            </CopyLink>
          </RegistrationDiv>
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
          placement="left"
          width="100%"
          height="100%"
          onClose={this.onClose}
          visible={visible}
          closable
        >
          <DrawerContent
            drawerKey={drawerKey}
            id={id}
            sessionDetails={sessionDetails}
            onClose={this.onClose}
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
      return null;
  }
};
