import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Wrapper = styled.div`
  background: #EFF3F4;
  height: 496px;
  display: Grid;
  grid-template-columns: 1fr;
  grid-template-rows: 70px 360px 70px;
  grid-template-areas: 'header'
                       'content'
                       'actions'
`;

const Header = styled.div`
  grid-area: header;
  position: relative;
  color: #0B6FA4;
  font-size: 15px;
  @media (min-width:1040px) {
    width: 80%;
    margin: 0 auto;
  }
`;

const Heading = styled.div`
 color: #0B6FA4;
 width: 100%;
 padding-left: 10px
`;

const Borderbottom = styled.div`
 width: 230px;
 height: 1px;
 position: absolute;
 background: #000;
 top: 60px;
 background: #0B6FA4;
 margin-left: 10px
`;

const Content = styled.div`
  grid-area: content;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius:10px;
  top: 100px;
  margin: 15px 10px 0 10px;
  @media (min-width:1040px) {
    width: 80%;
    margin: 0 auto;
  }
`;

const Statistic = styled.div`
  display: flex;
  flex-direction:row;
  width: 80%;
  height: 25.3%;
  margin:0 auto;
  margin-top: 15px;
  border-bottom: 1px solid #a8a193
  > :last-child {
    border-right: none
  }
`;

const StatisticItems = styled.div`
  display: flex;
  flex-direction:column;
  width: 100%;
  height: 85%;
  border-right: 1px solid #a8a193;
  padding-right: 5px
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 50%;
  background: #c9dae18a;
  border-radius: 5px;
  margin: 0 auto;
  margin-top: 10px;
`;

const LinkType = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 25%;
  margin-left: 15px;
  padding: 15px 15px 0 15px
`;
const ItemName = styled.div`
display: flex;
margin: 0 auto;
height: 65%;
margin-top: 7px;
font-size: 15px;
color: #1397b1
`;

const Items = styled.div`
 display: flex;
 margin: 0 auto;
 height: 35%;
 font-size: 15px;
 color: #1397b1
`;

const Links = styled.div`
display: flex;
 flex-direction:column;
 width: 100%;
 height: 100%;
 @media (min-width:1040px) {
   width: 80%;
   margin: 0 auto;
 }
`;
const SurveyLink1 = styled(Links)`
 display: flex;
 flex-direction:column;
 width: 100%;
 height: 100%;
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
 width: 50%;
`;

const Span2 = styled.div`
 font-size: 18px;
 display: flex;
 width: 20%;
`;

const copyLink = styled.div`
font-size: 15px;
margin-left: 5px;
margin-top: -7px
`;


const SurveyLink = styled.div`
display: flex;
 width: 100%;
 height: 100%,
 margin-top: 0
`;

const SLink = styled.a`
text-decoration: none;
  display:block;
  padding: 10px 10px 10px 25px;
  margin-left: 15px;
  color: #3d3d3df2;
  & :hover {
    color: blue;
    text-decoration: underline
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
 border-radius:5px;
 & :hover {
   background-color: white;
    border: 1px solid #2a617b;
    color: #2a617b;
 }
`;

const Actions = styled.div`
  grid-area: actions;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Action = styled.div`
  display: flex;
`;

const ActionBtn = styled.button`
  background: none;
  border: none;
  width: 40px
`;

const Icon = styled.i`
  font-size: 18px
`;

const Span = styled.span`
  line-height: 25px
`;

const Btn = styled.button`
   background: none;
   border: none;
   display:flex
`;

const ResultsBtn = styled.button`
   background: #42C4DE;
   border: 1px solid #42C4DE;
   margin: 0 auto;
   padding: 10px 3px;
   width: 140px;
    display: inline-block;
    color: white;
    text-decoration: none;
    -webkit-border-radius: 2.5em;
    -moz-border-radius: 2.5em;
    border-radius: 2em;
    margin-bottom: 6px
`;

const Navlink = styled(NavLink)`
  display: block;
  text-decoration: none;
  padding: 0 12px;
  color: white
`;


export {
  Navlink,
  Span,
  Span1,
  Span2,
  Icon,
  ActionBtn,
  Action,
  Actions,
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
  Borderbottom,
  Header,
  Heading,
  Wrapper,
  SurveyLink1,
  Btn,
  copyLink,
  Container,
  SurveyType,
};
