import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form as AntForm, Input as AntInput, Select as AntSelect } from 'antd';

import { colors, breakpoints } from '../../../theme';

const { Item: AntItem } = AntForm;

export const Wrapper = styled.div`
  padding-bottom: 1rem;
`;

export const ContentWrapper = styled.div`
  max-width: 25rem;
  margin: 0 auto;
  padding: 0 15px;
  @media ${breakpoints.mobileL} {
    margin-top: 0;
  }
`;

export const H2 = styled.h2`
  position: relative;
  text-align: center;
  color: #526192;
  left: -15%;
  top: -29px;
  @media ${breakpoints.mobileL} {
    left: -5%;
  }
`;

export const H4 = styled.h4`
  position: relative;
  text-align: center;
  color: #526192;
  left: -15%;
  top: -29px;
  @media ${breakpoints.mobileL} {
    left: -5%;
  }
`;

export const LoginHeading = styled.div`
  margin: 0 auto;
  width: 80%;
  text-align: center;
  postion: absolute;
  padding-top: 2rem;
  @media ${breakpoints.mobileL} {
    padding: 1.5rem 0;
  }
`;

export const Logo = styled.img`
  width: 250px;
  hieght: 250px;
  margin: 0 auto;
  margin-left: 10px;
  display: inline-block;
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
export const AnotherLink = styled(Link)`
  font-size: 1rem;
  font-weight: bold;
  color: ${colors.primary};
`;

export const Redirecting = styled.p``;

export const StyledLink = styled(Link)`
  font-weight: 900;
  color: ${colors.links};
`;
