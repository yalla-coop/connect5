import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, shadows, breakpoints } from '../../../theme';

export const LoginDiv = styled.div`
  margin: 0 auto;
  // max-width: 400px;
  border-radius: 10px;
  max-width: 25rem;
  @media ${breakpoints.mobileL} {
    box-shadow: ${shadows.secondary};
    background: ${colors.backgroundWashOut};
    padding: 2.6rem 0 2rem;
  }
`;

export const LoginHeading = styled.div`
  margin: 0 auto;
  width: 80%;
  text-align: center;
  postion: absolute;
  padding: 3rem 0 2rem;
  @media ${breakpoints.mobileL} {
    padding: 1.5rem 0;
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

export const Logo = styled.img`
  width: 250px;
  hieght: 250px;
  margin: 0 auto;
  margin-left: 10px;
  display: inline-block;
`;

export const LoginForm = styled.form``;

export const LoginPINForm = styled.form`
  max-width: 25rem;
  margin: 0 auto;
  margin-top: -4rem;
  @media ${breakpoints.mobileL} {
    box-shadow: ${shadows.secondary};
    background: ${colors.backgroundWashOut};
    margin: 0 auto;
    padding: 0.55rem 0;
  }
`;

export const InputDiv = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-bottom: 2rem;

  @media ${breakpoints.mobileL} {
    background: ${colors.ligthGray};
  }
`;

export const LoginFail = styled.div`
  width: 80%;
  color: ${colors.red};
  margin-left: 3rem;
  font-size: 1rem;

  @media ${breakpoints.mobileL} {
    margin-left: 1rem;
  }
`;

export const NoAccount = styled(InputDiv)`
  margin: 0 auto;
  margin-right: 1.6rem;
  &:not(:last-child) {
    margin-top: 6rem;
  }

  @media ${breakpoints.mobileL} {
    width: 70%;
    text-align: center;
    margin: 0 auto;
    padding: 0;
  }
`;

export const AnotherLink = styled(Link)`
  font-size: 1rem;
  font-weight: bold;
  color: ${colors.primary};
`;

export const Paragraph = styled.p`
  font-size: 0.9rem;
`;

export const ForgetPasswordLink = styled(Link)`
  display: block;
  font-size: 0.9rem;
  text-align: right;
  color: ${colors.primary};
`;

export const Content = styled.p`
  text-align: center;
  margin: 0 auto;

  @media ${breakpoints.mobileL} {
    text-align: center;
    margin: 2rem auto;
  }
`;
