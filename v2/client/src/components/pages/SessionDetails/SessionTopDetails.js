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
    console.log(date, type, numberOfAttendees, trainers, 'jjjjjjjjjjjjjjjjjj');
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
          Trainers:
          {trainers.map(trainer => (
            <TrainersName to="/">{trainer.name}</TrainersName>
          ))}
        </Trainers>
      </SessionTopDetailsWrapper>
    );
  }
}
export default connect(null)(SessionTopDetails);
