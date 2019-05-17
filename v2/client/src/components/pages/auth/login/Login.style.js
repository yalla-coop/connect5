import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  @media (min-width: 670px) {
    width: 40%;
`;

export const LoginFail = styled.div`
  color: red;
  margin-left: 0.5rem;
  font-size: 1rem;
`;

export const NoAccount = styled(InputDiv)`
  color: grey;
  margin-top: 6rem;
`;

export const RegisterLink = styled(Link)`
  font-size: 0.9rem;
  font-weight: bold;
`;
