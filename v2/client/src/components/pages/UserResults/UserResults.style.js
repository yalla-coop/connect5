import styled from 'styled-components';

import { colors } from '../../../theme';

export const TrainerResultsWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding-top: ${props => (props.nudge ? '79px' : '48px')};
  padding-bottom: 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContentWrapper = styled.div`
  /* padding: 0 1rem; */
  width: 100%;
`;

export const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 3rem;
`;

export const TopSection = styled.div`
  margin: 2rem 0;
`;

export const Registration = styled.p`
  font-style: italic;
  font-weight: 300;
  margin-bottom: 1.5rem;
`;
