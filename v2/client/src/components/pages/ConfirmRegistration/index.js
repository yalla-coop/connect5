/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { message } from 'antd';
import { getSessionDetails } from '../../../actions/sessionAction';
import { confirmRegistration } from '../../../actions/confirmRegistration';

import Header from '../../common/Header';
import CommonButton from '../../common/Button';

import { DASHBOARD_URL } from '../../../constants/navigationRoutes';
import {
  Wrapper,
  ContentWrapper,
  Title,
  WhiteDiv,
  Details,
  BoldSpan,
  Input,
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

  componentDidUpdate() {
    const { isAuthenticated, role, history } = this.props;
    if (isAuthenticated && role !== 'participant') {
      message.warning(`You logged in as ${role}`);
      history.push(DASHBOARD_URL);
    }
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
    const { trainers, address, date, loading } = this.props;
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
                <BoldSpan>Location:</BoldSpan>{' '}
                {(address && address.location) || 'N/A'}
              </Details>
              <Details>
                <BoldSpan>Address Line 1:</BoldSpan>{' '}
                {(address && address.addressLine1) || 'N/A'}
              </Details>
              <Details>
                <BoldSpan>Address Line 2:</BoldSpan>{' '}
                {(address && address.Addressline2) || 'N/A'}
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

            <CommonButton
              size="large"
              style={{ marginTop: '2rem' }}
              type="primary"
              label="Register"
              loading={loading}
            >
              Register
            </CommonButton>
          </form>
        </ContentWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({
  session: _session,
  auth: _auth,
  loading: _loading,
}) => {
  return {
    trainers: _session.trainers,
    sessionId: _session._id,
    address: _session.address,
    date: _session.date,
    isAuthenticated: _auth.isAuthenticated,
    role: _auth.role,
    loading: _loading.confirmRegistrationLoading,
  };
};

export default connect(
  mapStateToProps,
  {
    getSessionDetails,
    confirmRegistration,
  }
)(ConfirmRegistration);
