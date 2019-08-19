import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { borders, colors, breakpoints } from '../../../theme';

export const SessionDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 650px
  margin: 0 auto;
  padding: 5rem 0.3rem;
  @media ${breakpoints.mobileL} {
    width: 90%;
    padding: 6rem 0.5rem;
  }
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
  padding-left: 0.7rem;
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
  padding-right: 1rem;
`;

export const SubDetailsContent = styled.p`
  margin-left: 1rem;
  color: ${colors.black};
  font-weight: 400;
  text-decoration: none;
  font-size: 0.95rem;
  margin: 0;
  padding-left: 0.5rem;
`;

export const RegistrationDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 90%;
  padding: 0.4rem;
`;

export const RegistrationLink = styled.a`
  text-decoration: none;
  display: block;
  color: ${colors.blackSecondary};
  cursor: pointer;
  word-break: break-all;
  font-size: 14px;
  :hover,
  :focus {
    color: ${colors.primary};
    text-decoration: underline;
  }
`;

export const CopyLink = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 2rem;
  margin-top: -14px;
  font-size: 32px !important;
  :hover,
  :active {
    color: ${colors.primary};
  }
`;

export const CopyIcon = styled.i`
  font-size: 20px;
`;

export const DrawerLink = styled.p`
  margin: 0;
  color: ${colors.profileFontColor};
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 95%;
  margin: 0 auto;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover p {
    font-weight: 500;
    color: ${colors.primary};
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }

  ${({ enabled }) =>
    enabled
      ? ''
      : `& * {
        pointer-events: none;
      }`}
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
    color: ${colors.primary};
  }
`;

export const DrawerContentWrapper = styled.div`
  max-width: 450px;
  margin: 0 auto;
  text-align: center;
  background: #f7f8f9;
  text-align: center;
  padding-top: 3rem;

  .ant-checkbox-group .ant-checkbox-group-item {
    display: block;
    margin: 1rem 0;
  }
`;

export const CheckboxWrapper = styled.div`
  width: 100%;
  text-align: left;
`;

export const TableWrapper = styled.div`
  background: #fff;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 2rem;
`;

export const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 95%;
  margin: 0 auto;
  align-items: center;
`;

export const Text = styled.p`
  margin: 1rem 0;
  font-weight: 700;
`;

export const EmailWrapper = styled.div`
  background: #fff;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 4rem;
  padding: 2rem 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

export const EmailText = styled.p`
  font-family: Roboto;
  font-weight: 300;
  font-size: 16px;
  line-height: 26px;
  margin-bottom: 0rem;
`;

export const BoldSpan = styled.span`
  font-weight: 500;
`;

export const BackWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80px;
  padding-left: 5%;
  cursor: pointer;
  margin: 2rem 0;
  font-weight: 500;
  font-size: 18px;
  cursor: pointer;
`;

export const FormWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  margin-top: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SelecetWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`;

export const IconsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  min-width: 90px;
  margin-bottom: 5px;
`;
