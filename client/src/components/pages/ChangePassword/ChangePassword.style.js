import styled from 'styled-components';
// import { Link } from 'react-router-dom';
import { colors, shadows } from '../../../theme';

export const Heading = styled.div`
  margin: 0 auto;
  width: 80%;
  padding: 1.5rem;
  text-align: center;
`;

export const H3 = styled.h3`
  text-align: center;
  font-size: 1.17rem;
  padding: 0.5rem;
  @media (min-width: 768px) {
    font-size: 1.4rem;
  }
`;

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
`;

export const ChangePasswordForm = styled.form`
  max-width: 400px;
  margin: 0 auto;
  @media (min-width: 768px) {
    margin-top: 3rem;
    background: ${colors.backgroundWashOut};
    padding: 1rem;
    box-shadow: ${shadows.secondary};
  }
`;

export const InputDiv = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    background: ${colors.ligthGray};
  }
`;

export const Error = styled.div`
  width: 100%;
  color: ${colors.red};
  margin-left: 1rem;
  font-size: 0.9rem;

  @media (min-width: 768px) {
    margin-left: 1rem;
  }
`;
