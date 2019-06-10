import styled from 'styled-components';
import { Form as AntForm, Input as AntInput, Select as AntSelect } from 'antd';

const { Item: AntItem } = AntForm;

export const Wrapper = styled.div``;

export const ContentWrapper = styled.div`
  max-width: 25rem;
  margin: 0 auto;
  padding: 5rem 15px;
`;

export const Form = styled(AntForm)`
  margin: 0 auto;
  text-align: center;
  padding: 20px 0;
`;

export const Input = styled(AntInput)`
  width: 90%;
  margin: 0 auto;
  height: 50px;
`;

export const Select = styled(AntSelect)`
  width: 90%;
`;

export const Item = styled(AntItem)`
  width: 90%;
  margin: 0 auto;
  margin-bottom: 20px;
  text-align: center;
`;

export const Bold = styled.span`
  font-weight: 900;
  text-transform: capitalize;
`;

export const Paragraph = styled.p``;
