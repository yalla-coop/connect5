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
  font-size: 25px;
  line-height: 29px;
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${colors.profileFontColor};
  @media (min-width: 768px) {
  }
`;

export const Form = styled(AntForm)`
  border: 1px solid ${colors.transLightGray};
  box-sizing: border-box;
  border-radius: 12px;
  margin: 0 auto;
  text-align: center;
  padding: 7rem 0;
  box-shadow: rgb(204, 204, 204) 0px 0px 6px;
  & > div {
    margin: 0 auto;
    padding-bottom: 0.3rem;
  }

  & > div:first-child {
    padding-top: 2.2rem;
  }
`;

export const Input = styled(AntInput)`
  width: 90%;
  margin: 0 auto;
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
  text-align: center;
`;

export const Redirecting = styled.p`
  padding: 1rem 0;
`;

export const StyledLink = styled(Link)`
  font-weight: 900;
  color: ${colors.links};
  padding: 2rem 0;
`;
