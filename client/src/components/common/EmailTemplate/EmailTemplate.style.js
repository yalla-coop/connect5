import styled from 'styled-components';
import { colors } from '../../../theme';

export const Wrapper = styled.div`
  font-family: Roboto;
  margin: 0 auto;
`;

export const EmailInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0.5rem;
`;

export const InfoTitle = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: black;
`;

export const SessionInfoTitle = styled.span`
  color: ${colors.blackSecondary};
  margin-right: 2px;
`;

export const List = styled.ul`
  padding-left: 1.5rem;
  & > * {
    margin-left: 0.5rem;
    font-size: 16px;
  }
`;
