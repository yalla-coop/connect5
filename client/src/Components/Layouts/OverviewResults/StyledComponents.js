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
  background-color: #80808021
  border-radius: 8px;
  padding-bottom: 3px;

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

const AttendanceResults = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 12px auto;
`;

const CircleWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Circle = styled.div`
  width: 40px;
  height: 40px;
  background: var(--paragraph-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFF;
  font-size: 20px

`;
const CircleTitle = styled.span`
  text-align: center;
  margin-top: 8px;
  display: block;
  padding: 0 5px;
`;

const CircleNumber = styled.span``;

const SmallTitle = styled.h5``;

const QuestionWrapper = styled.div`
  width: 100%;
  background-color: var(--button-background-color);
  margin: 0;
  margin: 20px auto;
  border-radius: 8px;
  color: #fff;
  margin: 0 auto 5px;
  position: relative;
  color: var(--button-text-color);
  padding: 0 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const QuestionText = styled.p`
  font-weight: 900;
`;

const Triangle = styled.div`
  width: 30px;
  height: 30px;
  border-left: 30px solid #fff;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-radius: 5px;
`;

const PopupWrapper = styled.div`
  position: absolute;
  width: 90%;
  top: 75px;
  background-color: #eff3f4;
  z-index: 3;
  border-radius: 8px;
  min-height: 50%;
`;

const XButton = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: blue;
  transform: translate(18%, -50%);
  right: 0;
  text-align: center;
  line-height: 50px;
  font-size: 50px;
  color: #fff;
`;

const PopupQuestion = styled.p`
  font-weight: 900;
  padding: 0 29px 0 15px;
  text-align: justify;
  font-size: 20px;
`;

const StarsWrapper = styled.div`
  width: 90%;
  margin: 5px auto 10px;
`;

const BarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BarTitle = styled.h2`
  font-size: 24px;
  color: var(--heading-color);
  display: inline-block;
  font-weight: 100;
`;

const BarContainer = styled.div`
  width: 126px;
  height: 30px;
  border: 1px solid black;
  border-radius: 0% 30px 30px 0%;
  position: relative;
`;
const Bar = styled.div`
  background-color: black;
  width: ${props => (props.width / 6) * 100}%;
  height: 100%;
  border-radius: 0% 30px 30px 0%;
  color: #fff;
  font-weight: 900;
  line-height: 30px;
  text-align: center;
`;

const BarSpan = styled.span`
  font-weight: 900;
  color: var(--button-text-color);
`;

const Responses = styled.p`
  display: inline-block;
  margin: 10px 0;
`;
const P = styled.p`
  mix-blend-mode: difference;
  display: inline-block;
  margin: 0;
  font-size: 25px;
`;

const ResponsesResults = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 12px auto;
`;


export {
  ResultsOverviewWrapper,
  PageTitle,
  StatisicsContainer,
  ResponsesResults,
  TabsWrapper,
  Tab,
  AttendanceResults,
  Circle,
  CircleWrapper,
  CircleTitle,
  CircleNumber,
  SmallTitle,
  QuestionWrapper,
  QuestionText,
  Triangle,
  PopupWrapper,
  XButton,
  PopupQuestion,
  StarsWrapper,
  BarWrapper,
  BarTitle,
  BarContainer,
  Bar,
  BarSpan,
  Responses,
  P,
};