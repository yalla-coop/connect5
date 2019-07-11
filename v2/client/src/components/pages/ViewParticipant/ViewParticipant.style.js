import styled from 'styled-components';

export const PageWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding-top: 48px;
  padding-bottom: 80px;
`;

export const ContentWrapper = styled.div`
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
  padding-top: 50px;
`;

export const IndividualQuestion = styled.div`
  font-family: Roboto;
  padding: 20px 11px 10px;
  text-align: left;
  font-weight: 700;
  margin-bottom: 0;
  line-height: 26px;
  border-bottom: 1px solid #66666666;
  font-size: 18px;
`;

export const SessionSpan = styled.span`
  font-family: Roboto;
  font-weight: bold;
  font-size: 16px;

  color: #000000;
`;

export const Answer = styled.p`
  font-family: Roboto;
  padding: 5px 0;
  font-size: 18px;
  font-weight: 400;
  margin: 0;
`;

export const Session = styled.p`
  font-family: Roboto;
  font-weight: 300;
  font-size: 16px;
  color: #4f4f4f;
  margin: 0;
  line-height: 27px;
  margin-left: 11px;

  .trainer {
    font-weight: 900;
  }
`;

export const AnswersWrapper = styled.div`
  padding-left: 11px;
`;
