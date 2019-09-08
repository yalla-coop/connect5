import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';

import { updateSessionAttendeesList as updateSessionAttendeesListAction } from '../../../../actions/sessionAction';

import AntdModal from '../../../common/AntdModal';

import {
  SessionTopDetailsWrapper,
  SubDetails,
  SubDetailsContent,
  DrawerLink,
  Row,
  Edit,
} from '../SessionDetails.Style';

class ManageAttendees extends Component {
  state = {};

  componentDidMount() {
    let dT = null;
    try {
      dT = new DataTransfer();
    } catch (e) {
      // ignore the error
    }
    const evt = new ClipboardEvent('paste', { clipboardData: dT });
    (evt.clipboardData || window.clipboardData).setData('text/plain', '');
    document.addEventListener('paste', this.pasteEmails);
    document.dispatchEvent(evt);
  }

  componentWillUnmount() {
    document.removeEventListener('paste', this.pasteEmails);
  }

  render() {
    const { handleDrawerOpen, confirmedAttendeesList } = this.props;

    const content =
      'This section provides tools to manage email addresses of confirmed participants. You can edit current lists by clicking on "Manage Attendees", email out session reminders and view previously sent emails.';

    return (
      <SessionTopDetailsWrapper>
        <AntdModal
          title="About this section"
          content={content}
          btnStyle={{ margin: '1.5rem' }}
          style={{ top: '20' }}
        />
        <SubDetails>
          <DrawerLink>Confirmed attendees:</DrawerLink>
          <SubDetailsContent
            to="/"
            style={{ paddingLeft: '0.5rem', fontWeight: '500' }}
          >
            {' '}
            {confirmedAttendeesList.length}
          </SubDetailsContent>
          <Edit onClick={handleDrawerOpen} data-key="viewAttendeesList">
            Edit
          </Edit>
        </SubDetails>
        <SubDetails>
          <Row
            onClick={handleDrawerOpen}
            data-key="viewAttendeesList"
            data-target="update"
          >
            <DrawerLink>Manage Attendees</DrawerLink>
            <Icon type="right" />
          </Row>
        </SubDetails>

        <SubDetails>
          <Row
            onClick={handleDrawerOpen}
            data-key="specialRequirements"
            data-target="specialRequirements"
          >
            <DrawerLink>View special requirements</DrawerLink>
            <Icon type="right" />
          </Row>
        </SubDetails>

        <SubDetails>
          <Row
            onClick={handleDrawerOpen}
            data-key="sendEmails"
            data-target="send"
          >
            <DrawerLink>Send session info email reminder</DrawerLink>
            <Icon type="right" />
          </Row>
        </SubDetails>

        <SubDetails>
          <Row onClick={handleDrawerOpen} data-key="viewEmails">
            <DrawerLink>View emails you have sent</DrawerLink>
            <Icon type="right" />
          </Row>
        </SubDetails>
      </SessionTopDetailsWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.session.loading,
    name: state.auth.name,
  };
};

export default connect(
  mapStateToProps,
  {
    updateSessionAttendeesList: updateSessionAttendeesListAction,
  }
)(ManageAttendees);
