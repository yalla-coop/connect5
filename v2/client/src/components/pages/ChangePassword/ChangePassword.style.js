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
`;

export const ChangePasswordForm = styled.form``;

export const InputDiv = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    width: 30%;
    background: ${colors.ligthGray};
  }
`;

export const Error = styled.div`
  width: 100%;
  color: red;
  margin-left: 1rem;
  font-size: .9rem;

  @media (min-width: 768px) {
    margin-left: 1rem;
  }
  }
`;
