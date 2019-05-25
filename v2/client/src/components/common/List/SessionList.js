import React from 'react';
import moment from 'moment';

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
} from './List.style';

// NOTE: this component expects dataList to look something like this:

const SessionList = ({ dataList }) => {
  console.log(dataList);
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
            <Row key={dataItem.id}>
              <Date>{moment(dataItem.date).format('DD/MM/YYYY')}</Date>
              <Type type={dataItem.type}>
                <p>{dataItem.type}</p>
              </Type>
              <StyledLink to={`/session-details/${dataItem._id}`}>
                <Icon type="right" />
              </StyledLink>
            </Row>
          ))}
      </List>
    </Wrapper>
  );
};

export default SessionList;
