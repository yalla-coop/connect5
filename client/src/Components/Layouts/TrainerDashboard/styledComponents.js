import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Wrapper = styled.div`
  margin-top: 55px;
  background: #eff3f4;
  display: Grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px 90px 350px;
  grid-template-areas:
    "header"
    "statistics"
    "links";
`;
const Header = styled.div`
  grid-area: header;
  position: relative;
  @media (min-width: 1040px) {
    width: 80%;
    margin: 0 auto;
  }
`;

const Welcome = styled.div`
text-align: center;
line-height: 1px;
font-size: 20px;
color: #0b6fa4;
margin: 0 auto;
margin-top: -10px;
`;

const UserName = styled.span`
  color: #000;
  margin-left: 5px;
`;

const Statistics = styled.div`
  grid-area: statistics;
  display: flex;
  width: 90%;
  margin: 0 auto;
  position: relative;
  background: #fff;
  border-radius: 6px;
  @media (min-width: 1040px) {
    width: 80%;
    margin: 0 auto;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 80%;
  margin: 10px;
  position: relative;
`;

const StatisticItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  border-right: 1px solid #a8a193;
  &:last-child {
    border-right: none;
  }
`;

const ItemName = styled.p`
  text-align: center;
  margin: 5 10px 0;
  display: block;

`;

const ItemCount = styled.p`
  text-align: center;
  margin-top: -5px;
  display:block;
`;

const Links = styled.div`
  grid-area: links;
  display: flex;
  flex-direction: column;
  @media (min-width: 1040px) {
    width: 80%;
    margin: 0 auto;
  }
`;

const LinkWrapper = styled.div`
  text-align: center;
  display: block;
  border-radius: 5px;
  border: 1px solid #000;
  width: 118px;
  height: 88px;
  font-size: 18px;
  margin: 0 auto;
  margin-top: 15px;
  background: #fff;
`;

const Navlink = styled(NavLink)`
  display: block;
  text-decoration: none;
  padding: 0 12px;
`;

const IconDiv = styled.div`
  width: 60px;
  height: 50px;
  text-align: center;
  margin: 0 auto;
`;

const Img = styled.img`
  margin-top: 6px;
  width: 50px;
  height: 50px;
  color: #000000b3;
  &:hover {
    color: #0288d1;
  }
`;

const Span = styled.span`
  display: block;
  position: relative;
  font-size: 15px;
  color: #000000b3;
  margin-top: 15px;
  height: 20px;
`;


export {
  Wrapper,
  Header,
  Links,
  Statistics,
  Welcome,
  Span,
  ItemCount,
  StatisticItems,
  ItemName,
  Container,
  LinkWrapper,
  UserName,
  Img,
  IconDiv,
  Navlink,
};
