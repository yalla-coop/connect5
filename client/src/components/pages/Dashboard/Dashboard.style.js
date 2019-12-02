import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colors, shadows, breakpoints } from '../../../theme';

export const Wrapper = styled.div`
  padding: 80px 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 750px;
  margin: 0 auto;
`;

export const TopSection = styled.div`
  margin-bottom: 1rem;
  width: 100%;
  @media ${breakpoints.mobileL} {
    text-align: center;
    margin: 1.2rem 0;
  }
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

export const Role = styled.p`
  font-size: 14px;
  font-weight: 300;
  text-transform: capitalize;
  @media ${breakpoints.mobileL} {
    font-size: 1rem;
    font-weight: 300;
  }
`;

export const TotalReach = styled(Role)``;

export const StatsWrapper = styled.div`
  background-color: ${colors.white};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 100%;
  box-shadow: ${shadows.primary};
  margin-bottom: 1rem;
`;

export const StatItem = styled(Link)`
  text-decoration: none;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 0;
  color: ${colors.profileFontColor};

  :hover {
    color: ${colors.profileFontColor};
  }
  @media ${breakpoints.mobileL} {
    padding: 2rem 0;
  }
`;

export const Label = styled.h3`
  font-weight: 300;
  font-size: 16px;
  margin-bottom: 0.5rem;
`;

export const StatNumber = styled.p`
  font-size: 1.5rem;
  color: ${colors.lightPrimary};
`;

export const StyledLink = styled(Link)`
  font-weight: 300;
  font-size: 14px;
  color: ${colors.profileFontColor};
  padding: 0.5rem 0;

  :hover {
    color: ${colors.red};
  }
`;

export const LogOut = styled.div`
  font-weight: 300;
  font-size: 14px;
  color: ${colors.profileFontColor};
  padding: 0.5rem 0;
  cursor: pointer;
  background: none;
  border: none;

  :hover {
    color: ${colors.red};
  }
`;

export const SpinWrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;
