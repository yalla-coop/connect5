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
                <p>{dataItem.type.replace(/-/g, ' ')}</p>
              </Type>
              <StyledLink
                as={dataItem.asLink ? 'a' : undefined}
                href={dataItem.link || undefined}
                to={dataItem.link || `/session-details/${dataItem._id}`}
                target={dataItem.blank ? '_blank' : '_self'}
              >
                {dataItem.linkText || <Icon type="right" />}
              </StyledLink>
            </Row>
          ))}
      </List>
    </Wrapper>
  );
};

export default SessionList;
