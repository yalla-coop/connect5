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
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  align-items: center;
  justify-content: center;
  padding: 20px 10px 20px;
  border-radius: 10px;

  @media (min-width: 678px) {
    width: 65%;
  }
`;

export const ButtonLink = styled(Link)``;

export const ButtonDiv = styled.div`
  width: 300px;

  @media ${breakpointsMax.mobileS} {
    width: 150px;
  }

  button {
    font-size: 1.2rem;
    font-weight: 400;
    margin-top: 10px;

    @media ${breakpointsMax.mobileS} {
      font-size: 1rem;
    }
  }
`;
