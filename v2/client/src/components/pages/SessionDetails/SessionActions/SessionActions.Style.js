import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import { colors } from '../../../../theme';

export const SessionActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  margin: 0.5rem 0;
  @media (min-width: 768px) {
    width: 60%;
    padding: 2rem;
    margin: 0 auto;
  }
`;

export const SessionAction = styled.div`
  width: 50%;
  margin: 0 auto;
  /* margin-left: 0.5rem; */
`;

export const SessionEdit = styled(Link)`
  text-decoration: none;
  cursor: pointer;
`;

export const SessionDelete = styled.button`
  border: none;
  background: none;
  cursor: pointer;
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
