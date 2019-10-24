import React from 'react';
import { Table, message } from 'antd';
import styled from 'styled-components';

import FilterResults from '../FilterResults';

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
    dataIndex: 'confirmedParticipants',
    key: '3',
    align: 'center',
  },
];

const surveysColumns = [
  {
    title: 'Type',
    dataIndex: 'type',
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

const Reach = ({
  data,
  role,
  handleFilteredData,
  defaultFilters,
  hiddenFields,
}) => {
  // check if any response rates are over 100% and if so give the user a message
  const over100 =
    data.newSurveys &&
    data.newSurveys.filter(survey => {
      const responseRate = survey.responseRate.split('%')[0];
      return responseRate > 100;
    });

  if (over100.length > 0) {
    message.warning(
      <>
        <h3 style={{ fontSize: '1rem' }}>
          You have surveys with a response rate over 100%.
        </h3>
        <p>
          This is because you have had more responses than confirmed attendees.
          To fix this please update your sessions to have the correct number of
          people who attended
        </p>
      </>,
      3
    );
  }

  return (
    <div>
      <Head>Sessions</Head>

      <FilterResults
        role={role}
        handleFilteredData={handleFilteredData}
        defaultFilters={defaultFilters}
        hiddenFields={[...hiddenFields, 'sessionType', 'surveyType']}
      />
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
