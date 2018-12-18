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
  color: #e14281;
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
  width: 95%;
  height: 27.3%;
  margin: 5px auto 0;
  border-radius: 4px;
  background:var(--statistics);
  border: 1px solid #69c3c4;
  box-shadow: 0 4px 7px -2px grey
  > :last-child {
    border-right: none;
  }

`;

const StatisticItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 85%;
  border-right: 1px solid #ede5d6cf;;
  padding: 0 6px;
  margin: 8px 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  height: 50%;
  border-radius: 3px;
  margin: 0 auto;
  margin-top: 20px;
  padding-bottom: 16px;
  border: 1px solid #77dedf;
  box-shadow: 0 4px 11px -2px grey
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
  color:var(--normal-tab-background);
  padding-bottom: 10px;
  font-weight:900;
  font-size:0.9rem;
`;

const Items = styled.div`
  display: flex;
  margin: 0 auto;
  height: 35%;
  font-size: 15px;
  color: var(--normal-tab-background);
  padding-bottom: 10px;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  @media (min-width: 1040px) {
    width: 90%;
    margin: 0 auto;
  }
`;
const SurveyLink1 = styled(Links)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: #545454;
`;

const LinkInfo = styled.span`
  font-size: 15px;
  margin-left: 5px;
`;

const SurveyType = styled.span`
  padding: 0 5px;
`;

const Span1 = styled.div`
  font-size: 16px;
  display: flex;
  cursor: pointer;
  padding-left: 13px;
  margin-right: 10px;
  font-weight:500;
  color: #424242;
`;

const Span2 = styled.div`
  font-size: 18px;
  display: flex;
  cursor: pointer;
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
  color: #868686;
  cursor: default;
  word-break: break-all;
  font-size: 13px;
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
  justify-content: center;
  align-items: center;
`;

const ActionBtn = styled.button`
  background: none;
  border: none;
  width: 30px;
`;

const Icon = styled.i`
  font-size: 20px;
`;

const Span = styled.span`
  line-height: 25px;
  color: gray;
  font-size: 15px;
  margin-right: 6px;
`;

const Btn = styled.button`
  background: none;
  border: none;
  display: flex;

  `;

const Navlink = styled(NavLink)`
  display: block;
  text-decoration: none;
  font-weight: 550;
  color: #fff;
  background: #69c3c4;
  padding: 9px 0;
  width: 130px;
  border-radius: 5px;
  margin: 0 auto;
  margin-top: 5px;
  text-align: center;
  border: 1px solid #69c3c4;
  box-shadow: 0 4px 5px -2px grey;
  & :hover{
    background: #fff;
    color: #69c3c4;
  }
`;

const IconsContainer = styled.div`
display: flex;
margin-right: 8px
`;

const I = styled.i`
 color: var(--gray);
`;


export {
  Navlink,
  Span,
  Span1,
  Span2,
  Icon,
  I,
  ActionBtn,
  ActionWrapper,
  ActionsWrapper,
  Button,
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
