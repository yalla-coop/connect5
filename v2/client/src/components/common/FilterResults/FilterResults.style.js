import styled from 'styled-components';
import { colors } from '../../../theme';

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  margin: 0 auto;
  max-width: 450px;
`;

export const Form = styled.form``;

export const InputDiv = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  position: relative;
  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

export const SubmitBtn = styled.div`
  margin: 0.5rem 0;
  @media (min-width: 768px) {
    width: 90%;
    margin: 0 auto;
  }
`;

export const InputLabel = styled.label``;

export const Label = styled.label`
  width: 100%;
  font-size: 15px;
  margin-left: 0.5rem;
  color: ${colors.black};
`;

export const ClearBtn = styled.button`
  background: none;
  border: none;
  display: block;
  color: #eb5757;
  padding-top: 1rem;
  cursor: pointer;
`;
