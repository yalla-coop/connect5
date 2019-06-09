import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from '../../../theme';

export const ViewSessionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
    @media (min-width: 768px) {
      width: 50%
`;

export const TotalSessions = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 6rem;
`;

export const Span = styled.p`
  text-align: center;
`;

export const SessionsCount = styled.p`
  text-align: center;
  font-weight: 600;
  font-size: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const LinkBtn = styled(Link)`
  background-color: ${colors.lightPrimary};
  border-radius: 15px;
  border: 1px solid ${colors.lightPrimary};
  width: 200px;
  display: block;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 2rem;
  cursor: pointer;
  color: ${colors.white};
  font-size: 1rem;
  padding: 14px 25px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #2f6627;
  &:hover {
	background-color: ${colors.white};
  color: ${colors.lightPrimary};
  border: 1px solid ${colors.lightPrimary}
}
  &:active {
	position:relative;
	top:1px;
`;
