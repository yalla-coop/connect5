import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, shadows } from '../../../theme';

export const LoginDiv = styled.div`
  margin: 0 auto;
  max-width: 400px;
  border-radius: 10px;
  @media (min-width: 768px) {
    box-shadow: ${shadows.secondary};
    background: ${colors.transGray};
    padding: 2.2rem 0;
  }
`;

export const LoginHeading = styled.div`
  margin: 0 auto;
  width: 80%;
  text-align: center;
  postion: absolute;
  padding: 3rem 0 2rem;
  @media (min-width: 768px) {
    padding: 1.5rem 0;
  }
`;

export const H4 = styled.h4`
  position: relative;
  text-align: center;
  color: #526192;
  left: -15%;
  top: -29px;
  @media (min-width: 768px) {
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

export const InputDiv = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-bottom: 2rem;

  @media (min-width: 768px)
    background: ${colors.ligthGray};
  }
`;

export const LoginFail = styled.div`
  width: 80%;
  color: red;
  margin-left: 3rem;
  font-size: 1rem;

  @media (min-width: 768px) {
    margin-left: 1rem;
  }
`;

export const NoAccount = styled(InputDiv)`
  padding: 0 1.6rem;
  &:not(:last-child) {
    margin-top: 6rem;
  }

  @media (min-width: 768px) {
    width: 60%;
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
  font-weight: 500;
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

  @media (min-width: 768px) {
    width: 50%;
    text-align: center;
    margin: 2rem auto;
  }
`;
