import Select from 'react-select';
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
  // color: var( --main-heading);
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
  // background-color: var(--form-background);
  border-radius: 15px;
  // border: 1px solid var(--light-gray-border);
  @media (min-width: 678px) {
    width: 80%;
  }
`;

export const InputDiv = styled.div`
width: 100%;
margin: 0 auto;
margin-bottom: 1.2rem;
@media (min-width: 768px) {
  width: 30%;
  background: ${colors.ligthGray}
`;

export const SelectComponent = styled(Select)`
  height: 50px;
  border-radius: 5px;
  border: 1px solid ${colors.mediumGray};
  margin: 13px 0;
  > :first-child {
    height: 100%;
    &:hover,
    &:focus {
      border: 1px solid ${colors.primary};
    }
  }
`;

export const Error = styled.p`
  color: red;
  padding: 0;
  margin: 20px auto 0;
`;
