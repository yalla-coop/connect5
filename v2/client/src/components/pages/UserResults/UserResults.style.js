import styled from 'styled-components';

export const TrainerResultsWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding-top: ${props => (props.nudge ? '79px' : '48px')};
`;

export const ContentWrapper = styled.div`
  padding: 0 1rem;
`;

export const Header = styled.div`
  background: #c4c4c4;
  padding: 2rem 0;
  font-weight: normal;
  font-size: 27px;
  color: #f2f2f2;
`;

export const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 3rem;
`;
