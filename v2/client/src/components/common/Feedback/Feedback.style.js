import styled from 'styled-components';
import { colors, borders } from '../../../theme';

export const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding-top: 50px;
`;

export const Container = styled.div`
  width: 98%;
`;
export const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -20px;
  padding-bottom: 30px;
  border-bottom: ${borders.inputBox};
`;
export const HeadlineDiv = styled.div`
  margin-left: 20px;
  padding-top: 20px;
`;

export const ChartWrapper = styled.div`
  margin-bottom: 10px;
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
