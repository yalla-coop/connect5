import styled from 'styled-components';
import { colors, shadows } from '../../../theme';

export const CreateSessionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 45px 0;
  margin: 0 auto;
  max-width: 600px;
  padding-bottom: 80px;
`;

export const Heading = styled.h1`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 29px;
  text-align: center;
  color: ${colors.profileFontColor};
  padding: 0.5rem 0;
`;

export const Form = styled.form`
  background: ${colors.lightGray};
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 1rem auto;
  padding: 30px 10px;
  border-radius: 10px;
  box-shadow: rgb(204, 204, 204) 0px 0px 6px;
  @media (min-width: 678px) {
    width: 65%;
  }
`;

export const InputDiv = styled.div`
  width: 100%;
  margin: 0 auto;
  border: 1px solid ${colors.lightGray};
  &:not(:last-child) {
    margin-bottom: 1.2rem;
  }

  @media (min-width: 768px) {
    width: 90%;
  }
`;

export const SubmitBtn = styled.div`
  margin: .5rem 0;
  @media (min-width: 768px) {
    width: 90%;
    margin: 0 auto;
`;

export const Error = styled.p`
  color: red;
  padding: 0;
  margin: 20px auto 0;
`;
