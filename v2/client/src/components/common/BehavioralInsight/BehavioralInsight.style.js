import styled from 'styled-components';
import { breakpoints, colors } from '../../../theme';

export const Wrapper = styled.div`
  background: ${({ backgroundColor }) => backgroundColor || '#f7f8f9'};
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
  font-weight: ${({ bold }) => (bold ? 500 : 300)};
  font-size: 16px;
  padding: 10px 40px;
  color: #4f4f4f;
  margin-bottom: ${({ mb0 }) => (mb0 ? 0 : '1rem')};

  @media ${breakpoints.mobileXL} {
    font-size: 18px;
  }
`;

export const ListItem = styled.p`
  font-family: Roboto;
  font-style: italic;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: #828282;
  padding: 10px 40px;
  margin-bottom: 0;
`;

export const ReadMore = styled.span`
  font-family: Roboto;
  font-style: italic;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  text-decoration-line: underline;
  cursor: pointer;
  margin-left: 0.5rem;
`;
