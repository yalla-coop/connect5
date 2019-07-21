/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    return (
      <Wrapper>
        <ContentWrapper>
          <Header label="" type="view" />
          <Title>Connect 5 Invitation</Title>
          <WhiteDiv>
            <Details>
              <BoldSpan>Date of Session:</BoldSpan> 16-05-2019
            </Details>
            <Details>
              <BoldSpan>Trainers:</BoldSpan> Nisha & Alex
            </Details>
            <Details>
              <BoldSpan>Location:</BoldSpan> 1 Test Way, London, E4 T66
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
    location: session.location,
    date: session.date,
  };
};

export default connect(
  mapStateToProps,
  { getSessionDetails }
)(ConfirmRegistration);
