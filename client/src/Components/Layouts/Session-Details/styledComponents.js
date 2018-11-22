import styled from "styled-components";

const Wrapper = styled.div`
  background: #e9f3f5;
  height: 496px;
  display: Grid;
  grid-template-columns: 1fr;
  grid-template-rows: 70px 300px 100px;
  grid-template-areas: 'header'
                       'content'
                       'actions'
`;

const Header = styled.div`
  grid-area: header;
  position: relative;
  color: #0B6FA4;
  font-size: 15px
`;

const Heading = styled.div`
 width: 100%;
 color: #0B6FA4;
 padding-left: 10px
`;

const Borderbottom = styled.div`
 width: 72%;
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

const ItemName = styled.div`
  display: flex;
  margin: 0 auto;
  height: 65%;
  margin-top: 7px;
  font-size: 15px;
  color: #6e7171
`;

const Items = styled.div`
  display: flex;
  margin: 0 auto;
  height: 35%;
  font-size: 15px;
  color: #5d5f5f
`;

const Links = styled.div`
  display: flex;
  flex-direction:column;
  width: 100%;
  height: 100%
`;

const LinkType = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 30.3%;
  margin-left: 15px;
  padding: 15px 15px 0 15px
`;

const LinkInfo = styled.span`
 font-size: 15px;
 margin-left: 5px
`;

const Span1 = styled.div`
  font-size: 18px;
  display: flex;
  width: 60%
`;

const Span2 = styled.div`
  font-size: 18px;
  display: flex;
  width: 20%
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
  padding: 20px 10px 5px 25px;
  margin-left: 15px;
  color: #000;
  & :hover {
    color: blue;
    text-decoration: underline
  }
`;

const ResultsBtn = styled.div`
  display: flex;
  width: 100%;
  margin-top: 15px;
`;

const Button = styled.button`
background-color: #2a617b;
 border: 1px solid #2a617b;
 color: white;
 padding: 15px 35px;
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
  width: 30px
`;

const Icon = styled.i`
  font-size: 18px
`;

const Span = styled.span`
  line-height: 25px
`;

const SurveyLink1 = styled.div`
  display; flex;
  flex-direction: column
`;

const Btn = styled.button`
   background: none;
   border: none;
   display:flex
`;


export {
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
};
