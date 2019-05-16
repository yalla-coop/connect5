import React from 'react';
import { Table } from 'antd';

const sessionsColumns = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    // render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: 'Sessions',
    dataIndex: 'sessions',
    key: 'sessions',
  },
  {
    title: 'Participants',
    dataIndex: 'participants',
    key: 'participants',
  },
];

const surveysColumns = [
  {
    title: 'Type',
    dataIndex: '_id',
    key: 'type',
  },
  {
    title: '# of Responses',
    dataIndex: 'responses',
    key: 'responses',
  },
  {
    title: 'Response Rate',
    dataIndex: 'responseRate',
    key: 'responseRate',
  },
];

const Reach = ({ data }) => {
  return (
    <div>
      <h2>Sessions</h2>
      <Table
        columns={sessionsColumns}
        dataSource={data.sessions}
        pagination={false}
      />
      <h2>Surveys</h2>
      <Table
        columns={surveysColumns}
        dataSource={data.surveys}
        pagination={false}
      />
    </div>
  );
};

export default Reach;
