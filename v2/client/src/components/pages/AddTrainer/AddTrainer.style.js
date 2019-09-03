import styled from 'styled-components';
import { Form as AntForm, Input as AntInput, Select as AntSelect } from 'antd';
import { colors } from '../../../theme';

const { Item: AntItem } = AntForm;

export const Wrapper = styled.div``;

export const ContentWrapper = styled.div`
  max-width: 25rem;
  margin: 0 auto;
  padding: 2rem 15px;
`;

export const Form = styled(AntForm)`
  border: 1px solid ${colors.transLightGray};
  box-sizing: border-box;
  border-radius: 4px;
  margin: 0 auto;
  text-align: center;
  padding: 1rem 0;
  box-shadow: rgb(204, 204, 204) 0px 0px 4px;
  & > div {
    margin: 0 auto;
  }
  & > div:first-child {
    padding-top: 0.5rem;
  }
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

export const BackLink = styled.button`
  border: none;
  background: none;
  color: ${colors.lightPrimary};
  font-weight: 500;
  cursor: pointer;
  outline: none;

  :focus,
  :hover {
    text-decoration: underline;
  }
`;

export const BackContainer = styled.div`
  width: 90%;
  padding: 0 20px;
  align-self: center;
  padding: 3rem 1rem 1rem;
`;
