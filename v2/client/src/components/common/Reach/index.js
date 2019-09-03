import React from 'react';
import { Table } from 'antd';
import styled from 'styled-components';
import AntdModal from '../AntdModal';

const sessionsColumns = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: '1',
    align: 'center',
  },
  {
    title: 'Sessions',
    dataIndex: 'sessions',
    key: '2',
    align: 'center',
  },
  {
    title: 'Participants',
    dataIndex: 'participants',
    key: '3',
    align: 'center',
  },
];

const surveysColumns = [
  {
    title: 'Type',
    dataIndex: '_id',
    key: '1',
    align: 'center',
  },
  {
    title: '# of Responses',
    dataIndex: 'responses',
    key: '2',
    align: 'center',
  },
  {
    title: 'Response Rate',
    dataIndex: 'responseRate',
    key: '3',
    align: 'center',
  },
];

const Head = styled.h3`
  font-size: 20px;
  color: #4f4f4f;
  padding: 2rem 0 0 2rem;
  color: rgba(0, 0, 0, 0.8);
`;

const content =
  'This section provides an overview of sessions and related surveys collected via the app. I you wish to export the results click on "Export as CSV" and it will export and do';

const Reach = ({ data }) => {
  return (
    <div>
      <AntdModal
        title="About this section"
        content={content}
        btnStyle={{ margin: '1.5rem' }}
        style={{ top: '20' }}
      />
      <Head>Sessions</Head>
      <Table
        columns={sessionsColumns}
        dataSource={data.sessions}
        pagination={false}
      />
      <Head>Surveys</Head>
      <Table
        columns={surveysColumns}
        dataSource={data.newSurveys}
        pagination={false}
      />
    </div>
  );
};

export default Reach;
