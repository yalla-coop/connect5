import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { borders, colors } from '../../../../theme';

export const InviteSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 0;
  margin: 0 auto;
  max-width: 600px;
  margin-bottom: 80px;
`;

export const Form = styled.div`
  background: ${colors.lightGray};
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 1rem auto;
  padding: 20px 10px;
  border-radius: 10px;
  @media (min-width: 678px) {
    width: 65%;
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
  @media (min-width: 678px) {
    width: 65%;
  }
`;

export const InputDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
  border: 1px solid ${colors.lightGray};
  &:not(:last-child) {
    margin-bottom: 1.2rem;
  }

  @media (min-width: 768px) {
    width: 90%;
  }
`;

export const EmailInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 0;
  margin: 0 auto;
  max-width: 600px;
  margin-bottom: 80px;
`;

export const EmailInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 1.5rem;
`;

export const InfoTitle = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  color: black;
`;

export const List = styled.ul`
  & > * {
    list-style: none;
    margin-left: 1rem;
  }
`;
