import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Wrapper = styled.div`
  display: Grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "content"
    "actions";
  margin-bottom: 72px;
`;

const Header = styled.div`
  grid-area: header;
  position: relative;
  color: #0b6fa4;
  font-size: 15px;
  @media (min-width: 1040px) {
    width: 80%;
    margin: 0 auto;
  }
`;

const Heading = styled.div`
  color: var(--main-heading);
  width: 100%;
  padding-left: 10%;
`;


const Content = styled.div`
  grid-area: content;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  margin: 0 1rem;
  @media (min-width: 1040px) {
    width: 80%;
    margin: 0 auto;
  }
`;

const Statistic = styled.div`
  position:relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 25.3%;
  margin: 0 auto;
  > :last-child {
    border-right: none;
  }
  :before{
    display:block;
    content: "";
    position: absolute;
    width: 90%;
    height:1px;
    background: var(--statistics-borders);
    margin: 0 auto;
    bottom: 0;
    left: 50%;
    transform: translate(-50%,-50%);
  }
`;

const StatisticItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 85%;
  border-right: 1px solid var(--statistics-borders);
  padding: 0 6px;
  margin: 8px 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 50%;
  background: var(--light-div);
  border-radius: 5px;
  margin: 0 auto;
  margin-top: 20px;
  padding-bottom: 16px;
`;

const LinkType = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 25%;
  padding: 15px 0 0;
  justify-content: space-between;
`;
const ItemName = styled.div`
  display: flex;
  margin: 0 auto;
  height: 65%;
  margin-top: 7px;
  color: var(--button-text-color);
  padding-bottom: 10px;
  font-weight:900;
  font-size:1.2rem;
`;

const Items = styled.div`
  display: flex;
  margin: 0 auto;
  height: 35%;
  font-size: 15px;
  color: var(--button-text-color);
  padding-bottom: 10px;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  @media (min-width: 1040px) {
    width: 80%;
    margin: 0 auto;
  }
`;
const SurveyLink1 = styled(Links)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: var(--main-heading)
`;

const LinkInfo = styled.span`
  font-size: 15px;
  margin-left: 5px;
`;

const SurveyType = styled.span`
  padding: 0 5px;
`;

const Span1 = styled.div`
  font-size: 18px;
  display: flex;
  cursor: pointer;
  padding-left: 6px;
  color: #333;
  font-weight:700;
`;

const Span2 = styled.div`
  font-size: 18px;
  display: flex;
  cursor: pointer;
  color: #333;
`;

const copyLink = styled.div`
  font-size: 15px;
  margin-left: 5px;
  margin-top: -7px;
`;

const SurveyLink = styled.div`
display: flex;
 width: 100%;
 height: 100%;
 margin-top: 0;
 margin-bottom: 20px;
`;

const SLink = styled.a`
  text-decoration: none;
  display: block;
  padding: 10px;
  margin-left: 15px;
  color: var(--heading-color);
  cursor: default;
  word-break: break-all;

  & :hover {
    color: blue;
    text-decoration: underline;
  }
`;

const Button = styled.button`
  color: white;
  margin: 0 auto;
  margin-top: 15px;
  height: 50px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  & :hover {
    background-color: white;
    border: 1px solid #2a617b;
    color: #2a617b;
  }
`;

const ActionsWrapper = styled.div`
  grid-area: actions;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 12px auto;
  
`;

const ActionWrapper = styled.div`
  display: flex;
`;

const ActionBtn = styled.button`
  background: none;
  border: none;
  width: 40px;
`;

const Icon = styled.i`
  font-size: 18px;
`;

const Span = styled.span`
  line-height: 25px;
`;

const Btn = styled.button`
  background: none;
  border: none;
  display: flex;
 
  `;

const ResultsBtn = styled.button`
  background: #42c4de;
  border: none;
  margin: 0 auto;
  padding: 10px 3px;
  width: 140px;
  display: inline-block;
  color: white;
  text-decoration: none;
  -webkit-border-radius: 2.5em;
  -moz-border-radius: 2.5em;
  border-radius: 2em;
  margin-bottom: 6px;
`;

const Navlink = styled(NavLink)`
  display: block;
  text-decoration: none;
  font-weight: 700;
  color: var(--large-button-text);
  background: var(--large-button-background);
  padding: 9px 0;
  width: 150px;
  border-radius: 3px;
  margin: 0 auto;
  text-align: center;
`;
const IconsContainer = styled.div`

display: flex;
`;

export {
  Navlink,
  Span,
  Span1,
  Span2,
  Icon,
  ActionBtn,
  ActionWrapper,
  ActionsWrapper,
  Button,
  ResultsBtn,
  SLink,
  SurveyLink,
  LinkType,
  LinkInfo,
  Links,
  Items,
  ItemName,
  StatisticItems,
  Statistic,
  Content,
  Header,
  Heading,
  Wrapper,
  SurveyLink1,
  Btn,
  copyLink,
  Container,
  SurveyType,
  IconsContainer,
};
