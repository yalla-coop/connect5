import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

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
  ABOUT_URL,
} from '../../../constants/navigationRoutes';

import Connect5Logo from '../../../assets/connect-5-white.png';

import Button from '../../common/Button';

class LandingPage extends Component {
  render() {
    const { isAuthenticated, role } = this.props;

    if (isAuthenticated) {
      switch (role) {
        case 'admin':
        case 'localLead':
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
          <Logo src={Connect5Logo} alt="logo" />
        </LogoContainer>
        <DescriptionContainer>
          <Headline>Welcome to the Connect5</Headline>
          <Paragraph style={{ textAlign: 'center' }}>
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
          <ButtonLink to={`${ABOUT_URL}`} target="_blank">
            <ButtonDiv>
              <Button
                label="I want to find out more"
                width="100%"
                height="100%"
                type="primary"
              />
            </ButtonDiv>
          </ButtonLink>
          <ButtonDiv style={{ padding: '0.4rem .5rem' }}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://drive.google.com/file/d/1UKj901L9flxLPN1ZA11oNGk3UKhXBHqy/view?usp=sharing"
            >
              <Button
                label="Read Connect 5 User Manual"
                width="100%"
                height="100%"
                type="primary"
              />
            </a>
          </ButtonDiv>
        </ButtonContainer>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    role: state.auth.role,
  };
};

export default connect(mapStateToProps)(LandingPage);
