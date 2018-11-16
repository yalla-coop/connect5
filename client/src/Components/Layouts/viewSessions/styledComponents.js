import styled from "styled-components";


const Main = styled.div`
 width: 100%;
 height: 100%;
 margin: 0 auto;
`;

const Header = styled.div`
 width: 100%;
 height: 40px;
 position: relative;
 color: #0B6FA4;
 top: 10px;
 font-size: 15px
`;

const Heading = styled.div`
 width: 100%;
 color:  #0B6FA4;
 padding-left: 10px
`;

const Borderbottom = styled.div`
 width: 50%;
 height: 1px;
 position: absolute;
 background: #000;
 top: 37px;
 background: #0B6FA4;
`;

const Container = styled.div`
  display: table;
  flex-direction: column;
  font-family: "Times New Roman", Times, serif;
  border: 1px solid #FFFFFF;
  border-bottom: 5px solid #FFFFFF;
  width:100%;
  text-align: center;
  border-collapse: collapse;
  margin:auto;
  margin-top: 50px ;
  border: 1px solid #FFFFFF;
  padding: 3px 2px;
  background: #D0E4F5;
`;

const TableHeading = styled.div`
  display: table-header-group;
  background: #0B6FA4;
  border-bottom: 5px solid #FFFFFF;
  font-size: 17px;
  font-weight: bold;
  color: #FFFFFF;
  text-align: center;
  border-left: 2px solid #FFFFFF;
  width: 100%;
  height: 30px;
  align-items: center;
  line-height: 30px;
  border-left: none;
`;

const TableRow = styled.div`
   display: flex;
   flex-direction: row;
`;

const TableHead = styled.div`
  font-size: 17px;
  font-weight: bold;
  color: #FFFFFF;
  border: 1px solid #FFFFFF;
  border-left: 2px solid #FFFFFF;
  padding: 3px 2px;
  text-align: center;
  width: 33.3%;
  height: 30px;
  align-items: center;
  line-height: 21px;
  display: table-cell;
`;

const TableBody = styled.div`
  display: table-row-group;
`;

const TableCell = styled.div`
   display: table-cell;
   border: 1px solid #FFFFFF;
   padding: 3px 2px;
   width: 33.3%;
   height: 30px;
   line-height: 24px;
   color: #4b4a48
`;

const Icon = styled.i`
   font-size: 18px;
   color: #4b4a48;
   &:hover {
    color: #ce9a3d
   }
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
};
