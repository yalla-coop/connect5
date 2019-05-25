import styled from 'styled-components';
import { colors } from '../../../theme';

export const CreateSessionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 25px;
  margin: 20px auto;
  max-width: 600px;
  margin-bottom: 80px;
`;
export const Heading = styled.h1`
  font-size: 28px;
  text-align: center;
  font-weight: 900;
`;

export const Form = styled.form`
  background: none;
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 10px auto;
  padding: 15px 14px;
  border-radius: 15px;
  @media (min-width: 678px) {
    width: 80%;
  }
`;

export const InputDiv = styled.div`
width: 90%;
margin: 0 auto;
margin-bottom: 1.2rem;
@media (min-width: 768px) {
  width: 100%;
  background: ${colors.ligthGray}
`;

export const SubmitBtn = styled.div`
  margin-top: 2rem;
`;

export const Error = styled.p`
  color: red;
  padding: 0;
  margin: 20px auto 0;
`;
