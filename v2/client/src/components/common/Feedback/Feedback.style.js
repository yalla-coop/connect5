import styled from 'styled-components';
import { colors, borders } from '../../../theme';

export const Wrapper = styled.div`
  background: #f7f8f9;
`;

export const Container = styled.div`
  margin: 0 auto;
`;

export const WhiteWrapper = styled.div`
  margin: 0 auto;
  max-width: 600px;
  background: #fff;
  padding: 10px;
`;

export const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
  border-bottom: ${borders.inputBox};
`;
export const HeadlineDiv = styled.div`
  margin-left: 20px;
  padding-top: 20px;
`;

export const ChartWrapper = styled.div`
  margin-bottom: 20px;
  padding: 20px 0;
`;

export const Description = styled.p`
  font-size: 16px;

  font-weight: 300;
  color: ${colors.black};
  margin-bottom: 20px;
`;

export const Category = styled.p`
  font-size: 13px;
  font-style: italic;
  line-height: 19px;
  text-align: right;
  color: ${colors.black};
  margin-bottom: 20px;
  opacity: 0.7;
`;
export const Options = styled(Category)`
  text-align: left;
`;
