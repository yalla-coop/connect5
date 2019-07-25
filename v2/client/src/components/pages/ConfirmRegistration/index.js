/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getSessionDetails } from '../../../actions/sessionAction';
import { confirmRegistration } from '../../../actions/confirmRegistration';

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
  state = {
    email: '',
  };

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    const { shortId } = params;
    this.props.getSessionDetails(shortId);
  }

  handleSubmit = e => {
    e.preventDefault();
    const { sessionId } = this.props;
    const { email } = this.state;

    this.props.confirmRegistration({ email, sessionId });
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({ email: value });
  };

  render() {
    const { trainers, address, date } = this.props;
    const { email } = this.state;

    const trainersNames = trainers.map(trainer => trainer.name).join(' & ');
    return (
      <Wrapper>
        <ContentWrapper>
          <Header label="" type="view" />
          <Title>Connect 5 Invitation</Title>
          <form onSubmit={this.handleSubmit}>
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
              <Input
                placeholder="Enter Your Email"
                size="large"
                onChange={this.handleChange}
                value={email}
                type="email"
                required
              />
            </WhiteDiv>

            <Button
              size="large"
              style={{ background: '#c4c4c4', color: 'white' }}
              type="submit"
            >
              Register
            </Button>
          </form>
        </ContentWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ session: _session }) => {
  return {
    trainers: _session.trainers,
    sessionId: _session._id,
    address: _session.address,
    date: _session.date,
  };
};

export default connect(
  mapStateToProps,
  {
    getSessionDetails,
    confirmRegistration,
  }
)(ConfirmRegistration);
