import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colors, breakpointsMax } from '../../../theme';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20vh;
  width: 100%;
  background: ${colors.primary};
`;

export const Logo = styled.img`
  height: 100px;
  margin: 0;
`;

export const DescriptionContainer = styled.div`
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Headline = styled.h1`
  font-size: 1.5rem;

  @media ${breakpointsMax.mobileS} {
    font-size: 1.1rem;
  }
`;

export const Paragraph = styled.p`
  font-size: 1rem;
  font-weight: 300;
  text-align: center;
  padding: 1.3rem 0 0.7rem 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 678px) {
    width: 65%;
  }
`;

export const ButtonLink = styled(Link)``;

export const ButtonDiv = styled.div`
  width: 300px;
  height: 60px;
  padding: 10px 10px 10px 10px;

  @media ${breakpointsMax.mobileS} {
    width: 150px;
    height: 80px;
  }

  button {
    font-size: 1rem;
    font-weight: 350;
    opacity: 0.8;
    color: ${colors.black};
    background-color: ${colors.white};
  }

  button: hover {
    opacity: 1;
    font-weight: 400;
    color: ${colors.white};
    background-color: ${colors.primary};
  }
`;
