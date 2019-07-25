import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Drawer, Button, Collapse, Icon } from 'antd';
import Header from '../../../common/Header';
import { fetchSessionDetails } from '../../../../actions/groupSessionsAction';
// import SendInvitation from './SendInvitation';
// import InviteeList from './InviteeList';
import InviteAndPromoteList from '../../../common/List/InviteAndPromoteList';

// ANTD COMPONENTS
import Spin from '../../../common/Spin';
import EmailsList from '../../../common/List/EmailsList';
import { BackContainer, BackLink } from './InviteAndPromote.style';

const { Panel } = Collapse;

class InviteAndPromote extends Component {
  state = {
    openSection: '1',
    visible: false,
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  callback = key => {
    this.setState({ openSection: key });
  };

  render() {
    const { sessionDetails } = this.props;
    const { id } = sessionDetails;
    const { openSection, visible } = this.state;
    if (!sessionDetails) {
      return Spin;
    }
    return (
      <div>
        <InviteAndPromoteList id={id} sessionDetails={sessionDetails} />
      </div>
      // <Collapse
      //   accordion
      //   expandIconPosition="right"
      //   expandIcon={({ isActive }) => (
      //     <Icon type="down" rotate={isActive ? 90 : 0} />
      //   )}
      //   defaultActiveKey={[openSection]}
      //   onChange={this.callback}
      // >
      //   <Panel header="Registration Link" key="1">
      //     hi
      //   </Panel>
      //   <Panel header="Send email invitation" key="2">
      //     <div style={{ padding: '1rem' }}>
      //       <Button type="primary" onClick={this.showDrawer}>
      //         Send Invitation
      //       </Button>
      //       <Drawer
      //         placement="right"
      //         closable={false}
      //         onClose={this.onClose}
      //         visible={visible}
      //         width="100%"
      //       >
      //         <SendInvitation onClose={this.onClose} id={id} />
      //       </Drawer>
      //     </div>
      //   </Panel>
      //   <Panel header="View invitees" key="3">
      //     <InviteeList dataList={sessionDetails} />
      //   </Panel>
      //   <Panel header="View emails you have sent" key="4">
      //     <div style={{ padding: '1rem' }}>
      //       <Button type="primary" onClick={this.showDrawer}>
      //         View Emails List
      //       </Button>
      //       <Drawer
      //         placement="right"
      //         closable={false}
      //         onClose={this.onClose}
      //         visible={visible}
      //         width="100%"
      //       >
      //         <div>
      //           <Header type="view" label="Invite Emails" />
      //           <BackContainer style={{ margin: '3rem 0 2rem 0' }}>
      //             <BackLink onClick={this.onClose}>{`< Back`}</BackLink>
      //           </BackContainer>
      //           <EmailsList
      //             onClose={this.onClose}
      //             dataList={sessionDetails}
      //           />
      //         </div>
      //       </Drawer>
      //     </div>
      //   </Panel>
      // </Collapse>
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
)(InviteAndPromote);
