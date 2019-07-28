import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Icon, Drawer, Button } from 'antd';

import Header from '../Header';
import Spin from '../Spin';

import { fetchSessionDetails } from '../../../actions/groupSessionsAction';
import InviteEmails from '../../pages/SessionDetails/InviteAndPromote/InviteEmails';

import {
  Wrapper,
  Header as Heading,
  DateHeader,
  DetailsHeader,
  List,
  Row,
  Date,
} from './List.style';
import {
  BackContainer,
  BackLink,
} from '../../pages/SessionDetails/SessionActions/SessionActions.Style';

class EmailsList extends Component {
  state = {
    visible: false,
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onDrawerClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { dataList, onClose } = this.props;
    const { visible } = this.state;
    const { showDrawer, onDrawerClose } = this;
    if (!dataList) {
      return <Spin />;
    }
    return (
      <>
        <Header type="view" label="Invitee List" />
        <BackContainer style={{ margin: '2rem 0' }}>
          <BackLink onClick={onClose}>{`< Back`}</BackLink>
        </BackContainer>
        <Wrapper>
          <Heading>
            <DateHeader>Date</DateHeader>
            <DetailsHeader>Info</DetailsHeader>
          </Heading>
          <List>
            {dataList &&
              dataList.sentEmails.map(dataItem => (
                <Row key={dataItem._id}>
                  <Date>{moment(dataItem.date).format('DD/MM/YYYY')}</Date>
                  <Button type="primary" onClick={showDrawer}>
                    <Icon type="right" />
                  </Button>
                  <Drawer
                    placement="right"
                    closable={false}
                    onClose={onDrawerClose}
                    visible={visible}
                    width="100%"
                  >
                    <InviteEmails
                      sessionDetails={dataList}
                      emailInfo={dataItem}
                      onClose={onDrawerClose}
                    />
                  </Drawer>
                </Row>
              ))}
          </List>
        </Wrapper>
      </>
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
)(EmailsList);
