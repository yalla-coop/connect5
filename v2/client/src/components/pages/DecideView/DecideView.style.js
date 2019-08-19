import styled from 'styled-components';

import { colors, breakpoints } from '../../../theme';

export const Wrapper = styled.div`
  padding: 80px 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
`;

export const TopSection = styled.div`
  margin-bottom: 2rem;
  width: 100%;
  @media ${breakpoints.mobileL} {
    text-align: center;
    margin: 3rem 0;
  }
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export const Question = styled.p`
  margin-bottom: 2rem;
`;

export const ButtonWrapper = styled.div`
  margin-bottom: 2rem;
`;

export const LogOut = styled.div`
  font-weight: 300;
  font-size: 14px;
  color: ${colors.profileFontColor};
  padding: 0.5rem 0;
  cursor: pointer;

  :hover {
    color: ${colors.red};
  }
`;
