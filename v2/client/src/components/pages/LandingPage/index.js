import React, { Component } from 'react';
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
          </ButtonLink>
        </ButtonContainer>
      </Wrapper>
    );
  }
}

export default LandingPage;
