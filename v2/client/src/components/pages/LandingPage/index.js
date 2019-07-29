import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  Wrapper,
  LogoContainer,
  Logo,
  DescriptionContainer,
  Headline,
  Paragraph,
  ButtonContainer,
  ButtonLink,
  ButtonDiv,
} from './LandingPage.style';

// ROUTES
import {
  LOGIN_URL,
  PARTICIPANT_LOGIN,
} from '../../../constants/navigationRoutes';

import Connect5Logo from '../../../assets/connect-5-white.png';

import Button from '../../common/Button';

function LandingPage({ isAuthenticated, role }) {
  if (isAuthenticated) {
    switch (role) {
      case 'admin':
      case 'localLead':
        return <Redirect to="/welcome-back" />;
      case 'trainer':
        return <Redirect to="/dashboard" />;
      case 'participant':
        return <Redirect to="/participant-dashboard" />;
      default:
        break;
    }
  }

  return (
    <Wrapper>
      <LogoContainer>
        {' '}
        <Logo src={Connect5Logo} alt="logo" />
      </LogoContainer>
      <DescriptionContainer>
        <Headline>Welcome to the Connect5</Headline>
        <Paragraph>
          Welcome to the App of the mental health training programme Connect 5
        </Paragraph>
      </DescriptionContainer>
      <ButtonContainer>
        <ButtonLink to={`${LOGIN_URL}`}>
          <ButtonDiv>
            <Button
              label="I'm a Trainer or Local Lead"
              width="100%"
              height="100%"
              type="primary"
            />
          </ButtonDiv>
        </ButtonLink>
        <ButtonLink to={`${PARTICIPANT_LOGIN}`}>
          <ButtonDiv>
            <Button
              label="I'm a Course Participant"
              width="100%"
              height="100%"
              type="primary"
            />
          </ButtonDiv>
        </ButtonLink>
        <ButtonLink to="/">
          <ButtonDiv>
            <Button
              label="I want to find out more"
              width="100%"
              height="100%"
              type="primary"
            />
          </ButtonDiv>
        </ButtonLink>
      </ButtonContainer>
    </Wrapper>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    role: state.auth.role,
  };
};

export default connect(mapStateToProps)(LandingPage);
