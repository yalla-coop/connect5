import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from '../../../theme';

export const DashboardWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  padding-top: 3rem;
`;

export const H3 = styled.h3`
  text-align: center;
  margin: 0 auto;
  padding-top: 3rem;
`;

export const Content = styled.p`
  text-align: center;
  margin-top: 3rem;
`;

export const Span = styled.span`
  text-align: center;
  display: block;
`;

export const Pin = styled.span`
  text-align: center;
  font-weight: 600;
  font-size: 1.5rem;
  display: block;
  margin-top: 1.5rem;
  margin-bottom: 3rem;
`;

export const LinkBtn = styled(Link)`
  background-color: ${colors.lightPrimary};
  border-radius: 28px;
  border: 1px solid ${colors.lightPrimary};
  width: 200px;
  display: block;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 2rem;
  cursor: pointer;
  color: ${colors.white};
  font-size: 1.2rem;
  padding: 14px 30px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #2f6627;

  &:hover {
    background-color: ${colors.white};
    color: ${colors.lightPrimary};
    border: 1px solid ${colors.lightPrimary};
  }

  &:active {
    position: relative;
    top: 1px;
  }
`;

export const LogOut = styled.div`
  font-weight: 300;
  font-size: 14px;
  color: ${colors.profileFontColor};
  padding: 0.5rem 0;
  width: 100%;
  text-align: center;
  cursor: pointer;

  :hover {
    color: ${colors.red};
  }
`;
