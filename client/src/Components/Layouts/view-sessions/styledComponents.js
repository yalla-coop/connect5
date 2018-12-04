import styled from "styled-components";


const Main = styled.div`
  width: 100%;
  margin-bottom: 72px;
  min-height: 497px;
`;

const Header = styled.div`
 width: 100%;
 height: 40px;
 position: relative;
 font-size: 14px,
 padding: 10px 0;
 @media (min-width:1040px) {
   width: 95%;
   margin: 0 auto;
 }
`;

const Heading = styled.div`
  width: 100%;
  padding-left: 10%;
  color: var(--main-heading);
  
`;

const H1 = styled.h1`
  margin: 0;
  padding: 20px 0;
  font-size: 2em;
`;

const Container = styled.div`
  display: table;
  flex-direction: column;
  width:90%;
  text-align: center;
  border-collapse: collapse;
  margin:auto;
  margin-top: 50px ;
  padding: 3px 2px;
  background: var(--light-div);
  border-radius: 5px;
  overflow: hidden;
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
 background: var(--active-tab-background);
 
`;

const TableRowHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #fff;
  height: 50px;
  line-height: 40px;
`;

const TableRow = styled(TableRowHeader)`
  height: 50px;
   &:last-child {
     border-bottom:none
   }
`;

const TableHead = styled.div`
  font-size: 17px;
  font-weight: bold;
  color: var(--active-tab-text);
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
   color: var(--button-text-color)
`;

const Icon = styled.i`
   font-size: 16px;
   color: var(--large-button-background);
   &:hover {
    color: #ce9a3d
   }
`;

const Button = styled.button`
   background: none;
   border: none
`;

export {
  Main,
  Container,
  Header,
  Heading,
  TableRowHeader,
  TableHeading,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Icon,
  Button,
  H1,
};
