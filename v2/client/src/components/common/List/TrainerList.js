import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Icon } from 'antd';

// COMMON COMPONENTS
import Modal from '../modal';
import Button from '../Button';

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
    const { dataList } = this.props;
    const { modalOpen, selectedTrainer } = this.state;

    const modalContent = selectedTrainer && (
      <>
        <ModalHeader>{selectedTrainer.name} info</ModalHeader>
        <ModalContent>
          <ModalRow>
            <p>Organisation: </p> <p>{selectedTrainer.organization || 'N/A'}</p>
          </ModalRow>
          <ModalRow>
            <p>Location: </p> <p>{selectedTrainer.region || 'N/A'}</p>
          </ModalRow>
          <ModalRow>
            <p>Local lead: </p>
            <p>{selectedTrainer.localLead || 'N/A'}</p>
          </ModalRow>
          <ModalRow>
            <p>Email: </p>
            <a href={`mailto:${selectedTrainer.email}`}>
              {selectedTrainer.email || 'N/A'}
            </a>
          </ModalRow>
        </ModalContent>
        <Link
          to={{
            pathname: '/session-details',
            state: { trainer: selectedTrainer },
          }}
        >
          <Button
            label="view results"
            type="outline"
            width="150px"
          />
        </Link>
      </>
    );

    return (
      <Wrapper>
        <Header>
          <NameHeader>Name</NameHeader>
          <DetailsHeader>Info</DetailsHeader>
        </Header>
        <List>
          {dataList &&
            dataList.map((dataItem, index) => (
              <Row key={index}>
                <Name>{dataItem.name}</Name>
                <ArrowWrapper onClick={() => this.toggleModal(dataItem)}>
                  <Icon type="right" />
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

// export default TrainerList;
