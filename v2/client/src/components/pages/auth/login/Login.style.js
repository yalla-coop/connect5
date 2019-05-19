import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from '../../../../theme';

export const LoginHeading = styled.div`
  margin: 0 auto;
  width: 80%;
  padding: 1.5rem;
  text-align: center;
`;

export const H3 = styled.h3`
  text-align: center;
`;

export const LoginForm = styled.form`
  margin-top: 6rem;
`;

export const InputDiv = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-bottom: 2rem;
  @media (min-width: 768px) {
    width: 30%;
    background: ${colors.ligthGray}
`;

export const LoginFail = styled.div`
  width: 80%;
  color: red;
  margin-left: 3rem;
  font-size: 1rem;
  @media (min-width: 768px) {
    width: 30%;
    margin-left: 1rem;
`;

export const Button = styled.div`
  width: 100%;
  line-height: 40px;
  margin: 15px 0;
  border-radius: 9px;
  text-align: center;
  font-weight: 400;
  font-size: 1.4em;
  border: 1px solid ${colors.primary};
  background-color: ${colors.primary};
  color: ${colors.white};
  &:hover, &:focus {
    background-color: ${colors.white};
    color: ${colors.primary};
  }
  @media (min-width: 768px) {
    width: 100%;
    margin: 0 auto
`;

export const NoAccount = styled(InputDiv)`
  color: ${colors.black};
  margin-bottom: 0;
  &:not(:last-child) {
    margin-top: 6rem;
  };
  @media (min-width: 768px) {
    width: 30%;
    text-align: center
`;

export const RegisterLink = styled(Link)`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${colors.black};
`;
