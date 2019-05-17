import React from 'react';

import { Icon } from 'antd';

import {
  Wrapper,
  Header,
  NameHeader,
  DetailsHeader,
  List,
  Row,
  Name,
  StyledLink,
} from './List.style.js';

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

const TrainerList = ({ dataList }) => {
  return (
    <Wrapper>
      <Header>
        <NameHeader>Name</NameHeader>
        <DetailsHeader>Info</DetailsHeader>
      </Header>
      <List>
        {dataList &&
          dataList.map(dataItem => (
            <Row>
              <Name>{dataItem.name}</Name>
              <StyledLink
                to={{
                  pathname: '/session-details',
                  state: { trainerId: dataItem.id },
                }}
              >
                <Icon type="right" />
              </StyledLink>
            </Row>
          ))}
      </List>
    </Wrapper>
  );
};

export default TrainerList;
