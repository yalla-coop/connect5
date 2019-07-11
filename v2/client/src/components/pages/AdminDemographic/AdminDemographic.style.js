import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding-top: 48px;
  padding-bottom: 80px;
  text-align: center;
`;

export const Title = styled.p`
  text-align: center;
  font-family: Roboto;
  margin-bottom: 0;
  margin-top: 2rem;
  font-weight: 300;
  font-size: 22px;
  color: #a9a9a9;
`;

export const BoldNumber = styled.p`
  text-align: center;
  font-weight: 600;
  font-size: 1.5rem;
  margin: 1.5rem 0 3rem 0;
`;

export const ChartWrapper = styled.div`
  height: 300px;
  max-width: 500px;
  margin: 0 auto;
`;

export const DoughnutChartWrapper = styled.div`
  height: 300px;
  max-width: 250px;
  margin: 0 auto;
  @media (min-width: 768px) {
    height: 400px;
    max-width: 300px;
    margin: 0 auto;
    padding: 2rem auto;
  }
`;

export const Legend = styled.p`
  font-family: Roboto;
  font-size: 22px;
  text-align: center;
  color: #828282;
  margin-top: 4rem;
  @media (min-width: 768px) {
    margin-top: 6rem;
  }
`;

export const AdminSessionsWrapper = styled.div`
  max-width: 25rem;
  margin: 0 auto;
  padding-bottom: 5rem;
`;

export const TopInfo = styled.div`
  width: 80%;
  margin: 0 auto;
  text-align: center;
`;

export const TotalSessions = styled.p`
  text-align: center;
  font-weight: 300;
  font-size: 22px;
  color: #a9a9a9;
  margin-top: 2rem;
`;

export const SessionsNum = styled.p`
  text-align: center;
  font-weight: 600;
  font-size: 1.5rem;
  margin: 1.5rem 0 3rem 0;
`;
