import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from '../../../../theme';

export const SessionSurveysWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem 0;
  padding-top: 0;
`;

export const SessionSurveyContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-bottom: 2rem;
`;

export const SurveyContentWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
`;

export const Buttons = styled.div`
  width: 90%;
  margin: 0 auto;
`;

export const SurveyLinkType = styled(Link)`
  display: inline-block;
  /* padding: 1rem; */
  color: #000;
  text-decoration: none;
  text-transform: capitalize;
  margin-bottom: 1rem;
  margin-right: 0.5rem;
`;

export const SurveyLinkInfo = styled.span`
  display: inline-block;
  cursor: pointer;
`;

export const ViewResultIcon = styled.span`
  display: inline-block;
  cursor: pointer;
  margin-left: 0.3rem;
  color: ${colors.black};
`;

export const ActionsDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
`;

export const CopyLink = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 2rem;
  font-size: 32px !important;
  :hover,
  :active {
    color: ${colors.primary};
  }
`;

export const CopyIcon = styled.i`
  font-size: 20px;
`;

export const MailLink = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  cursor: pointer;
`;

export const IconName = styled.span`
  display: inline-block;
  margin-left: 0.5rem;
`;

export const SurveyLink = styled.a`
  text-decoration: none;
  display: block;
  /* padding: 0.5rem;
  margin-left: 0.5rem; */
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

export const SurveyLinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const AttendeeBtn = styled.button`
  background-color: ${colors.lightPrimary};
  border-radius: 15px;
  border: 1px solid ${colors.lightPrimary};
  width: 200px;
  display: block;
  text-align: center;
  margin: 0 auto;
  margin-top: 1rem;
  margin-bottom: 2rem;
  cursor: pointer;
  color: ${colors.white};
  font-size: 1rem;
  padding: 14px 15px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #2f6627;
  &:hover {
    background-color: ${colors.white};
    color: ${colors.lightPrimary};
    border: 1px solid ${colors.lightPrimary};
  }
  &:active {
    position: relative;
    top: 1px;
  }
`;

export const SurveyResult = styled(Link)`
  display: block;
  width: 130px;
  text-decoration: none;
  text-align: center;
  padding: 9px 10px;
  font-size: 0.89rem;
  border-radius: 9px;
  color: ${colors.white};
  background: ${colors.lightPrimary};
  margin: 0.8rem auto;
  font-weight: 600;
  border: 1px solid ${colors.lightPrimary};
  &:hover {
    background-color: ${colors.white};
    color: ${colors.lightPrimary};
    border: 1px solid ${colors.lightPrimary};
  }
  &:active {
    position: relative;
    top: 1px;
  }
`;

export const ModalButtonsDiv = styled.div`
  display: flex;
  margin-top: 2rem;
  margin-left: 45%;
  @media (min-width: 768px) {
    margin-left: 55%;
  }
`;

export const ResponseWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
  /* color: ${colors.blackSecondary}; */
`;

export const FeedbackAction = styled(Link)`
  display: flex;
  justify-content: space-between;
  color: ${colors.black};

  :hover,
  :active {
    color: ${colors.primary};
  }

  * {
    pointer-events: none;
  }
`;
