import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  SessionTopDetailsWrapper,
  Statistic,
  Trainers,
  StatisticItems,
  StatisticName,
  StatisticValue,
  TrainersName,
} from './SessionDetails.Style';

class SessionTopDetails extends Component {
  render() {
    const { sessionDetails } = this.props;
    const { date, type, numberOfAttendees, trainers } = sessionDetails;
    if (!sessionDetails) {
      return <div>loading</div>;
    }
    return (
      <SessionTopDetailsWrapper>
        <Statistic>
          <StatisticItems>
            <StatisticName>Date</StatisticName>
            <StatisticValue>{moment(date).format('DD/MM/YYYY')}</StatisticValue>
          </StatisticItems>
          <StatisticItems>
            <StatisticName>Type</StatisticName>
            <StatisticValue>{type}</StatisticValue>
          </StatisticItems>
          <StatisticItems>
            <StatisticName>Attendees</StatisticName>
            <StatisticValue>{numberOfAttendees}</StatisticValue>
          </StatisticItems>
        </Statistic>
        <Trainers>
          Trainer(s):
          <TrainersName to="/">{trainers[0].name}</TrainersName>
          {trainers[1] && (
            <TrainersName to="/">
              &<span style={{ marginLeft: '.8rem' }}>{trainers[1].name}</span>
            </TrainersName>
          )}
        </Trainers>
      </SessionTopDetailsWrapper>
    );
  }
}
export default connect(null)(SessionTopDetails);
