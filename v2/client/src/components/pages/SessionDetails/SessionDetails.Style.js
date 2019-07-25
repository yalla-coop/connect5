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
  padding-top: 5rem;
`;

export const SessionTopDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
`;

export const Statistic = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 0.55rem 0.3rem;
  margin: 0.5rem 0;
  border-radius: 7px;
  @media (min-width: 768px) {
    width: 100%;
  }
`;

export const StatisticItems = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:not(:last-child) {
    border-right: ${borders.inputBox};
    /* padding: 0 0.5rem; */
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

export const TrainersName = styled(Link)`
  color: ${colors.black};
  font-weight: 400;
  text-decoration: none;
  text-transform: capitalize;
`;

// NEW COMPONENTS

export const SubDetails = styled.div`
  padding: 0.75rem 0 0.5rem 1.7rem;
  color: ${colors.blackSecondary};
  display: flex;
`;

export const SubDetailsTitle = styled.p`
  width: 25%;
  margin: 0;
`;

export const SubDetailsContent = styled.p`
  margin-left: 1rem;
  color: ${colors.black};
  font-weight: 400;
  text-decoration: none;
  margin: 0;
`;

export const DrawerLink = styled.p`
  margin: 0;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 95%;
  align-items: center;
  cursor: pointer;

  &:hover p {
    font-weight: 500;
  }

  & * {
    pointer-events: none;
  }
`;

export const Edit = styled.p`
  margin-left: auto;
  margin-right: 1rem;
  font-family: Roboto;
  font-size: 16px;
  color: #000000;
  cursor: pointer;
  &:hover {
    font-weight: 500;
  }
`;

export const DrawerContentWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;
