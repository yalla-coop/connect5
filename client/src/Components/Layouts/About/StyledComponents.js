import styled from "styled-components";
import Header from "../../CommonComponents/Header/index";

const Container = styled.div`
  display: Grid;
  grid-template-columns: 1fr;
  grid-template-rows: 55px 250px 190px auto auto;
  grid-template-areas:
    "header"
    "summury"
    "mission"
    "about"
    "blockquote"

`;

const Headers = styled(Header)`
  grid-area: header;
`;

const Summury = styled.div`
  grid-area: summury;
  background: #b3b3b338;
`;

const H2 = styled.h2`
  display: block;
  font-size: 1.5rem;
  font-family: cursive,serif;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 22px;
  text-align: center;
  color: #1d5d90;
`;

const H3 = styled(H2)`
  display: block;
  font-size: 1.4rem;
  font-weight: 400;
  text-align: center;
  color: #393939;
`;

const P = styled.p`
  display: block;
  line-height: 1.4;
  text-align: center;
  margin: 0px 10px;
  color: #6a6a6a;
`;

const Mission = styled.div`
  grid-area: mission;
`;

const About = styled.div`
  grid-area: about;
  display: flex;
  flex-direction: column;
  background: #fff8fd;
`;

const Question = styled.div`
 display: flex;
 flex-direction: column;
 width: 90%;
 margin: 0 auto;
 margin-bottom: 20px;
 color: #6a6a6a;
 padding: 0 10px;
 border: 2px solid #fff;
 border-radius: 9px;
 overflow: hidden;
 box-sizing: border-box;
 -webkit-box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.31);
 -moz-box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.31);
 box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.31);
`;

const Paragraph = styled.p`
 margin: 0 0 30px;
 line-height: 1.4;
 font-weight: 400;
 color: #6a6a6a;
`;

const Ul = styled.li`
 padding-left: 10px;
 margin-bottom: 20px;
 list-style: none;
 list-style-position: outside;
`;

const Li = styled.li`
  margin-bottom: 25px;
  padding-left: 10px;
  display: list-item;
  text-align: left;
  list-style: none;
  font-size: 16px;
`;


const Blockquote = styled.div`
  display: block;
  grid-area: blockquote;
  background-color: #fbeef7;
  border: none;
  color: #e73e64;
  font-family: Merriweather,serif;
  font-size: 20px;
  font-weight: 400;
  position: relative;
  margin: 0 0 20px;
  width: 100%;
  padding: 20px;
`;

const Block = styled.blockquote`
  margin-top: 30px;
  width: 100%;
  &:before {
    content: "\2706";
    font-size: 30px;
  };
   &:after { content: '\2192'; }

`;

const Quote = styled.p`
  margin-bottom: 20px;
  margin: 40 0 20px;
  line-height: 1.4;
  font-size: 18px;
`;

const Speaker = styled.p`
  color: #3e3327;
  font-size: 16px;
  margin: 0 0 30px;
  line-height: 1.4;
`;

export {
  Container,
  Speaker,
  Quote,
  Block,
  Blockquote,
  Paragraph,
  Li,
  Ul,
  Question,
  About,
  Mission,
  P,
  Summury,
  Headers,
  H2,
  H3,
};
