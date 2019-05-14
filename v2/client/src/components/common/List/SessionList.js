import React from 'react';

import { Icon } from 'antd';

import {
  Wrapper,
  Header,
  DateHeader,
  TypeHeader,
  DetailsHeader,
  List,
  Row,
  Date,
  Type,
  StyledLink,
} from './List.style.js';

// NOTE: this component expects dataList to look something like this:

// const dummySessionList = [
//   {
//     date: '15-10-2018',
//     type: '2',
//     id: '12334234234123',
//   },
//   {
//     date: '15-10-2018',
//     type: '2',
//     id: '12334234234123',
//   },
//   {
//     date: '15-10-2018',
//     type: '2',
//     id: '12334234234123',
//   }
// ];

const SessionList = ({ dataList }) => {
  return (
    <Wrapper>
      <Header>
        <DateHeader>Date</DateHeader>
        <TypeHeader>Type</TypeHeader>
        <DetailsHeader>Details</DetailsHeader>
      </Header>
      <List>
        {dataList &&
          dataList.map(dataItem => (
            <Row>
              <Date>{dataItem.date}</Date>
              <Type type={dataItem.type}>
                <p>{dataItem.type}</p>
              </Type>
              <StyledLink
                to={{
                  pathname: '/session-details',
                  state: { sessionId: dataItem.id },
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

export default SessionList;
