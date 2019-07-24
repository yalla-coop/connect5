import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import { Icon, Button, Drawer } from 'antd';
import Header from '../Header';

import { Wrapper, List, Row, StyledLink } from './List.style';
import SendInvitation from '../../pages/SessionDetails/InviteAndPromote/SendInvitation';
import InviteeList from '../../pages/SessionDetails/InviteAndPromote/InviteeList';
import EmailsList from './EmailsList';
import {
  BackContainer,
  BackLink,
} from '../../pages/SessionDetails/InviteAndPromote/InviteAndPromote.style';

class InviteAndPromote extends Component {
  state = {
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

  render() {
    const { visible } = this.state;
    const { showDrawer, onClose } = this;
    const { id, sessionDetails } = this.props;
    return (
      <Wrapper style={{ marginBottom: '0' }}>
        <List>
          <Row
            id="1"
            style={{
              flexDirection: 'column',
              height: '2rem',
              alignItems: 'left',
            }}
          >
            <p>Registration Link</p>
          </Row>
          <Row
            id="2"
            style={{ justifyContent: 'space-between', alginItems: 'center' }}
          >
            <p>Send Email Invitation</p>
            <Button type="primary" onClick={showDrawer}>
              <Icon type="right" />
            </Button>
            <Drawer
              placement="right"
              closable={false}
              onClose={onClose}
              visible={visible}
              width="100%"
            >
              <SendInvitation onClose={onClose} id={id} />
            </Drawer>
          </Row>

          <Row
            id="3"
            style={{ justifyContent: 'space-between', alginItems: 'center' }}
          >
            <p>View emails you have sent</p>
            <Button type="primary" onClick={showDrawer}>
              <Icon type="right" />
            </Button>
            <Drawer
              placement="right"
              closable={false}
              onClose={onClose}
              visible={visible}
              width="100%"
            >
              <Header type="view" label="Invitee List" />
              <BackContainer style={{ margin: '3rem 0 2rem 0' }}>
                <BackLink onClick={this.onClose}>{`< Back`}</BackLink>
              </BackContainer>
              <InviteeList onClose={onClose} dataList={sessionDetails} />
            </Drawer>
          </Row>
          <Row
            id="3"
            style={{ justifyContent: 'space-between', alginItems: 'center' }}
          >
            <p>View emails you have sent</p>
            <Button type="primary" onClick={showDrawer}>
              <Icon type="right" />
            </Button>
            <Drawer
              placement="right"
              closable={false}
              onClose={onClose}
              visible={visible}
              width="100%"
            >
              <Header type="view" label="Invite Emails" />
              <BackContainer style={{ margin: '3rem 0 2rem 0' }}>
                <BackLink onClick={this.onClose}>{`< Back`}</BackLink>
              </BackContainer>
              <EmailsList onClose={onClose} dataList={sessionDetails} />
            </Drawer>
          </Row>
        </List>
      </Wrapper>
    );
  }
}

export default InviteAndPromote;
