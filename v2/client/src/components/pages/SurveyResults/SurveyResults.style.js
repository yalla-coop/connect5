import styled from 'styled-components';

export const TrainerResultsWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding-top: 48px;
  padding-bottom: 80px;
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

export const StatsDiv = styled.div`
  background: #fff;
  border-radius: 5px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 12px 1px #00000011;
  padding: 10px 10px;
  margin-bottom: 20px;
`;

export const Paragraph = styled.p`
  font-family: Roboto;
  font-size: 15px;
  color: #000000;
  margin: 10px auto;
  margin-bottom: ${({ first }) => (first ? '20px' : '10px')};
  text-align: ${({ align }) => align || 'left'};
`;

export const Bold = styled.span`
  font-weight: 900;
`;

export const Answer = styled.p`
  font-family: Roboto;
  padding: 10px 0;
  font-size: 18px;
  font-weight: 400;
`;

export const IndividualWrapper = styled.div`
  margin-top: 25px;
  background-color: #eff3f4;
`;

export const NavigationWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 36%;
  margin: 20px auto 0;
  text-align: center;
`;

export const IndividualQuestion = styled.div`
  font-family: Roboto;
  padding: 20px 11px 10px;
  text-align: justify;
  font-weight: 700;
  margin-bottom: 0;
  line-height: 26px;
  border-bottom: 1px solid #66666666;
  font-size: 18px;
`;

export const QuestionSpan = styled.span`
  font-weight: 900;
  font-size: 21px;
  margin-right: 8px;
  margin-bottom: 15px;
`;

export const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 50px;
  font-size: 28px;
`;

export const Arrow = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-radius: 5px;
  cursor: pointer;
  border-${props => props.direction}: 20px solid #C4C4C4;
`;
