/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Collapse from 'antd/lib/collapse';
import Icon from 'antd/lib/icon';
import { fetchSessionDetails } from '../../../actions/groupSessionsAction';

// ANTD COMPONENTS
import Spin from '../../common/Spin';

// COMMON COMPONENTS
import Header from '../../common/Header';

// STYLING
import { SessionDetailsWrapper } from './SessionDetails.Style';

// SUB COMPONENTS
import SessionTopDetails from './SessionTopDetails';
import SessionActions from './SessionActions';
import SessionSurveys from './SessionSurveys';
import ManageAttendees from './ManageAttendees';
import InviteAndPromote from './InviteAndPromote';

const { Panel } = Collapse;

class SessionDetails extends Component {
  state = {
    openSection: '1',
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    // call action and pass it the id of session to fetch it's details
    this.props.fetchSessionDetails(id);
  }

  callback = key => {
    this.setState({ openSection: key });
  };

  render() {
    const { sessionDetails } = this.props;
    const { openSection } = this.state;

    if (!sessionDetails) {
      return Spin;
    }
    return (
      <SessionDetailsWrapper>
        <Header type="section" label="Manage Session" />
        <Collapse
          accordion
          expandIconPosition="right"
          expandIcon={({ isActive }) => (
            <Icon type="down" rotate={isActive ? 90 : 0} />
          )}
          defaultActiveKey={[openSection]}
          onChange={this.callback}
        >
          <Panel header="Event Details" key="1">
            <SessionTopDetails sessionDetails={sessionDetails} />
            <SessionActions sessionDetails={sessionDetails} />
          </Panel>
          <Panel header="Invite & Promote" key="2">
            <InviteAndPromote sessionDetails={sessionDetails} />
          </Panel>
          <Panel header="Manage Attendees" key="3">
            <ManageAttendees sessionDetails={sessionDetails} />
          </Panel>
          <Panel header="Get Feedback" key="4">
            <SessionSurveys sessionDetails={sessionDetails} />
          </Panel>
        </Collapse>
      </SessionDetailsWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    sessionDetails: state.sessions.sessionDetails[0],
  };
};
export default connect(
  mapStateToProps,
  { fetchSessionDetails }
)(SessionDetails);
