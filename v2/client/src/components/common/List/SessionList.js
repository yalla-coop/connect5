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
