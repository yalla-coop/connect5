/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getSessionDetails } from '../../../actions/sessionAction';

import Header from '../../common/Header';

import {
  Wrapper,
  ContentWrapper,
  Title,
  WhiteDiv,
  Details,
  BoldSpan,
  Input,
  Button,
  CapitalizedSpan,
} from './ConfirmRegistration.style';

class ConfirmRegistration extends Component {
  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    const { shortId } = params;
    this.props.getSessionDetails(shortId);
  }

  render() {
    const { trainers, address, date } = this.props;
    const trainersNames = trainers.map(trainer => trainer.name).join(' & ');
    return (
      <Wrapper>
        <ContentWrapper>
          <Header label="" type="view" />
          <Title>Connect 5 Invitation</Title>
          <WhiteDiv>
            <Details>
              <BoldSpan>Date of Session:</BoldSpan>{' '}
              {date ? moment(date).format('DD-MM-YYYY') : 'N/A'}
            </Details>
            <Details>
              <BoldSpan>Trainers:</BoldSpan>{' '}
              <CapitalizedSpan>{trainersNames || 'N/A'}</CapitalizedSpan>
            </Details>
            <Details>
              <BoldSpan>Location:</BoldSpan> {address || 'N/A'}
            </Details>
            <Details center>
              <BoldSpan>
                Please enter your email below to confirm your attendance
              </BoldSpan>
            </Details>
            <Input placeholder="Enter Your Email" size="large" />
          </WhiteDiv>

          <Button
            size="large"
            style={{ background: '#c4c4c4', color: 'white' }}
          >
            Register
          </Button>
        </ContentWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ session }) => {
  return {
    trainers: session.trainers,
    sessionId: session._id,
    address: session.address,
    date: session.date,
  };
};

export default connect(
  mapStateToProps,
  { getSessionDetails }
)(ConfirmRegistration);
