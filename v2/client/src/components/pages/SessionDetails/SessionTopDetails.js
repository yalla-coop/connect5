import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
// import { fetchTrainerNames } from '../../../actions/trainerAction';
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
  componentDidUpdate(prevProps) {
    const { trainers } = this.props.sessionDetails;
    console.log(trainers, 'trainers');
    // this.props.fetchTrainersNames();
  }

  render() {
    const { sessionDetails } = this.props;
    const { date, type, numberOfAttendees } = sessionDetails;
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
            <StatisticName>Attendees</StatisticName>
            <StatisticValue>{numberOfAttendees}</StatisticValue>
          </StatisticItems>
          <StatisticItems>
            <StatisticName>Type</StatisticName>
            <StatisticValue>{type}</StatisticValue>
          </StatisticItems>
        </Statistic>
        <Trainers>
          Trainers:<TrainersName>Marwa & Mera</TrainersName>
        </Trainers>
      </SessionTopDetailsWrapper>
    );
  }
}
export default connect(
  null
  // { fetchTrainerNames }
)(SessionTopDetails);
