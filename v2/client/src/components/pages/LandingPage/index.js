import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Drawer } from 'antd';
import AboutUs from './AboutUs';

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

class LandingPage extends Component {
  state = { visible: false };

  onClose = () => {
    this.setState({ visible: false });
  };

  DrawerOpen = () => {
    this.setState({ visible: true });
  };

  render() {
    const { visible } = this.state;
    const { onClose, DrawerOpen } = this;
    const { isAuthenticated, role } = this.props;

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
          <ButtonDiv>
            <Button
              label="I want to find out more"
              width="100%"
              height="100%"
              type="primary"
              onClick={DrawerOpen}
            />
            <Drawer
              placement="left"
              width="100%"
              height="100%"
              onClose={onClose}
              visible={visible}
              closable
            >
              <AboutUs />
            </Drawer>
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
