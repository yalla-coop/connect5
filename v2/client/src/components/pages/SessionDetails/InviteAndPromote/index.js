import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import Swal from 'sweetalert2';

import AntdModal from '../../../common/AntdModal';

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
    const { sessionDetails, handleDrawerOpen } = this.props;
    const { onCopyClick } = this;
    const { shortId } = sessionDetails;
    const content =
      'This section lets you invite people to your session. To add invitees, please enter their email address below. This will let you automatically email them an invite with the link to register. You can also copy the link and share it manually on social media etc. Once someone registers they will appear in the manage attendees section.';

    return (
      <>
        <AntdModal
          title="About this section"
          content={content}
          btnStyle={{ margin: '1.5rem' }}
          style={{ top: '20' }}
        />
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
            <Row onClick={handleDrawerOpen} data-key="send-invitation">
              <DrawerLink>Send Email Invitation</DrawerLink>
              <Icon type="right" />
            </Row>
          </SubDetails>
          <SubDetails>
            <Row onClick={handleDrawerOpen} data-key="view-invitees">
              <DrawerLink>Manage invitees</DrawerLink>
              <Icon type="right" />
            </Row>
          </SubDetails>
          <SubDetails>
            <Row onClick={handleDrawerOpen} data-key="view-emails">
              <DrawerLink>View emails you have sent</DrawerLink>
              <Icon type="right" />
            </Row>
          </SubDetails>
        </SessionTopDetailsWrapper>
      </>
    );
  }
}
export default connect(null)(InviteAndPromote);
