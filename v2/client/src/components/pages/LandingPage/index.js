import React from 'react';

import Toggle from '../../common/Toggle';

import SessionList from '../../common/List/SessionList';

const dummyDataList = [
  {
    date: '15-10-2018',
    type: '2',
    id: '12334234234123',
  },
  {
    date: '15-10-2018',
    type: '2',
    id: '12334234234123',
  },
  {
    date: '15-10-2018',
    type: '2',
    id: '12334234234123',
  },
  {
    date: '15-10-2018',
    type: '2',
    id: '12334234234123',
  },
  {
    date: '15-10-2018',
    type: '2',
    id: '12334234234123',
  },
  {
    date: '15-10-2018',
    type: '2',
    id: '12334234234123',
  },
];

export default function LandingPage() {
  return (
    <div>
      <h1>LandingPage</h1>
      <Toggle leftText="Left" rightText="right" selected="left" />
      <SessionList dataList={dummyDataList} />
    </div>
  );
}
