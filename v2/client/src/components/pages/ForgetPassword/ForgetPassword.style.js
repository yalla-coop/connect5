import styled from 'styled-components';
// import { Link } from 'react-router-dom';
import { colors } from '../../../theme';

export const Heading = styled.div`
  margin: 0 auto;
  width: 80%;
  padding: 1.5rem;
  text-align: center;
`;

export const H3 = styled.h3`
  text-align: center;
  font-size: 1.4rem;
`;

export const Hint = styled.p`
  text-align: center;
  @media (min-width: 768px) {
    width: 40%;
    padding: 1rem 0;
    margin: 0 auto;
  }
`;

export const ForgetPasswordForm = styled.form``;

export const InputDiv = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    width: 30%;
    background: ${colors.ligthGray};
  }
`;

export const ErrorMsg = styled.div`
  width: 80%;
  color: red;
  margin-left: 3rem;
  font-size: 1rem;

  @media (min-width: 768px) {
    width: 30%;
    margin-left: 1rem;
  }
`;
