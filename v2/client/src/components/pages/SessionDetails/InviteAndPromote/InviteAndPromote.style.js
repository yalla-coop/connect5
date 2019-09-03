import styled from 'styled-components';
import { colors, shadows } from '../../../../theme';

export const InviteSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 0;
  margin: 0 auto;
  max-width: 600px;
  margin-bottom: 80px;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  margin: 1rem auto;
  padding: 20px 10px;
  border-radius: 10px;
  @media (min-width: 678px) {
    width: 65%;
  }
`;

export const EmailsList = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 2rem 0.5rem;
  margin-bottom: 2rem;
  background: ${colors.offWhite};
  box-shadow: ${shadows.secondary};
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
    padding-top: 2rem;
  }
`;

export const InputDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;

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
  padding: 2rem 0.5rem;
`;

export const InfoTitle = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: black;
`;

export const SessionInfoTitle = styled.span`
  color: ${colors.blackSecondary};
  margin-right: 2px;
`;

export const List = styled.ul`
  padding-left: 1.5rem;
  & > *
    margin-left: 0.5rem;
    font-size: 16px;
  }
`;
