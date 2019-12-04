import styled from 'styled-components';
import { colors } from '../../../theme';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  padding-top: 5rem;
  max-width: 650px;
`;

export const Span = styled.p`
  text-align: left;
  border-bottom: 1px solid ${colors.lightGray};
`;

export const BackWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80px;
  padding-left: 5%;
  cursor: pointer;
  margin: 2rem 0;
  font-weight: 500;
  font-size: 18px;
  cursor: pointer;
`;
