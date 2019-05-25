import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from '../../../../theme';

export const SessionActionsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem;
`;

export const SessionAction = styled.div`
  width: 50%;
  margin: 0 auto;
  margin-left: 0.5rem;
`;

export const SessionActionLink = styled(Link)`
  text-decoration: none;
`;

export const IconName = styled.span`
  color: #000;
  display: inline-block;
  padding-left: 0.35rem;
`;

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

// export const SelectComponent = styled(Select)`
//   height: 50px;
//   border-radius: 5px;
//   border: 1px solid ${colors.mediumGray};
//   margin: 13px 0;
//   > :first-child {
//     height: 100%;
//     &:hover,
//     &:focus {
//       border: 1px solid ${colors.primary};
//     }
//   }
// `;

export const Error = styled.p`
  color: red;
  padding: 0;
  margin: 20px auto 0;
`;
