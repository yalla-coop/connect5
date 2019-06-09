import styled from 'styled-components';
import { breakpoints } from '../../../theme';

export const Wrapper = styled.div`
  background: #f7f8f9;
`;

export const ContentWrapper = styled.div`
  margin: 0 auto;
`;
export const Description = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  padding: 10px;
  color: #4f4f4f;

  @media ${breakpoints.mobileXL} {
    font-size: 18px;
  }
`;

export const ChartWrapper = styled.div`
  margin-bottom: 20px;
  padding: 20px 0;
`;

export const WhiteWrapper = styled.div`
  margin: 0 auto;
  max-width: 600px;
  background: #fff;
  padding: 10px;
`;

export const Title = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;

  color: #4f4f4f;

  @media ${breakpoints.mobileXL} {
    font-size: 18px;
  }
`;
