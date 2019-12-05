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

const SessionList = ({ dataList, handleDrawerOpen }) => {
  return (
    <Wrapper>
      <Header>
        <DateHeader>Date</DateHeader>
        <TypeHeader>Type</TypeHeader>
        <DetailsHeader></DetailsHeader>
      </Header>
      <List>
        {dataList &&
          !!dataList.length &&
          dataList.map((dataItem, index) => (
            <>
              <Row key={dataItem._id}>
                <Date>{moment(dataItem.date).format('DD/MM/YYYY')}</Date>
                <Type type={dataItem.type}>
                  <p>{dataItem.type.replace(/-/g, ' ')}</p>
                </Type>
                <StyledLink
                  to="#"
                  onClick={handleDrawerOpen}
                  data-index={index}
                >
                  view
                </StyledLink>
              </Row>
            </>
          ))}
      </List>
    </Wrapper>
  );
};

export default SessionList;
