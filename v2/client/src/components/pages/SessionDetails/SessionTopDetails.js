import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  SessionTopDetailsWrapper,
  Statistic,
  StatisticItems,
  StatisticName,
  StatisticValue,
  TrainersName,
  SubDetails,
  SubDetailsContent,
  SubDetailsTitle,
} from './SessionDetails.Style';

class SessionTopDetails extends Component {
  render() {
    const { sessionDetails } = this.props;
    const {
      date,
      type,
      numberOfAttendees,
      trainers,
      startTime,
      endTime,
      address,
    } = sessionDetails;
    if (!sessionDetails) {
      return <div>loading</div>;
    }

    return (
      <SessionTopDetailsWrapper>
        <Statistic>
          <StatisticItems>
            <StatisticName>Date</StatisticName>
            <StatisticValue>{moment(date).format('DD/MM/YY')}</StatisticValue>
          </StatisticItems>
          <StatisticItems>
            <StatisticName>Type</StatisticName>
            <StatisticValue>{type.replace(/-/g, ' ')}</StatisticValue>
          </StatisticItems>
          <StatisticItems>
            <StatisticName>Attendees</StatisticName>
            <StatisticValue>{numberOfAttendees}</StatisticValue>
          </StatisticItems>
        </Statistic>
        <SubDetails>
          <SubDetailsTitle>Trainer(s):</SubDetailsTitle>
          <TrainersName to="/">{trainers[0].name}</TrainersName>
          {trainers[1] && (
            <TrainersName to="/">
              &<span style={{ marginLeft: '.5rem' }}>{trainers[1].name}</span>
            </TrainersName>
          )}
        </SubDetails>
        <SubDetails>
          <SubDetailsTitle>Address:</SubDetailsTitle>
          <SubDetailsContent>{address || 'Not entered'}</SubDetailsContent>
        </SubDetails>
        <SubDetails>
          <SubDetailsTitle>Times:</SubDetailsTitle>
          <SubDetailsContent>
            {startTime || 'N/A'} to {endTime || 'N/A'}
          </SubDetailsContent>
        </SubDetails>
      </SessionTopDetailsWrapper>
    );
  }
}
export default connect(null)(SessionTopDetails);
