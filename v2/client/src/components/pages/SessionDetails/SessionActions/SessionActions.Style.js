import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from '../../../../theme';

export const SessionActionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const SessionAction = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SessionEdit = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`;

export const SessionDelete = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding-right: 1rem;
`;

export const IconName = styled.span`
  color: #000;
  display: inline-block;
  padding-left: 0.35rem;
  font-size: 14px;
  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

export const EditSessionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 45px 0;
  margin: 0 auto;
  max-width: 600px;
  padding-bottom: 80px;
`;

export const InputLabel = styled.label`
  width: 50%;
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

export const EmailError = styled.div`
  margin-left: 0.5rem;
  font-size: 0.875rem;
  color: ${colors.red};
`;
