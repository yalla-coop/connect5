import React from 'react';

import {
  Wrapper,
  LogoContainer,
  Logo,
  DescriptionContainer,
  Headline,
  Paragraph,
  ButtonContainer,
} from './LandingPage.style';

import Connect5Logo from '../../../assets/connect-5-white.png';

export default function LandingPage() {
  return (
    <Wrapper>
      <LogoContainer>
        {' '}
        <Logo src={Connect5Logo} alt="logo" />
      </LogoContainer>
      <DescriptionContainer>
        <Headline>Welcome to the Connect5</Headline>
        <Paragraph>
          Please login using your trainer details or your participant PIN
        </Paragraph>
      </DescriptionContainer>
      <ButtonContainer>
        <button>1</button>
        <button>1</button>
        <button>1</button>
      </ButtonContainer>
    </Wrapper>
  );
}
