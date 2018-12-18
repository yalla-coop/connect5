import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Wrapper = styled.div`
  display: Grid;
  grid-template-columns: 1fr;
  grid-template-rows: 130px 90px 348px;
  grid-template-areas:
    "header"
    "statistics"
    "links";
  @media (min-width: 321px) {
      grid-template-rows: 100px 90px 415px;
    }
`;

const Header = styled.div`
  grid-area: header;
  position: relative;
  margin-top: 0;
  @media (min-width: 321px) {
    width: 80%;
    margin: 0 auto;
  }
`;

const Welcome = styled.p`
  line-height: 38px;
  text-align: center;
  font-size: 20px;
  color: var(--line-color);
  @media (min-width: 321px) {
    width: 80%;
    margin: 0 auto;
    line-height: 40px;
  }
`;

const UserName = styled.span`
  color: var(--line-color);
  margin-left: 5px;
  font-weight: 700
`;

const Statistics = styled.div`
  grid-area: statistics;
  display: flex;
  width: 90%;
  margin: 0 auto;
  position: relative;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #69c3c4;
  box-shadow: 0 4px 11px -2px grey;
  @media (min-width: 1040px) {
    width: 50%;
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
  border-right: 1px solid #d8d7d7;
  &:last-child {
    border-right: none;
  }
`;

const ItemName = styled.p`
  text-align: center;
  margin: 5px 10px 0;
  display: block;
  color: #0a8889;
  font-weight: 600;
`;

const ItemCount = styled.p`
  text-align: center;
  display:block;
  color: #0a8889;
  font-weight: 600
`;

const Links = styled.div`
  grid-area: links;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  @media (min-width: 321px) {
    width: 80%;
    margin: 0 auto;
    margin-top: 25px;
  }
`;

const LinkWrapper = styled.div`
  text-align: center;
  display: block;
  border-radius: 5px;
  border: 1px solid var(--statistics);
  box-shadow: 0 3px 9px -2px grey;
  width: 118px;
  height: 88px;
  font-size: 18px;
  margin: 0 auto;
  margin-top: 15px;
  background: #fff;
  @media (min-width: 321px) {
    margin-top: 30px
  }
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
  width: 50px;
  height: 45px;
  line-height: 50px;
  font-size: 35px;
  margin-top: 8px;
  color: #000000b3;
  &:hover {
    color: #0288d1;
  }
`;

const Span = styled.span`
  display: block;
  position: relative;
  font-size: 14.5px;
  color: #000000e8;
  margin-top: 13px;
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
