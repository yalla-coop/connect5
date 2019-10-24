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
      trainers,
      startTime,
      endTime,
      address,
      numberOfAttendees,
    } = sessionDetails;
    if (!sessionDetails) {
      return <div>loading</div>;
    }

    let fullAddress = '';

    if (address) {
      const { postcode, addressLine1, addressLine2 } = address;
      if (postcode || addressLine1 || addressLine2) {
        fullAddress = [addressLine1, addressLine2, postcode]
          .filter(item => !!item)
          .join(', ');
      }
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
            <StatisticName>Capacity</StatisticName>
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
          <SubDetailsContent>{fullAddress || 'TBC'}</SubDetailsContent>
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

const mapStateToProps = state => {
  return {
    isMobile: state.checkBrowserWidth.isMobile,
  };
};

export default connect(mapStateToProps)(SessionTopDetails);
