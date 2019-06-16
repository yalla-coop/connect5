import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { borders, colors } from '../../../theme';

export const SessionDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  @media (min-width: 768px) {
    width: 50%;
  }
  padding-bottom: 5rem;
`;

export const SessionTopDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 88%;
  margin: 0 auto;
  margin-top: 6rem;
  padding: 0.5rem;
  padding-left: 0;
  box-shadow: rgb(204, 204, 204) 0px 0px 6px;
  background: ${colors.white};
  border-radius: 5px;
  @media (min-width: 768px) {
    width: 93%;
    padding: 1rem;
    margin-top: 7rem;
  }
`;

export const Statistic = styled.div`
  display: flex;
  padding: 0.55rem 0.3rem;
  margin-top: 0.5rem;
  border-radius: 7px;
  @media (min-width: 768px) {
    width: 100%;
  }
`;

export const StatisticItems = styled.div`
  min-width: 25%;
  margin: 0 auto;
  padding: 0 0.5rem;
  :nth-child(1) {
    padding-right: 0.3rem;
  }
  &:not(:last-child) {
    border-right: ${borders.inputBox};
    padding: 0 0.5rem;
  }
  @media (min-width: 768px) {
    width: 33%;
  }
`;

export const StatisticName = styled.span`
  display: block;
  color: ${colors.blackSecondary};
  text-align: center;
  margin: 0.8rem 0 0.95rem 0;
  font-size: 0.9rem;
  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

export const StatisticValue = styled.span`
  display: block;
  color: ${colors.black};
  text-align: center;
  padding: 0.3rem;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: capitalize;
  @media (min-width: 768px) {
    font-size: 1rem;
    padding: 0.9rem 0;
  }
`;

export const Trainers = styled.p`
  padding: 0.75rem 0 0.5rem 1.7rem;
  color: ${colors.blackSecondary};
`;

export const TrainersName = styled(Link)`
  margin-left: 1rem;
  color: ${colors.black};
  font-weight: 400;
  text-decoration: none;
  text-transform: capitalize;
`;
