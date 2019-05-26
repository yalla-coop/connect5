import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, shadows } from '../../../../theme';

export const SessionSurveysWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem;
  padding-top: 0;
`;

export const SessionSurveyContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-bottom: 2rem;
  border-radius: 5px;
  background: ${colors.white};
  box-shadow: ${shadows.primary};
  border: 1px solid ${colors.extralightPrimary};
`;

export const SurveyContentWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
`;

export const Buttons = styled.div`
  width: 90%;
  margin: 0 auto;
  padding-top; 2rem
`;

export const SurveyLinkType = styled.span`
  display: inline-block;
  padding: 1rem;
  color: #000;
`;

export const SurveyLinkInfo = styled.span`
  display: inline-block;
`;

export const CopyLink = styled.span`
  display: inline-block;
  width: 45%;
  margin: 1rem 0 1rem 0.55rem;
`;

export const MailLink = styled.span`
  display: inline-block;
  width: 50%;
`;

export const IconName = styled.span`
  display: inline-block;
  margin-left: 0.5rem;
`;

export const SurveyLink = styled(Link)`
  text-decoration: none;
  display: block;
  padding: 0.5rem;
  margin-left: 0.5rem;
  color: #868686;
  cursor: default;
  word-break: break-all;
  font-size: 14px;
  & :hover {
    color: blue;
    text-decoration: underline;
  }
`;

export const AttendeeBtn = styled(Link)`
background-color: ${colors.lightPrimary};
border-radius: 15px;
border: 1px solid ${colors.lightPrimary};
width: 200px;
display: block;
text-align: center;
margin: 0 auto;
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
border: 1px solid ${colors.lightPrimary}
}
&:active {
position:relative;
top:1px;
`;

export const ResultBtn = styled(AttendeeBtn)``;
