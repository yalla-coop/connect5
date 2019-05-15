import React from 'react';
import PropTypes from 'prop-types';
import { Table, Divider, Tag } from 'antd';

const columns = [
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

const data = [
  {
    key: '1',
    type: 'Session 1',
    sessions: 32,
    participants: 32,
  },
  {
    key: '2',
    type: 'Session 2',
    sessions: 32,
    participants: 32,
  },
  {
    key: '3',
    type: 'Session 3',
    sessions: 32,
    participants: 32,
  },
];

const Reach = () => {
  return (
    <div>
      <h2>Sessions</h2>
      <Table columns={columns} dataSource={data} pagination={false} />
      <h2>Surveys</h2>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

Reach.propTypes = {};

export default Reach;
