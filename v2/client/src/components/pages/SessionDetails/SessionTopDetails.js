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

import AntdModal from '../../common/AntdModal';

class SessionTopDetails extends Component {
  render() {
    const { sessionDetails } = this.props;
    const {
      date,
      type,
      trainers,
      startTime,
      endTime,
      address,
    } = sessionDetails;
    if (!sessionDetails) {
      return <div>loading</div>;
    }

    let fullAddress = '';

    if (address) {
      const { location, addressLine1, addressLine2 } = address;
      if (location || addressLine1 || addressLine2) {
        fullAddress = `${location}, ${addressLine1}, ${addressLine2}`;
      }
    }

    const confirmedAttendeesNumber =
      sessionDetails &&
      sessionDetails.participantsEmails.filter(
        item => item.status === 'confirmed'
      ).length;

    const content =
      'This section provides an overview about the basic session details. You can edit those details by clicking "Edit Session" or delete the session by clicking "Delete Session".';

    return (
      <SessionTopDetailsWrapper>
        <AntdModal
          title="About this section"
          content={content}
          btnStyle={{ margin: '1.5rem' }}
          style={{ top: '20' }}
        />
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
            <StatisticName>Session Capacity</StatisticName>
            <StatisticValue>{confirmedAttendeesNumber}</StatisticValue>
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
          <SubDetailsContent>{fullAddress || 'Not entered'}</SubDetailsContent>
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
