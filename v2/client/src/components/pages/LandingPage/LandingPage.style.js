import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colors, shadows } from '../../../theme';

export const Wrapper = styled.div`
  padding: 80px 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoContainer = styled.div`
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 110px;
  width: 100%;
  background: ${colors.primary};
`;

export const Logo = styled.img`
  height: 100px;
  margin: 0;
`;

export const DescriptionContainer = styled.div`
  border: 1px solid;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Headline = styled.h1`
  font-size: 1.5rem;
`;

export const Paragraph = styled.p`
  font-size: 1rem;
  font-weight: 300;
  text-align: center;
`;

export const ButtonContainer = styled.div`
  background: ${colors.lightGray};
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 1rem auto;
  padding: 20px 10px;
  border-radius: 10px;
  @media (min-width: 678px) {
    width: 65%;
  }
`;
