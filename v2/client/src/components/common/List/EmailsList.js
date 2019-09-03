import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Icon, Drawer, Empty } from 'antd';

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
    emailId: null,
  };

  showDrawer = id => {
    this.setState({
      visible: true,
      emailId: id,
    });
  };

  onDrawerClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { dataList, onClose } = this.props;
    const { visible, emailId } = this.state;
    const { showDrawer, onDrawerClose } = this;
    const activeEmail =
      dataList &&
      dataList.sentEmails.filter(item => {
        return item._id === emailId;
      });

    if (!dataList) {
      return <Spin />;
    }

    const filteredEmails =
      dataList.sentEmails &&
      dataList.sentEmails.filter(item => item.type === 'registration');

    return (
      <>
        <Header type="view" label="Invitee List" />
        <BackContainer style={{ margin: '2rem 0' }}>
          <BackLink onClick={onClose}>{`< Back`}</BackLink>
        </BackContainer>
        {filteredEmails && filteredEmails.length > 0 ? (
          <Wrapper>
            <Heading>
              <DateHeader>Date</DateHeader>
              <DetailsHeader>Info</DetailsHeader>
            </Heading>
            <List>
              {filteredEmails.map(dataItem => (
                <Row
                  key={dataItem._id}
                  onClick={() => showDrawer(dataItem && dataItem._id)}
                >
                  <Date>{moment(dataItem.date).format('DD/MM/YYYY')}</Date>
                  <button
                    type="button"
                    onClick={() => showDrawer(dataItem && dataItem._id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      marginRight: '.5rem',
                    }}
                  >
                    <Icon type="right" />
                  </button>
                </Row>
              ))}

              <Drawer
                placement="right"
                closable={false}
                onClose={onDrawerClose}
                visible={visible}
                width="100%"
              >
                <InviteEmails
                  sessionDetails={dataList}
                  emailInfo={activeEmail && activeEmail[0]}
                  onClose={onDrawerClose}
                />
              </Drawer>
            </List>
          </Wrapper>
        ) : (
          <Empty
            description="No emails have been sent!"
            style={{ marginTop: '7rem' }}
          />
        )}
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
