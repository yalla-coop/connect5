import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding-top: 50px;
`;

export const Container = styled.div`
  width: 98%;
`;

export const HeadlineDiv = styled.div`
  margin-left: 20px;
`;

export const Paragraph = styled.p`
  font-family: Roboto;
  font-style: italic;
  font-size: 30px;
  line-height: 37px;
  text-align: center;
  margin-bottom: 30px;
  color: #828282;
`;
export const ChartWrapper = styled.div`
  margin-bottom: 10px;
  padding: 20px 0;
`;

export const Description = styled.p`
  font-size: 16px;
  line-height: 19px;
  color: #4f4f4f;
  margin-bottom: 20px;
`;

export const Category = styled.p`
  font-size: 13px;
  font-style: italic;
  line-height: 19px;
  text-align: right;
  color: #4f4f4f;
  margin-bottom: 20px;
`;
export const Options = styled(Category)`
  text-align: left;
`;
