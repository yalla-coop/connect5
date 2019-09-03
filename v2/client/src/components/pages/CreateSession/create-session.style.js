import styled from 'styled-components';
import { colors } from '../../../theme';

export const CreateSessionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5rem 0;
  margin: 0 auto;
  max-width: 600px;
  margin-bottom: 80px;
`;
export const Heading = styled.h1`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 29px;
  text-align: center;
  color: ${colors.profileFontColor};
  margin-bottom: 1rem;
`;

export const Warning = styled.h1`
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  font-size: 0.875rem;
  color: ${colors.errorRed};
  align-self: flex-end;
  position: absolute;
  top: 100%;
`;

export const Form = styled.form`
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

export const InputDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  position: relative;
  border: 1px solid ${colors.lightGray};
  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  @media (min-width: 768px) {
    width: 90%;
  }
`;

export const SubmitBtn = styled.div`
  margin: 0.5rem 0;
  @media (min-width: 768px) {
    width: 90%;
    margin: 0 auto;
  }
`;

export const Error = styled.p`
  color: ${colors.red};
  padding: 0;
  margin: 20px auto 0;
`;

export const InputLabel = styled.label``;

export const Label = styled.label`
  width: 100%;
  font-size: 15px;
  margin-left: 0.5rem;
  color: ${colors.black};
`;

export const RequiredMark = styled.label`
  color: ${colors.red};
`;

export const LabelDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
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
  align-self: center;
  margin-left: -60%;
`;
