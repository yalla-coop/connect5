import styled from 'styled-components';
import { breakpoints } from '../../../theme';

export const TrainerResultsWrapper = styled.div`
  max-width: 650px;
  margin: 0 auto;
  padding-top: ${props => (props.nudge ? '79px' : '50px')};
  padding-bottom: 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${breakpoints.mobileL} {
    padding: 6rem 0.5rem;
  }
`;

export const ContentWrapper = styled.div`
  padding: 0.5rem;
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

export const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 5px 0 0;
`;
