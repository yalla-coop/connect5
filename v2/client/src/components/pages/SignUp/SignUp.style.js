import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form as AntForm, Input as AntInput, Select as AntSelect } from 'antd';

import { colors } from '../../../theme';

const { Item: AntItem } = AntForm;

export const Wrapper = styled.div``;

export const ContentWrapper = styled.div`
  max-width: 25rem;
  margin: 0 auto;
  padding: 5rem 15px;
`;

export const Title = styled.h1`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 21px;
  line-height: 29px;
  text-align: center;
  color: ${colors.profileFontColor};
`;

export const Form = styled(AntForm)`
  background: ${colors.lightGray};
  border: 1px solid ${colors.transLightGray};
  box-sizing: border-box;
  border-radius: 12px;
  margin: 0 auto;
  text-align: center;
  padding: 20px 0;
`;

export const Input = styled(AntInput)`
  width: 90%;
`;

export const Password = styled(Input.Password)`
  width: 90%;
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

export const Redirecting = styled.p``;

export const StyledLink = styled(Link)`
  font-weight: 900;
  color: ${colors.links};
`;
