import styled from 'styled-components';
// import { Link } from 'react-router-dom';
import { borders } from '../../../theme';

export const SessionDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  margin-top: 5rem;
  @media (min-width: 768px) {
    width: 50%;
    margin-top: 8rem
`;

export const SessionTopDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
`;

export const Statistic = styled.div`
  display: flex;
  padding: 1rem;
  margin: 0 auto;
  margin-top: 0.5rem;
  border-radius: 7px;
  @media (min-width: 768px) {
    width: 100%
`;

export const StatisticItems = styled.div`
  width: 35%;
  margin: 0 auto;
  &:not(:last-child) {
    border-right: ${borders.inputBox};
    padding: 0 0.3rem;
  }
`;
export const StatisticName = styled.span`
  display: block;
  color: #8d8888;
  text-align: center;
  margin: 0.8rem 0 0.95rem 0;
`;
export const StatisticValue = styled.span`
  display: block;
  text-align: center;
`;

export const Trainers = styled.p`
  padding: 0.75rem 0 0.5rem 1.7rem;
  color: #8d8888;
`;

export const TrainersName = styled.span`
  margin-left: 1rem;
  color: #4f4f4f;
`;

export const SessionContent = styled.div``;
