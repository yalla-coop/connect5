import styled from "styled-components";

const ResultsOverviewWrapper = styled.div`
width: 90%;
margin: 0 auto;


`;

const PageTitle = styled.h1`
  font-size: 32px;
  color: var(--heading-color);
  display: inline-block;

  :after {
    content: "";
    display: block;
    height: 4px;
    width: 100%;
    background-color: var(--line-color);
  }
`;

const StatisicsContainer = styled.div`


`;

const TabsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  width: 100%;
  margin: 0 auto;
  height: 50px;
  overflow: hidden;
  cursor: pointer;
`;

const Tab = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  padding: 0 16px;
  text-align: center;
  background-color: ${props => (props.active ? "var(--button-background-color)" : "#fff")};
  color: ${props => (props.active ? "#fff" : "var(--button-text-color)")}
  outline: none;
  border: none;
  z-index: 2
`;


export {
  ResultsOverviewWrapper,
  PageTitle,
  StatisicsContainer,
  TabsWrapper,
  Tab,
}