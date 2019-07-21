import React from 'react';
import moment from 'moment';

import { Icon } from 'antd';

import {
  Wrapper,
  Header,
  DateHeader,
  DetailsHeader,
  List,
  Row,
  Date,
  StyledLink,
} from './List.style';

// NOTE: this component expects dataList to look something like this:

const SessionList = ({ dataList }) => {
  return (
    <Wrapper>
      <Header>
        <DateHeader>Date</DateHeader>
        <DetailsHeader>Info</DetailsHeader>
      </Header>
      <List>
        {dataList &&
          dataList.map(dataItem => (
            <Row key={dataItem.id}>
              <Date>{moment(dataItem.date).format('DD/MM/YYYY')}</Date>
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
