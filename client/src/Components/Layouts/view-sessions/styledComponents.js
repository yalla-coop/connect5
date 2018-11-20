import styled from "styled-components";


const Main = styled.div`
 width: 100%;
 height: 495px;
 background: #EFF3F4
`;

const Header = styled.div`
 width: 100%;
 height: 40px;
 position: relative;
 font-size: 15px,
 padding: 10px 0
`;

const Heading = styled.div`
 width: 100%;
 color:  #000;
 padding-left: 10px
`;

const H1 = styled.h1`
 margin: 0;
 padding: 15px 0
`;

const Borderbottom = styled.div`
 width: 46%;
 height: 1px;
 position: absolute;
 background: #000;
 top: 50px;
 margin-left: 10px
`;

const Container = styled.div`
  display: table;
  flex-direction: column;
  width:95%;
  text-align: center;
  border-collapse: collapse;
  margin:auto;
  margin-top: 50px ;
  padding: 3px 2px;
  background: #fff;
`;

const TableHeading = styled.div`
  display: table-header-group;
  background: #fff;
  font-size: 17px;
  font-weight: bold;
  color: #000;
  text-align: center;
  width: 80%;
  align-items: center;
`;

const TableRow = styled.div`
   width: 95%;
   display: flex;
   flex-direction: row;
   border-bottom: 1px solid #C8C7CC;
   height: 43.5px;
   line-height: 40px;
`;

const TableHead = styled.div`
  font-size: 17px;
  font-weight: bold;
  color: #000;
  padding: 3px 2px;
  margin: 0 5px;
  text-align: center;
  width: 33.3%;
  height: 35px;
  align-items: center;
  display: table-cell;
`;

const TableBody = styled.div`
  display: table-row-group;
`;

const TableCell = styled.div`
   display: table-cell;
   padding: 3px 2px;
   width: 33.3%;
   height: 30px;
   margin-left: 10px;
   color: #4b4a48
`;

const Icon = styled.i`
   font-size: 16px;
   color: #4b4a48;
   &:hover {
    color: #ce9a3d
   }
`;

const Button = styled.i`
   background: none;
   border: none
`;

export {
  Main,
  Container,
  Borderbottom,
  Header,
  Heading,
  TableHeading,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Icon,
  Button,
  H1,
};
