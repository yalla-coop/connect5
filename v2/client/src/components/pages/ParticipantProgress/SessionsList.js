/* eslint-disable no-underscore-dangle */
import React from 'react';
import moment from 'moment';

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
} from '../../common/List/List.style';

const SessionList = ({ dataList }) => {
  return (
    <Wrapper>
      <Header>
        <DateHeader>Date</DateHeader>
        <TypeHeader>Type</TypeHeader>
        <DetailsHeader>certificate</DetailsHeader>
      </Header>
      <List>
        {dataList &&
          !!dataList.length &&
          dataList.map(({ sessions: dataItem }) => (
            <Row key={dataItem._id}>
              <Date>{moment(dataItem.date).format('DD/MM/YYYY')}</Date>
              <Type type={dataItem.type}>
                <p>{dataItem.type.replace(/-/g, ' ')}</p>
              </Type>
              <StyledLink to={`/certificate/${dataItem._id}`}>view</StyledLink>
            </Row>
          ))}
      </List>
    </Wrapper>
  );
};

export default SessionList;
