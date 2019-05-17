import React from 'react';
import { Table } from 'antd';
import styled from 'styled-components';

const sessionsColumns = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: '1',
  },
  {
    title: 'Sessions',
    dataIndex: 'sessions',
    key: '2',
  },
  {
    title: 'Participants',
    dataIndex: 'participants',
    key: '3',
  },
];

const surveysColumns = [
  {
    title: 'Type',
    dataIndex: '_id',
    key: '1',
  },
  {
    title: '# of Responses',
    dataIndex: 'responses',
    key: '2',
  },
  {
    title: 'Response Rate',
    dataIndex: 'responseRate',
    key: '3',
  },
];

const Head = styled.h3`
  font-size: 18px;
  color: #4f4f4f;
`;

const Reach = ({ data }) => {
  return (
    <div>
      <Head>Sessions</Head>
      <Table
        columns={sessionsColumns}
        dataSource={data.sessions}
        pagination={false}
      />
      <Head>Surveys</Head>
      <Table
        columns={surveysColumns}
        dataSource={data.surveys}
        pagination={false}
      />
    </div>
  );
};

export default Reach;
