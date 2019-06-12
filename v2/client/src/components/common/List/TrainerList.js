/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Button as AntButton } from 'antd';

// COMMON COMPONENTS
import Modal from '../modal';
import Button from '../Button';

// HELPERS
import stringCutter from '../../../helpers/stringCutter';

// STYLING
import {
  Wrapper,
  Header,
  NameHeader,
  DetailsHeader,
  List,
  Row,
  Name,
  ArrowWrapper,
  ModalStyle,
  ModalHeader,
  ModalRow,
  ModalContent,
  Left,
  Right,
} from './List.style';

// NOTE: this component expects dataList to look something like this:

// const dummyTrainerList = [
//   {
//     name: 'John Doe',
//     id: '12312312423133',
//   },
//   {
//     name: 'John Doe',
//     id: '12312312423133',
//   },
//   {
//     name: 'John Doe',
//     id: '12312312423133',
//   },
// ];

export default class TrainerList extends Component {
  state = {
    modalOpen: false,
    selectedTrainer: null,
  };

  toggleModal = dataItem => {
    const { modalOpen } = this.state;
    this.setState({ modalOpen: !modalOpen, selectedTrainer: dataItem });
  };

  render() {
    const { dataList, viewRole, deleteUser } = this.props;
    const { modalOpen, selectedTrainer } = this.state;

    const modalContent = selectedTrainer && (
      <>
        <ModalHeader>{selectedTrainer.name} info</ModalHeader>
        <ModalContent>
          <ModalRow>
            <Left>Organisation: </Left>{' '}
            <Right>{stringCutter(selectedTrainer.organization || 'N/A')}</Right>
          </ModalRow>
          <ModalRow>
            <Left>Location: </Left>{' '}
            <p>{stringCutter(selectedTrainer.region || 'N/A')}</p>
          </ModalRow>
          {/* render local lead if trainer  */}
          {selectedTrainer.role === 'trainer' && (
            <ModalRow>
              <Left>Local lead: </Left>
              <p>{stringCutter(selectedTrainer.localLeadName || 'N/A')}</p>
            </ModalRow>
          )}
          {/* render number of trainers if local lead */}
          {selectedTrainer.role === 'localLead' && viewRole === 'admin' && (
            <ModalRow>
              <Left>No of trainers: </Left>
              <p>{`${selectedTrainer.trainerCount}` || 'N/A'}</p>
            </ModalRow>
          )}
          <ModalRow>
            <Left>Email: </Left>
            <a href={`mailto:${selectedTrainer.email}`}>
              {stringCutter(selectedTrainer.email || 'N/A')}
            </a>
          </ModalRow>
        </ModalContent>
        <Link
          to={{
            pathname: `/trainer-results`,
            state: { trainer: selectedTrainer, seniorView: true },
          }}
        >
          <Button label="view results" type="outline" width="150px" />
        </Link>
      </>
    );

    return (
      <Wrapper>
        <Header>
          <NameHeader>Name</NameHeader>
          <DetailsHeader>Action</DetailsHeader>
        </Header>
        <List>
          {dataList &&
            dataList.map(dataItem => (
              <Row key={dataItem._id}>
                <Name>{dataItem.name}</Name>
                <ArrowWrapper onClick={() => this.toggleModal(dataItem)}>
                  <AntButton type="primary" ghost>
                    View
                  </AntButton>
                </ArrowWrapper>
                <ArrowWrapper>
                  <AntButton
                    type="danger"
                    ghost
                    onClick={() => deleteUser(dataItem._id)}
                  >
                    Delete
                  </AntButton>
                </ArrowWrapper>
              </Row>
            ))}
        </List>
        <Modal
          isOpen={modalOpen}
          onClose={this.toggleModal}
          extraModalStyle={ModalStyle}
          content={modalContent}
        />
      </Wrapper>
    );
  }
}
