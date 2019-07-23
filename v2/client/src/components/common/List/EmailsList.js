import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Icon, Drawer, Button } from 'antd';

import { fetchSessionDetails } from '../../../actions/groupSessionsAction';
import InviteEmails from '../../pages/SessionDetails/InviteAndPromote/InviteEmails';
import {
  BackContainer,
  BackLink,
} from '../../pages/SessionDetails/InviteAndPromote/InviteAndPromote.style';

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

  componentDidMount() {
    const { id } = this.props.sessionDetails;
    // call action and pass it the id of session to fetch it's details
    this.props.fetchSessionDetails(id);
  }

  componentDidUpdate(prevProps) {
    const { sessionDetails } = this.props;
    const { id } = sessionDetails;
    if (sessionDetails !== prevProps.essionDetails) {
      this.props.fetchSessionDetails(id);
    }
  }

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
