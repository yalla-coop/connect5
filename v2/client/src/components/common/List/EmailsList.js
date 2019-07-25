import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Icon, Drawer, Button } from 'antd';

import { fetchSessionDetails } from '../../../actions/groupSessionsAction';
import InviteEmails from '../../pages/SessionDetails/InviteAndPromote/InviteEmails';

import {
  Wrapper,
  Header,
  DateHeader,
  DetailsHeader,
  List,
  Row,
  Date,
} from './List.style';

class EmailsList extends Component {
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
    const { dataList } = this.props;
    const { visible } = this.state;
    const { showDrawer, onClose } = this;
    if (!dataList) {
      return <p>loading</p>;
    }
    return (
      <Wrapper>
        <Header>
          <DateHeader>Date</DateHeader>
          <DetailsHeader>Info</DetailsHeader>
        </Header>
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
                  onClose={onClose}
                  visible={visible}
                  width="100%"
                >
                  <InviteEmails
                    sessionDetails={dataList}
                    emailInfo={dataItem}
                    onClose={this.onClose}
                  />
                </Drawer>
              </Row>
            ))}
        </List>
      </Wrapper>
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
